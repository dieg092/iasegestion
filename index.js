const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const https = require('https');
const flash = require('connect-flash');
const fs = require('fs');
const compression = require('compression');
const cluster = require('cluster');
const os = require('os');
const keys = require('./config/keys');
require('dotenv').config();
require('./models/Community');
require('./models/Province');
require('./models/Population');
require('./models/Service');
require('./models/Post');
require('./models/Document');
require('./models/User');
require('./models/Token');
require('./services/passport');

const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++)
  {
    cluster.fork();
  }
}  else {
  mongoose.Promise = global.Promise;
  mongoose.connect(keys.mongoURI);

  const app = express();
  app.use(bodyParser.json());
  app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.use(compression());

  require('./routes/authRoutes')(app);
  require('./routes/userRoutes')(app);
  require('./routes/uploadRoutes')(app);
  require('./routes/serviceRoutes')(app);
  require('./routes/postRoutes')(app);
  require('./routes/documentRoutes')(app);


  const PORT = process.env.PORT || 9000;

  if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognice the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
    const privateKey = fs.readFileSync('../../../../etc/letsencrypt/live/www.iasegestion.com/privkey.pem');
    const certificate = fs.readFileSync('../../../../etc/letsencrypt/live/www.iasegestion.com/fullchain.pem');

    https.createServer({
        key: privateKey,
        cert: certificate
    }, app).listen(port);

  } else {
    app.listen(PORT, 'localhost');
  }
}
