const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const urlSlug = require('url-slug');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const Document = mongoose.model('document');

module.exports = app => {

  app.get('/api/docs', async (req, res) => {
    let query = req.query;
    const page = parseInt(req.query.page);

    if (query.name) {
      query.name = { $regex: '.*' + req.query.name + '.*' };
    }
    if (query.number) {
      query.number = { $regex: '.*' + req.query.number + '.*' };
    }
    if (query.type) {
      if (query.type !== 'Financiero') {
        query.type = { $regex: '.*' + req.query.type + '.*' };
      } else {
        query.type = { $ne: 'Impuesto' };
      }
    }

    if (query.client) {
      query.client._id = { $regex: '.*' + req.query.client + '.*' };
    }

    delete query.page;
    delete query.filter;

    await Document.paginate(query, { page: page, limit: 30, sort: {date: -1}, populate: 'client'},(err, result) => {
      res.send(result);
    });
  });

  app.get('/api/docs/:slugDocument', async (req, res) => {
    const doc = await Document.find({ slug: req.params.slugDocument }).populate('client');

    res.send(doc);
  });

  app.post('/api/docs/:slugDocument', requireLogin, async (req, res) => {
    const { name, number, pdf, type, client, namePDF } = req.body;

    const document = await Document.find({ slug: req.params.slugDocument });

    let update = {};
    update.name = name ? name : '';
    if (pdf) {
        update.pdf = pdf ? pdf : '';
        update.namePDF = namePDF ? namePDF : '';
    }
    update.type = type ? type : '';
    if (client) {
      update.client = client;
    }
    update.number = number ? number : '';
    update.slug = name ? urlSlug(name, '_') : '';

    Document.updateOne(
      {
        slug: req.params.slugDocument
      },
        update
    ).exec((err, result) => {

      if (err && err.name === 'ValidationError') {
        res.send('ERROR NAME');
      } else if (err) {
        res.send('ERROR');
      }
    });
  });

  app.post('/api/docs', requireLogin, async (req, res) => {
    const { name, number, pdf, type, client, namePDF } = req.body;

    let newDocument = new Document();
    newDocument.name = name;
    newDocument.type = type;
    newDocument.pdf = pdf;
    newDocument.namePDF = namePDF;
    newDocument.number = number;
    newDocument.slug = urlSlug(name, '_');
    newDocument.client = client;
    newDocument.save((err) => {
      if (err && err.name === 'ValidationError') {
        res.send('ERROR NAME');
      } else if (err) {
        res.send('ERROR');
      } else {
        res.send('OK');
      }
    });
  });

  app.delete('/api/docs/:idDoc', requireLogin, async (req, res) => {
    Document.deleteOne(
      {
        _id: req.params.idDoc
      },
    ).exec((err, result) => {
      if (!err) {
        res.send('OK');
      } else {
        res.send('ERROR');
      }
    });
  });
}
