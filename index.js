const https = require('https');
const http = require('http')
const fs = require('fs');
const cluster = require('cluster');
const os = require('os');
const app = require('./app');
require('dotenv').config();

const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++)
  {
    cluster.fork();
  }
}  else {
  if (process.env.NODE_ENV === 'production') {
    const privateKey = fs.readFileSync('../../../../etc/letsencrypt/live/www.iasegestion.com/privkey.pem');
    const certificate = fs.readFileSync('../../../../etc/letsencrypt/live/www.iasegestion.com/fullchain.pem');
    console.log('private')
    console.log(privateKey);
    console.log('certificate')
    console.log(certificate);
    https.createServer({
        key: privateKey,
        cert: certificate
    }, app).listen(9000);
    //http.createServer(app).listen(9000);

  } else {
    http.createServer(app).listen(9000);
  }
}
