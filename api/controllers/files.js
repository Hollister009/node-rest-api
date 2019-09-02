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

const uplaodFile = (req, res) => {
  res.send('File uplaoded');
};

const selectFile = (req, res) => {
  res.send('File selected');
};

const createFile = (req, res) => {
  res.send('File created');
};

const updateFile = (req, res) => {
  res.send('File updated');
};

const deleteFile = (req, res) => {
  res.send('File deleted');
};

module.exports = {
  getFileList,
  uplaodFile,
  selectFile,
  createFile,
  updateFile,
  deleteFile,
};
