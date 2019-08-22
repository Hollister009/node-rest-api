const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const router = require('./api/router');
require('dotenv').config();

const app = express();
const rootPath = path.resolve('api');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to database'));

app
  .use(router)
  .use(express.json())
  .use(express.static(rootPath));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
