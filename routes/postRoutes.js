const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const urlSlug = require('url-slug');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const Post = mongoose.model('post');

module.exports = app => {
  app.get('/api/posts', async (req, res) => {
    let query = req.query;
    const page = parseInt(req.query.page);

    if (query.title) {
      query.title = { $regex: '.*' + req.query.title + '.*' };
    }
    if (query.category) {
      query.category = query.category;
    }

    delete query.page;
    delete query.filter;

    await Post.paginate(query, { page: page, limit: 12, sort: {date: -1}},(err, result) => {
      res.send(result);
    });
  });

  app.get('/api/post/:slugPost', async (req, res) => {
    const post = await Post.find({ slug: req.params.slugPost});

    res.send(post);
  });

  app.get('/api/post/others/:slugPost', async (req, res) => {
    const post = await Post.find().where('slug').ne(req.params.slugPost).limit(3).sort({date: -1});
    res.set('Cache-Control', 'public, max-age=31557600');
    res.send(post);
  });



  app.post('/api/post/:slugPost', requireLogin, async (req, res) => {
    const { title, category, mainPhoto, editor, alt } = req.body;

    const post = await Post.find({ slug: req.params.slugPost });

    let update = {};
    update.title = title ? title : '';
    if (mainPhoto) {
        update.mainPhoto = mainPhoto ? mainPhoto : '';
    }
    update.alt = alt ? alt : '';
    update.body = editor ? editor : '';
    update.category = category ? category : '';
    update.slug = title ? urlSlug(title, '_') : ''

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
    const { title, category, mainPhoto, editor, alt } = req.body;

    let newPost = new Post();
    newPost.title = title;
    newPost.category = category;
    newPost.mainPhoto = mainPhoto;
    newPost.alt = alt;
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
