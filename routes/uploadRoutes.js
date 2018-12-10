const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

console.log(keys.accessKeyId)
console.log(keys.secretAccessKey)
const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  region: 'eu-west-3'
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const extension = req.query.type ? '.pdf' : '.jpeg';
    const key = `${req.query.folder}/${uuid()}` + extension;
    s3.getSignedUrl(
      'putObject',
      {
        Bucket: keys.bucket,
        ContentType: req.query.type ? req.query.type : 'image/jpeg',
        Key: key
      },
      (err, url) => {
        console.log(err)
        res.send({ key, url })
      }
    );
  });

  app.delete('/api/delete', requireLogin, (req, res) => {
    const key = `${req.query.key}`;

    s3.deleteObject(
      {
        Bucket: keys.bucket,
        Key: key
      },
      (err, data) => {
        console.log(err)
        res.send({ data });
      }
    );
  });
};
// signatureVersion: 'v4',
// region: 'eu-west-3'
