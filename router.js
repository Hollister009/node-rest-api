const express = require('express');
const router = express.Router();
const homePageRoute = require('./api/routes');

router.get('/', homePageRoute);

module.exports = router;