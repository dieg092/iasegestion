const mongoose = require('mongoose');
const _ = require('lodash');
const crypto = require('crypto');
const bcrypt   = require('bcrypt-nodejs');
const keys = require('../config/keys');
const Mailer = require('../services/Mailer');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('user');
const Token = mongoose.model('token');

module.exports = app => {
  app.get('/api/usuarios', requireLogin, async (req, res) => {
    const { email, businessName, name, lastName, nif, phone, type, rol, isActive, isVerified } = req.query
    let query = req.query;
    let des = {};

    const page = parseInt(req.query.page);

    if (query.email) {
      query.email = { $regex: '.*' + req.query.email + '.*' };
    }
    if (query.businessName) {
      query.businessName = { $regex: '.*' + req.query.businessName + '.*' };
    }
    if (query.name) {
      query.name = { $regex: '.*' + req.query.name + '.*' };
    }
    if (query.lastName) {
      query.lastName = { $regex: '.*' + req.query.lastName + '.*' };
    }
    if (query.nif) {
      query.nif = { $regex: '.*' + req.query.nif + '.*' };
    }
    if (query.phone) {
      query.phone = { $regex: '.*' + req.query.phone + '.*' };
    }
    if (query.type === 'Persona física') {
      query.type = true;
    } else if (query.type === 'Perosna jurídica') {
      query.type = false;
    }
    if (query.rol === 'Administrador') {
      query.rol = true;
    } else if (query.rol === 'Cliente') {
      query.rol = false;
    }
    if (query.isActive === 'Activado') {
      query.isActive = true;
    } else if (query.isActive === 'Desactivado') {
      delete query.isActive;
      des = { $or: [{ isActive: false }, { isActive: null }] };
    }
    if (query.isVerified === 'Si') {
      query.isVerified = true;
    } else if (query.isVerified === 'No') {
      query.isVerified = false;
    }

    delete query.callback;
    delete query.page;
    delete query._;

    const q = { $and: [ query, des ] }

    await User.paginate(q, { page: page, limit: 30, sort: {email: 1}},(err, result) => {
      res.send(result);
    });

  });


  app.get('/api/usuariosSearch', requireLogin, async (req, res) => {
    let query = req.query;
    const page = parseInt(req.query.page);

    delete query.callback;
    delete query.page;
    delete query._;
    await User
    .find({
      $or: [
        {name:  { $regex: '.*' + req.query.name + '.*' }},
        {lastName:  { $regex: '.*' + req.query.lastName + '.*' }},
        {businessName:  { $regex: '.*' + req.query.businessName + '.*' }},
        {nif: { $regex: '.*' + req.query.nif + '.*' }}
      ]
    }, (err, result) => {
        let array = [];
        result.forEach((user) => {
          let data = {};
          data.label = (user.name ? user.name + ' ' : '' + '  ') + (user.lastName ? user.lastName + ' ' : '') + (user.nif ?  ' - ' + user.nif : '') + (user.businessName ? ' | ' + user.businessName : '');
          data.value = user._id
          array.push(data);
        });

        res.send(array);
      });
  });

  app.get('/api/usuarios/:idUsuario', requireLogin, async (req, res) => {
    try {
      const user = await User.find({ _id: req.params.idUsuario});

      res.send(user);
    } catch (err) {
      res.send();
    }
  });

  app.post('/api/user/digitalSignature', async (req, res) => {
    User.updateOne(
      {
        _id: req.body.userId
      },
        {
          digitalSignature: req.body.digitalSignature,
          isVerified: true
        }
    ).exec((err, resul) => {
      if (err) { res.send(err) };
      Token.deleteOne(
        {
          token: req.body.token
        },
      ).exec(async (err, result) => {
        if (!err) {
          const user = await User.find({ _id: req.body.userId });

          const mailOptions={
            from: user[0].email,
            to: 'informacion@iasegestion.com',
            subject: 'Solicitud de Acceso ' + user[0].businessName,
            text: user[0].name + ' ' + user[0].lastName + ' quiere acceder a iasegestion.com. Verifique el PDF Firmado Digitalmente adjunto. Una vez verificado, no olvides activar su cuenta y enviar sus claves. Si el PDF no es correcto. Hay que eliminar el PDF en la ficha del cliente para que pueda volver repetir el proceso.',
            html: '<div><p>' + user[0].name + ' ' + user[0].lastName + ' (' + user[0].email + ')' + ' quiere acceder a iasegestion.com.</p><p>Para ello:</p><p>1. Verificar PDF Firmado Digitalmente: '+ keys.urlBucket + 'admin/usuarios/' + user[0].digitalSignature + '</p><p>2. Activar su cuenta: ' + keys.path + user[0]._id + '</p><p>3.Enviar claves de acceso.</p><p></p><p>*Si el PDF no es correcto. Hay que eliminar el PDF en la ficha del cliente para que pueda volver repetir el proceso.</p></div>',
          };

          Mailer.newMail(mailOptions, req);
          res.send('OK');
        } else {
          res.send('ERROR');
        }
      });
    });
  });

  app.post('/api/user/pdf', async (req, res) => {
    User.updateOne(
      {
        email: req.body.email
      },
        {
          pdf: req.body.pdf
        }
    ).exec((err, result) => {
      if (err) { res.send(err) };

      res.send('OK');
    });
  });

  app.get('/api/user/token/:token', async (req, res) => {
    const token = await Token.find({ token: req.params.token });

    if (token && token[0] && token[0].token) {
      res.send('OK');
    } else {
      res.send('EEROR');
    }
  });

  app.post('/api/usuarios/:userId/deleteSignature', requireLogin, async (req, res) => {
    let update = {};

    update.digitalSignature = '';

    User.updateOne(
      {
        _id: req.params.userId
      },
        update
    ).exec((err, result) => {
      if (!err) {
        const token = new Token({ _userId: req.params.userId, token: crypto.randomBytes(16).toString('hex') });

        token.save((err) => {
          const linkPDF = keys.urlBucket + req.body.pdf;
          const host = req.get('host');
          const linkFirmaDigital = "http://" + host + "/solicitud/firmar/" + req.params.userId + '/' + token.token;

          const mailOptions={
             from: 'informacion@iasegestion.com',
             to: req.body.email,
             subject: 'Firma digital solicitud de acceso',
             text: 'Necesitmaos verificar que eres Administrador de ' + req.body.businessName + '. Firma digitalmente este PDF y envíanoslo adjuntandolo en este link.',
             html: '<div><p>Necesitmaos verificar si eres Administrador de ' + req.body.businessName + '.</p><p>Firme digitalmente este <a href="' + linkPDF + '">PDF</a></p><p>Abra el siguiente link: <a href="' + linkFirmaDigital + '">Adjuntar Firma Digital</a></p><p>Adjunte el PDF Firmado Digitalmente.</p></div>',
          };

          try {
            Mailer.newMail(mailOptions, req);
            res.send('OK');
          } catch (err) {
            res.send('ERROR');
          }
        });
      } else {
        res.send('ERROR');
      }
    });
  });

  app.post('/api/usuarios/:idUsuario/token', requireLogin, async (req, res) => {
    const tokenUser =  await Token.findOne({ _userId: req.params.idUsuario });
    const user = await User.findOne({ _id: req.params.idUsuario });

    const linkPDF = keys.urlBucket + user.pdf;
    const host = req.get('host');
    let linkFirmaDigital = "http://" + host + "/solicitud/firmar/" + req.params.idUsuario + '/' + tokenUser.token;
    let mailOptions = {};

    if (!tokenUser) {
      const token = new Token({ _userId: req.params.idUsuario, token: crypto.randomBytes(16).toString('hex') });

      token.save((err) => {
        linkFirmaDigital = "http://" + host + "/solicitud/firmar/" + req.params.idUsuario + '/' + token.token;

        mailOptions={
           from: 'informacion@iasegestion.com',
           to: user.email,
           subject: 'Solicitud Acceso (Firma digital)',
           text: 'Necesitmaos verificar que eres Administrador de ' + user.businessName + '. Firma digitalmente este PDF y envíanoslo adjuntandolo en este link.',
           html: '<div><p>Necesitmaos verificar si eres Administrador de ' + user.businessName + '.</p><p>Firme digitalmente este <a href="' + linkPDF + '">PDF</a></p><p>Abra el siguiente link: <a href="' + linkFirmaDigital + '">Adjuntar Firma Digital</a></p><p>Adjunte el PDF Firmado Digitalmente.</p></div>',
        };
      });
    } else {
      mailOptions={
         from: 'informacion@iasegestion.com',
         to: user.email,
         subject: 'Solicitud Acceso (Firma digital)',
         text: 'Necesitmaos verificar que eres Administrador de ' + user.businessName + '. Firma digitalmente este PDF y envíanoslo adjuntandolo en este link.',
         html: '<div><p>Necesitmaos verificar si eres Administrador de ' + user.businessName + '.</p><p>Firme digitalmente este <a href="' + linkPDF + '">PDF</a></p><p>Abra el siguiente link: <a href="' + linkFirmaDigital + '">Adjuntar Firma Digital</a></p><p>Adjunte el PDF Firmado Digitalmente.</p></div>',
      };
    }
    try {
      Mailer.newMail(mailOptions, req);
      res.send('OK');
    } catch (err) {
      res.send('ERROR');
    }
  });

  app.post('/api/usuarios/:userId', requireLogin, async (req, res) => {
    const user = await User.find({ _id: req.params.userId });
    let update = {};

    const randomPassword = Math.random().toString(36).slice(-8);

    bcrypt.hash(randomPassword, null, null, (err, hash) => {
      if (!user[0].password) {
        update.password = hash;
      }
      update.businessName = req.body.businessName ? req.body.businessName : '';
      update.name = req.body.name ? req.body.name : '';
      update.lastName = req.body.lastName ? req.body.lastName : '';
      update.nif = req.body.nif ? req.body.nif : '';
      update.phone = req.body.phone ? req.body.phone : '';
      update.type = req.body.type ? req.body.type : false;
      update.rol = req.body.rol ? req.body.rol : false;
      update._population = req.body.populationId ? req.body.populationId : '';
      update.pdf = req.body.pdf ? req.body.pdf : '';
      update.digitalSignature = req.body.digitalSignature ? req.body.digitalSignature : '';

      User.updateOne(
        {
          _id: req.params.userId
        },
          update
      ).exec((err, result) => {
        if (!err) {
          if (!user[0].password) {
            try {
              mailOptions={
                from: 'informacion@iasegestion.com',
                to: user[0].email,
                subject: 'Cuenta Activada (Claves de Acceso)',
                text: 'Bienvenido a la plataforma de iasegestion.com, aquí debajo tienes tus claves de acceso:',
                html: '<div><p>Bienvenido a la plataforma de iasegestion.com, aquí debajo tienes tus claves de acceso:</p> <p>Correo: ' + user[0].email + '</p><p>Contraseña: ' + randomPassword + '</p></div>',
              };

              Mailer.newMail(mailOptions, req);
              res.send('OK CORREO');
            } catch (e) {
              res.send('OK NO CORREO');
            }
          } else {
            res.send('OK');
          }
        } else {
          res.send('ERROR');
        }
      });
    });
  });

  app.delete('/api/usuarios/:userId', requireLogin, async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    User.deleteOne(
      {
        _id: req.params.userId
      },
    ).exec(async (err, result) => {
      if (!err) {
        const mailOptions={
          from: 'informacion@iasegestion.com',
          to: user.email,
          subject: 'Información de Solicitud errónea',
          text: 'La información que ha facilitado en la Solicitud de acceso es errónea. Inténtelo de nuevo.',
          html: '<div><p>La información que ha facilitado en la Solitud de Acceso es errónea.</p><p>Inténtelo de nuevo en <a href="https://iasegestion.com">www.iasegestion.com</a>.</p><p>Disculpe las molestias.</p></div>',
        };

        Mailer.newMail(mailOptions, req);
        res.send('OK');
      } else {
        res.send('ERROR');
      }
    });
  });

  app.post('/api/usuarios/:userId/changeState/:state', requireLogin, async (req, res) => {
    User.updateOne(
      {
        _id: req.params.userId
      },
      {
        isActive: req.params.state,
        createDate: new Date()
      }
    ).exec((err, result) => {
      if (!err) {
        res.send({ resutl: 'OK' });
      } else {
        res.send({ resutl: 'ERROR' });
      }
    });
  });

  app.post('/api/usuarios/:userId/regenerar', requireLogin, async (req, res) => {
    const user = await User.find({ _id: req.params.userId });

    const randomPassword = Math.random().toString(36).slice(-8);

    bcrypt.hash(randomPassword, null, null, (err, hash) => {
      User.updateOne(
        {
          _id: req.params.userId
        }, {
          password: hash
        }
      ).exec((err, result) => {
        if (!err) {
          try {
            mailOptions={
              from: 'informacion@iasegestion.com',
              to: user[0].email,
              subject: 'Cuenta Activada (Claves de Acceso)',
              text: 'Bienvenido a la plataforma de iasegestion.com, aquí debajo tienes tus claves de acceso:',
              html: '<div><p>Bienvenido a la plataforma de iasegestion.com, aquí debajo tienes tus claves de acceso:</p> <p>Correo: ' + user[0].email + '</p><p>Contraseña: ' + randomPassword + '</p></div>',
            };

            Mailer.newMail(mailOptions, req);
            res.send('OK CORREO')
          } catch (e) {
            res.send('OK NO CORREO')
          }
        } else {
          res.send('ERROR');
        }
      });
    });
  });



  // app.get('/api/generate', async (req, res) => {
  //   const communities = await Community.find({});
  //   const provinces = await Province.find({});
  //   const populations = await Population.find({});
  //
  //   $array = [];
  //
  //   communities.forEach((community) => {
  //     provinces.forEach((province) => {
  //       if (province._community.toString() === community._id.toString()) {
  //         populations.forEach((population) => {
  //           if (population._province.toString() === province._id.toString()) {
  //               $array.push({
  //                 label: population.name + ' (' + province.name + ', ' + community.name + ')',
  //                 value: population._id.toString()
  //               });
  //           }
  //         });
  //       }
  //     })
  //   })
  //
  //   res.send($array);
  // });
}
