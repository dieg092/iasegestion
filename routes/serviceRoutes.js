const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const urlSlug = require('url-slug');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const Service = mongoose.model('service');

module.exports = app => {
  app.get('/api/services', async (req, res) => {
    let query = req.query;
    delete query.page;
    await Service.paginate(query, { page: parseInt(req.query.page), sort: {title: 1}}, (err, result) => {
      res.send(result);
    });
  });

  app.get('/api/service/:slugService', async (req, res) => {
    const service = await Service.find({ slug: req.params.slugService});
    res.set('Cache-Control', 'public, max-age=31557600');
    res.send(service);
  });

  app.get('/api/service/others/:slugService', async (req, res) => {
    const services = await Service.find().where('slug').ne(req.params.slugService).limit(3);

    res.send(services);
  });

  app.get('/api/services/favourite', async (req, res) => {
    const services = await Service.find({ important: true }).limit(3);
    res.set('Cache-Control', 'public, max-age=31557600');
    res.send(services);
  });


  app.post('/api/service', requireLogin, async (req, res) => {
    const { title, shortDescription, mainPhoto, editor, important, alt } = req.body;
    try {
      let newService = new Service();
      newService.title = title;
      newService.shortDescription = shortDescription;
      newService.mainPhoto = mainPhoto;
      newService.important = important;
      newService.alt = alt;
      newService.body = editor;
      newService.slug = urlSlug(title, '_');
      newService.save((err) => {
        if (err) {
            res.statusMessage = "ERROR";
        }

      });
    } catch (err) {
      res.statusMessage = "ERROR";
    }

    res.send({});

  });

  app.post('/api/service/:slugService', requireLogin, async (req, res) => {
    const { title, shortDescription, mainPhoto, editor, important, alt } = req.body;

    try {
      const service = await Service.find({ slug: req.params.slugService });

      let update = {};
      update.title = title ? title : '';
      update.shortDescription = shortDescription ? shortDescription : '';
      if (mainPhoto) {
          update.mainPhoto = mainPhoto ? mainPhoto : '';
      }
      update.alt = alt ? alt : '';
      update.body = editor ? editor : '';
      update.important = important ? important : false;
      update.slug = title ? urlSlug(title, '_') : '';

      Service.updateOne(
        {
          slug: req.params.slugService
        },
          update
      ).exec((err, result) => {
        if (err) {
          res.statusMessage = "ERROR";
        }
      });
    } catch (err) {
        res.statusMessage = "ERROR";
    }
    res.send({});
  });

  app.delete('/api/service/:idService', requireLogin, async (req, res) => {
    Service.deleteOne(
      {
        _id: req.params.idService
      },
    ).exec((err, result) => {
      if (!err) {
        res.send({});
      } else {
        res.statusMessage = "ERROR";
        res.send({});
      }
    });
  });

}
