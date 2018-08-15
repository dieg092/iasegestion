const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const urlSlug = require('url-slug');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const Post = mongoose.model('post');

module.exports = app => {
  app.get('/api/posts', async (req, res) => {
    let query = req.query;

    // if (query.email) {
    //   query.email = { $regex: '.*' + req.query.email + '.*' };
    // }
    // if (query.name) {
    //   query.name = { $regex: '.*' + req.query.name + '.*' };
    // }
    // if (query.lastName) {
    //   query.lastName = { $regex: '.*' + req.query.lastName + '.*' };
    // }
    // if (query.nif) {
    //   query.nif = { $regex: '.*' + req.query.nif + '.*' };
    // }
    // if (query.gender === 'Femeníno') {
    //   query.gender = true;
    // } else if (query.gender === 'Masculino') {
    //   query.gender = false;
    // }
    // if (query.rol === 'Administrador') {
    //   query.rol = true;
    // } else if (query.rol === 'Cliente') {
    //   query.rol = false;
    // }
    // if (query.isActive === 'Activado') {
    //   query.isActive = true;
    // } else if (query.isActive === 'Desactivado') {
    //   query.isActive = false;
    // }
    // if (query.isVerified === 'Si') {
    //   query.isVerified = true;
    // } else if (query.isVerified === 'No') {
    //   query.isVerified = false;
    // }

    delete query.page;
    delete query.filter;
    await Post.paginate(query, { page: parseInt(req.query.page), limit: 40, sort: {email: 1}},(err, result) => {

      res.send(result);
    });
  });

  app.get('/api/post/:slugPost', requireLogin, async (req, res) => {
    const post = await Post.find({ slug: req.params.slugPost});

    res.send(post);
  });

  app.post('/api/post/:slugPost', requireLogin, async (req, res) => {
    const { title, category, mainPhoto, editor } = req.body;

    const post = await Post.find({ slug: req.params.slugPost });

    let update = {};
    update.title = title ? title : '';
    if (mainPhoto) {
        update.mainPhoto = mainPhoto ? mainPhoto : '';
    }
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

  app.post('/api/post', requireLogin, async (req, res) => {
    const { title, category, mainPhoto, editor } = req.body;

    let newPost = new Post();
    newPost.title = title;
    newPost.category = category;
    newPost.mainPhoto = mainPhoto;
    newPost.body = editor;
    newPost.slug = urlSlug(title, '_');
    newPost.save((err) => {
      if (err) {
          res.statusMessage = "ERROR";
      }
      res.send({});
    });
  });

  app.delete('/api/post/:idPost', requireLogin, async (req, res) => {
    Post.deleteOne(
      {
        _id: req.params.idPost
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
