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
  app.get('/api/upload', (req, res) => {
    const extension = req.query.type ? '.pdf' : '.jpeg';
    const key = `${req.query.folder}/${uuid()}` + extension;
    console.log(extension)
    console.log(key)
    
    s3.getSignedUrl(
      'putObject',
      {
        Bucket: keys.bucket,
        ContentType: req.query.type ? req.query.type : 'image/jpeg',
        Key: key
      },
      (err, url) => {
        console.log(url)
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
        if (!err) {
          res.send('OK');
        } else {
          res.send('ERROR');
        }
      }
    );
  });
};
// signatureVersion: 'v4',
// region: 'eu-west-3'
