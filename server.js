const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./api/router');
require('dotenv').config();

const app = express();
const rootPath = path.resolve('api');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to database'));

const loggerTool = (req, res, next) => {
  const now = new Date().toLocaleString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) console.log('Unable to append to file');
  });
  next();
};

//Request Parsing
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(rootPath))
  .use(loggerTool)
  .use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
