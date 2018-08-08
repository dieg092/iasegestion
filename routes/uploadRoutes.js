const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

AWS.config.update({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    region: 'eu-west-3'
});

const s3 = new AWS.S3();
module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.query.folder}/${uuid()}.jpeg`;
    s3.putObject(
      {
        Bucket: 'iase-test',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => {
        console.log(err)
        console.log(url)
        res.send({ key, url })
      }
    );
  });
};
// signatureVersion: 'v4',
// region: 'eu-west-3'
