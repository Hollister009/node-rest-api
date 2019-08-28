const User = require('../models/user');

// POST method
const addUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    creationDate: req.body.creationDate,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// GET method
const getUser = (req, res) => {
  res.json(req.user);
};
// PUT method
const updateUser = async (req, res) => {
  if (req.body.name !== null || undefined) {
    req.user.name = req.body.name;
  }

  try {
    const updatedUser = await req.user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// DELETE method
const removeUser = async (req, res) => {
  try {
    const deletedUser = await req.user.remove();
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// GET method
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function findUserById(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if (user === null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  req.user = user;
  next();
}

module.exports = {
  getUser,
  addUser,
  updateUser,
  removeUser,
  getAllUsers,
  findUserById,
};
