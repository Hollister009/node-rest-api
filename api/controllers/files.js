const fs = require('fs');
const path = require('path');
const storage = path.resolve('storage');

const getFileList = (req, res) => {
  try {
    if (!fs.existsSync(storage)) {
      fs.mkdirSync(storage);
    }
  } catch (err) {
    console.error(err);
  }

  fs.readdir(storage, (err, files) => {
    if (err) {
      res.status(404).json({ message: err.message });
    }
    res.json({ files });
  });
};

module.exports = {
  getFileList,
};
