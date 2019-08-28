const fs = require('fs');
const path = require('path');
const storage = path.resolve('storage');

const getFileList = (req, res) => {
  try {
    if (!fs.existsSync(storage)) {
      fs.mkdirSync(storage);
    }

    fs.readdir(storage, (err, files) => {
      res.json({ files });
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getFileList,
};
