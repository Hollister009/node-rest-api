const path = require('path');

const homePage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
}

module.exports = homePage;