const path = require('path');

const homePage = (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
}

module.exports = homePage;
