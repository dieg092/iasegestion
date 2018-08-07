const mongoose = require('mongoose');
const _ = require('lodash');
const crypto = require('crypto');
const bcrypt   = require('bcrypt-nodejs');
const keys = require('../config/keys');
const Mailer = require('../services/Mailer');
const requireLogin = require('../middlewares/requireLogin');

const Service = mongoose.model('service');

module.exports = app => {

  app.post('/api/service', async (req, res) => {
    console.log(req.body)
    const { title, shortDescription, mainPhoto, editor } = req.body;

    let newService = new Service();
    newService.title = title;
    newService.shortDescription = shortDescription;
    newService.mainPhoto = mainPhoto;
    newService.body = editor;
    newService.save((err) => {

    });
  });
}
