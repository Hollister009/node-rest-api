const router = require('./router');
const express = require('express');
const path = require('path');

router.use(express.static(path.join(__dirname, 'src')));

const port = process.env.PORT || 3000;

router.listen(port, () => console.log(`Listening on ${port}!`));