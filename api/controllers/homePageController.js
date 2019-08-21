const path = require('path');

const homePageController = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
}

module.exports = homePageController;