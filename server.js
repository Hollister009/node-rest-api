const router = require('./api/router');
const express = require('express');
const path = require('path');

const app = express();
const rootPath = path.resolve('api');

app.use(express.static(rootPath));
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
