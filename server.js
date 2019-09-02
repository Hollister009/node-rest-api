const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');

require('dotenv').config();

const app = express();
const router = require('./api/router');
const port = process.env.PORT || 3000;
const db_uri = process.env.MONGODB_URI;

mongoose.connect(db_uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('MongoDB connection established'));

const loggerTool = (req, res, next) => {
  const now = new Date().toLocaleString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) console.log('Unable to append to file');
  });
  next();
};

const publicDir = path.resolve('public');
// Set view-engine
app.set('view engine', 'pug');
app.use(
  sassMiddleware({
    src: publicDir,
    dest: publicDir,
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  }),
);
// Config server
app
  .use(express.json())
  .use(express.static(publicDir))
  .use(loggerTool)
  .use(router);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
