const mongoose = require('mongoose');
const _ = require('lodash');
const crypto = require('crypto');
const bcrypt   = require('bcrypt-nodejs');
const keys = require('../config/keys');
const Mailer = require('../services/Mailer');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('user');

module.exports = app => {
  app.get('/api/usuarios', requireLogin, async (req, res) => {
    let query = req.query;
    const page = parseInt(req.query.page);
    console.log(query)
    if (query.email) {
      query.email = { $regex: '.*' + req.query.email + '.*' };
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
    if (query.gender === 'Femeníno') {
      query.gender = true;
    } else if (query.gender === 'Masculino') {
      query.gender = false;
    }
    if (query.rol === 'Administrador') {
      query.rol = true;
    } else if (query.rol === 'Cliente') {
      query.rol = false;
    }
    if (query.isActive === 'Activado') {
      query.isActive = true;
    } else if (query.isActive === 'Desactivado') {
      query.isActive = false;
    }
    if (query.isVerified === 'Si') {
      query.isVerified = true;
    } else if (query.isVerified === 'No') {
      query.isVerified = false;
    }

    delete query.callback;
    delete query.page;
    delete query._;
    await User.paginate(query, { page: page, limit: 30, sort: {email: 1}},(err, result) => {
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
        {nif: { $regex: '.*' + req.query.nif + '.*' }}
      ]
    }, (err, result) => {
        let array = [];
        result.forEach((user) => {
          let data = {};
          data.label = (user.name ? user.name + ' ' : '' + '  ') + (user.lastName ? user.lastName + ' ' : '') +  (user.nif ?  ' - ' + user.nif : '');
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

  app.post('/api/usuarios/:userId', requireLogin, async (req, res) => {
    const user = await User.find({ _id: req.params.userId });
    let update = {};

    const randomPassword = Math.random().toString(36).slice(-8);

    bcrypt.hash(randomPassword, null, null, (err, hash) => {
      if (!user[0].password) {
        update.password = hash;
      }
      update.name = req.body.name ? req.body.name : '';
      update.lastName = req.body.lastName ? req.body.lastName : '';
      update.nif = req.body.nif ? req.body.nif : '';
      update.gender = req.body.gender ? req.body.gender : false;
      update.rol = req.body.rol ? req.body.rol : false;
      update._population = req.body.populationId ? req.body.populationId : '';

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
                from: 'Iasegestion <informacion@iasegestion.com>',
                to: user[0].email,
                subject: 'Cuenta Activada (Claves de Acceso)',
                text: 'Bienvenido a la plataforma de iasegestion.com, aquí debajo tienes tus claves de acceso:',
                html: '<div><p>Bienvenido a la plataforma de iasegestion.com, aquí debajo tienes tus claves de acceso:</p> <p>Correo: ' + user[0].email + '</p><p>Contraseña: ' + randomPassword + '</p></div>',
              };

              Mailer.newMail(mailOptions, req);
              res.statusMessage = "OK CORREO";
            } catch (e) {
              res.statusMessage = "OK NO CORREO";
            }
          } else {
            res.statusMessage = "OK";
          }
          res.send({});
        } else {
          res.statusMessage = "ERROR";
          res.send({});
        }
      });
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
              from: 'Iasegestión <informacion@iasegestion.com>',
              to: user[0].email,
              subject: 'Cuenta Activada (Claves de Acceso)',
              text: 'Bienvenido a la plataforma de iasegestion.com, aquí debajo tienes tus claves de acceso:',
              html: '<div><p>Bienvenido a la plataforma de iasegestion.com, aquí debajo tienes tus claves de acceso:</p> <p>Correo: ' + user[0].email + '</p><p>Contraseña: ' + randomPassword + '</p></div>',
            };

            Mailer.newMail(mailOptions, req);
            res.statusMessage = "OK CORREO";
          } catch (e) {
            res.statusMessage = "OK NO CORREO";
          }
          res.send({});
        } else {
          res.statusMessage = "ERROR";
          res.send({});
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
