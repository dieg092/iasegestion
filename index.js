const https = require('https');
const http = require('http')
const fs = require('fs');
const cluster = require('cluster');
const os = require('os');
const app = require('./app');

const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++)
  {
    cluster.fork();
  }
}  else {
  const PORT = process.env.PORT || 9000;
  const server = '';
  if (process.env.NODE_ENV === 'production') {
    const privateKey = fs.readFileSync('../../../../etc/letsencrypt/live/www.iasegestion.com/privkey.pem');
    const certificate = fs.readFileSync('../../../../etc/letsencrypt/live/www.iasegestion.com/fullchain.pem');

    server = https.createServer({
        key: privateKey,
        cert: certificate
    }, app);

  } else {
    server = http.createServer(app);
  }
  server.listen(PORT);
}
