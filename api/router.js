const express = require('express');
const router = express.Router();
const homePage = require('./controllers');

router.get('/', homePage);

module.exports = router;
