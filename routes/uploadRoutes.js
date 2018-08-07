const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  region: 'eu-west-3'
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    console.log(req.query)
    const key = `${req.query.folder}/${uuid()}.jpeg`;
    console.log(req.query)
    s3.getSignedUrl(
      'putObject',
      {
        Bucket: 'iase-test',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => {
        console.log(url)
        res.send({ key, url })
      }
    );
  });
};
// signatureVersion: 'v4',
// region: 'eu-west-3'
