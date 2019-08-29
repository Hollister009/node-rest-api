const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

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

// Set view-engine
app.set('view engine', 'pug');

// Config server
app
  .use(express.json())
  .use(express.static(path.resolve('public')))
  .use(loggerTool)
  .use(router);

// Error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message
  });
})

app.listen(port, () => console.log(`Server is running on port: ${port}`));
