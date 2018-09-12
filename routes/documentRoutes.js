const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const urlSlug = require('url-slug');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const Document = mongoose.model('document');

module.exports = app => {
  app.post('/api/fiscal-financiero/:slugDocument', requireLogin, async (req, res) => {
    const { name, number, pdf, type } = req.body;

    const document = await Document.find({ slug: req.params.slugDocument });

    let update = {};
    update.title = title ? title : '';
    if (mainPhoto) {
        update.mainPhoto = mainPhoto ? mainPhoto : '';
    }
    update.alt = alt ? alt : '';
    update.body = editor ? editor : '';
    update.category = category ? category : '';
    update.slug = title ? urlSlug(title, '_') : '';

    Post.updateOne(
      {
        slug: req.params.slugPost
      },
        update
    ).exec((err, result) => {
      if (!err) {
        res.send({});
      } else {
        res.statusMessage = "ERROR";
        res.send({});
      }
    });
  });

  app.post('/api/fiscal-financiero', requireLogin, async (req, res) => {
    const { name, number, pdf, type } = req.body;

    let newDocument = new Document();
    newDocument.name = name;
    newDocument.type = type;
    newDocument.pdf = pdf;
    newDocument.number = number;
    newDocument.slug = urlSlug(name, '_');
    newDocument.save((err) => {
      console.log(err.name)
      if (err && err.name === 'ValidationError') {
        res.statusMessage = "ERROR NAME";
      } else if (err) {
        res.statusMessage = "ERROR";
      }
      res.send({});
    });
  });
}
