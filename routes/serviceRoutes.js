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
    await Service.paginate(query, { page: parseInt(req.query.page), limit: 40, sort: {title: 1}}, (err, result) => {
      res.send(result);
    });
  });

  app.post('/api/service', requireLogin, async (req, res) => {
    const { title, shortDescription, mainPhoto, editor, important } = req.body;

    let newService = new Service();
    newService.title = title;
    newService.shortDescription = shortDescription;
    newService.mainPhoto = mainPhoto;
    newService.important = important;
    newService.body = editor;
    newService.slug = urlSlug(title, '_');
    newService.save((err) => {
      if (err) {
          res.statusMessage = "ERROR";
      }
      res.send({});
    });
  });
}
