const mongoose = require('mongoose');
const crypto = require('crypto')
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');

const Mailer = require('../services/Mailer');
const keys = require('../config/keys');
const User = mongoose.model('user');
const Token = mongoose.model('token');

let host, link, mailOptions;;

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({ hi: 'Hi!' });
  });

  app.post('/api/solicitud', async (req, res) => {
    const { emailRequest } = req.body;
    const existingUser =  await User.findOne({ email : emailRequest });

    if (existingUser) {
      res.statusMessage = "Correo ya en uso";
      return res.status(200).end(); //CAMBIAR ERROR
    }

    try {
      let newUser = new User();
      newUser.email = emailRequest;
      newUser.requestDate = Date.now();
      newUser.save((err) => {

        const cryptoEmail = crypto.createCipher('aes-128-cfb', keys.key)
                                  .update(emailRequest.toString(), 'utf-8', 'hex');

        const token = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });

        token.save((err) => {
          if (err) { return res.status(500).send({ msg: err.message }); }

          host = req.get('host');
          linkConfirmar = "http://" + host + "/api/solicitud/" + token.token + '/' + cryptoEmail;
          linkRegenerar = "http://" + host + "/api/regenerar/" + cryptoEmail;
          mailOptions={
            from: 'Diego Barranco Moliner <diegobarranco92@gmail.com>',
            to: emailRequest,
            subject: 'Verificiación de Cuenta',
            text: 'Verifica tu cuenta',
            html: '<a href="' + linkConfirmar + '">Verifica tu cuenta</a> \n Si se ha expirado la verificación <a href="' + linkRegenerar + '">Regenerar correo de verificación</a>',
          };

          Mailer.newMail(mailOptions, req);
        })
      });

      res.status(200).end();
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/solicitud/webhook', (req, res) => {
    const p = new Path('/api/solicitud/:token/:cryptoEmail');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, token: match.token };
        }
      }
    )
    .compact()
    .uniqBy('email', 'token')
    .each(({ email, token }) => {
      User.updateOne(
        {
          'email': email,
          'isVerified': false
        },
        {
          $set: { 'isVerified': true }
        }
      ).exec((err, result) => {
        if (!err) {
          Token.deleteOne({ token: token }, (err, result) => {});
        }
      });
    })
    .value();

    res.send({});
  });

  app.get('/api/solicitud/:token/:cryptoEmail', (req, res) => {
    const url = req.originalUrl;
    const token = url.split("/")[3];
    const cryptoEmail = url.split("/")[4];

    const email = crypto.createDecipher('aes-128-cfb', keys.key)
                        .update(cryptoEmail.toString(), 'hex', 'utf-8');

    User.findOne({ email: email }, async (err, user) => {
      if (user.isVerified) {
        res.redirect('/solicitud/verificar');
      } else {
        Token.findOne({ token: token }, async (err, token) => {
          if (token) {
            res.redirect('/solicitud/verificar');
          } else {
            res.redirect('/api/regenerar/' + cryptoEmail);
          }
        });
      }
    })
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
                from: 'Diego Barranco Moliner <diegobarranco92@gmail.com>',
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
}

//
//  app.get('/api/logout', (req, res) => {
//    req.logout();
//    res.redirect('/');
//  });
//
//  app.get('/api/current_user', (req, res) => {
//    res.send(req.user);
//  });
