const path = require('path');

const homePageRoute = (req, res) => {
	res.sendFile(path.join(__dirname, '../views/index.html'));
};

module.exports = homePageRoute;
