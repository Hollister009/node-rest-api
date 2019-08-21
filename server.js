const router = require('./router');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
