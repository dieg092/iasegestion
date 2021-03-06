const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt   = require('bcrypt-nodejs');
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const passport = require('passport');
const Transaction = require('mongoose-transactions')
const transaction = new Transaction()

const Mailer = require('../services/Mailer');
const keys = require('../config/keys');
const User = mongoose.model('user');
const Token = mongoose.model('token');

let host, link, mailOptions;;

module.exports = app => {

  app.post('/api/login', passport.authenticate('local',
    { successRedirect: '/api/logged', failureRedirect: '/' }
  ));

  app.get('/api/logged', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post('/api/recordar', async (req, res) => {
    //¿Existe el usuario?
    const { emailRemember } = req.body;
    const existingUser =  await User.findOne({ email : emailRemember.toLowerCase() });

    if (!existingUser) {
      res.send('Correo no encontrado');
    } else {
      const token = new Token({ _userId: existingUser._id, token: crypto.randomBytes(16).toString('hex') });

      token.save((err) => {
        if (err) { return res.status(500).send({ msg: err.message }); }

        host = req.get('host');
        linkRegenerar = "http://" + host + "/api/recordar/" + token.token;
        mailOptions={
          from: 'informacion@iasegestion.com',
          to: emailRemember,
          subject: 'Recuperación de cuenta',
          text: 'Aquí tienes el link para regenerar tu contraseña.',
          html: 'Para regenerar su contraseña pulse aqui:  <a href="' + linkRegenerar + '">Regenerar contrseña</a>.',
        };

        Mailer.newMail(mailOptions, req);
      });
      res.send('OK');
    }
    //Emvoar correo con Link con token
  });

  app.post('/api/solicitud', async (req, res) => {
    let { emailRequest, emailRequestAccess, businessName, businessName2, nif, nif2, name, name2, lastName, lastName2, phone, phone2, populationId } = req.body;
    if (!emailRequest) {
      emailRequest = emailRequestAccess;
    }
    if (!businessName) {
      businessName = businessName2;
    }
    if (!nif) {
      nif = nif2;
    }
    if (!name) {
      name = name2;
    }
    if (!lastName) {
      lastName = lastName2
    }
    if (!phone) {
      phone = phone2;
    }

    const existingUser =  await User.findOne({ email : emailRequest.toLowerCase() });
    const existingBusiness = await User.findOne({ businessName: businessName });
    const existingDniCif = await User.findOne({ nif: nif });

    if (existingUser) {
      res.send('CORREO EN USO');
    } else if (existingBusiness) {
      res.send('EMPRESA YA REGISTRADA');
    } else if (existingDniCif) {
      res.send('NIF/CIF EN USO')
    } else {
      try {
        const newUser = {
          email: emailRequest.toLowerCase(),
          _population: populationId,
          requestDate: Date.now(),
          businessName: businessName.toUpperCase(),
          nif: nif.toUpperCase(),
          name: name,
          lastName: lastName,
          phone: phone
        };

        const user = transaction.insert('user', newUser);

        const newToken = {
           _userId: user._id,
           token: crypto.randomBytes(16).toString('hex')
        };
        // const cryptoEmail = crypto.createCipher('aes-128-cfb', keys.key)
        //                           .update(emailRequest.toString(), 'utf-8', 'hex');

        // host = req.get('host');
        // linkConfirmar = "http://" + host + "/api/solicitud/" + newToken.token + '/' + cryptoEmail;
        // linkRegenerar = "http://" + host + "/api/regenerar/" + cryptoEmail;
        // mailOptions={
        //   from: 'informacion@iasegestion.com',
        //   to: emailRequest,
        //   subject: 'Verificiación de Cuenta',
        //   text: 'Verifica tu cuenta',
        //   html: '<a href="' + linkConfirmar + '">Verifica tu cuenta</a> \n Si se ha expirado la verificación <a href="' + linkRegenerar + '">Regenerar correo de verificación</a>',
        // };
        //
        // Mailer.newMail(mailOptions, req);
        transaction.insert('token', newToken);

        await transaction.run()
        res.send('OK')
      } catch (error) {

        await transaction.rollback().catch(console.error);
        transaction.clean();
        res.status(422).send(err);
      }
    }
  });

  app.get('/api/solicitud/:token/:cryptoEmail', (req, res) => {
    const url = req.originalUrl;
    const token = url.split("/")[3];
    const cryptoEmail = url.split("/")[4];

    const email = crypto.createDecipher('aes-128-cfb', keys.key)
                        .update(cryptoEmail.toString(), 'hex', 'utf-8');

    Token.findOne({ token: token }, async (err, token) => {
      if (token) {
        User.findOne({ email: email }, async (err, user) => {

          if (user.isVerified) {
            res.redirect('/solicitud/verificar');
          } else {
            User.updateOne(
              {
                'email': email,
                'isVerified': false
              },
              {
                $set: { 'isVerified': true }
              }
            ).exec((err, result) => {
                Token.deleteOne({ token: token.token }, (err, result) => {
                  if (!err) {
                    res.redirect('/solicitud/verificar');
                  }
                });
            });
          }
        });
      } else {
        res.redirect('/api/regenerar/' + cryptoEmail);
      }
    });
  });

  app.get('/api/regenerar/:cryptoEmail', (req, res) => {
    const url = req.originalUrl;
    const cryptoEmail = url.split("/")[3];

    const email = crypto.createDecipher('aes-128-cfb', keys.key)
                        .update(cryptoEmail, 'hex', 'utf-8');

    User.findOne({ email: email }, async (err, user) => {
      if (user.isVerified) {
        res.redirect('/solicitud/verificar');
      } else {
        Token.findOne({ _userId: user._id }, async (err, token) => {
          if (token) {
            res.redirect('/');
          } else {
            const token = await new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

            token.save((err) => {
              if (err) { return res.status(500).send({ msg: err.message }); }

              host = req.get('host');
              linkConfirmar = "http://" + host + "/api/solicitud/" + token.token + '/' + cryptoEmail;
              linkRegenerar = "http://" + host + "/api/regenerar/" + cryptoEmail;
              mailOptions={
                from: 'informacion@iasegestion.com',
                to: email,
                subject: 'Verificiación de Cuenta',
                text: 'Verifica tu cuenta',
                html: '<a href="' + linkConfirmar + '">Verifica tu cuenta</a> \n Si se ha expirado la verificación <a href="' + linkRegenerar + '">Regenerar correo de verificación</a>',
              };

              Mailer.newMail(mailOptions, req);
              res.redirect('/solicitud/reenviar');
            });
          }
        })
      }
    });
  });

  app.get('/api/recordar/:token', (req, res) => {
    Token.findOne({ token: req.params.token }, async (err, token) => {
      if (token) {
        res.redirect('/regenerar/' + req.params.token);
      } else {
        res.redirect('/');
      }
    });
  });

  app.post('/api/recordar/:token', async (req, res) => {
    const token = await Token.findOne({ token: req.params.token});
    let update = {};

    if (token !== null) {
      bcrypt.hash(req.body.contrasenaRemember, null, null, (err, hash) => {
          update.password = hash;

          User.updateOne(
            {
              _id: token._userId
            },
              update
          ).exec((err, result) => {
            if (!err) {
              Token.deleteOne({ token: req.params.token }, (err, result) => {
                res.send('OK');
              });
            } else {
              res.send('ERROR');
            }
          });
      });
    } else {
      res.redirect('/');
    }

  });


  app.post('/api/contact', async (req, res) => {
    const { nameContact, emailContact, message } = req.body;

    mailOptions={
      from: emailContact,
      to: 'informacion@iasegestion.com',
      subject: nameContact + ' quiere contactar contigo',
      text: message,
      html: '<p>'+ message + '</p>' + '<p> Contacto:'+ emailContact + '</p>' ,
    };

    try {
      Mailer.newMail(mailOptions, req);
      res.send("OK")
    } catch (err) {
      res.send("ERROR");
    }
  });

}
//https://lairjgliargli.localtunnel.me/api/solicitud/webhook
//
//  app.get('/api/logout', (req, res) => {
//    req.logout();
//    res.redirect('/');
//  });
//
//  app.get('/api/current_user', (req, res) => {
//    res.send(req.user);
//  });
