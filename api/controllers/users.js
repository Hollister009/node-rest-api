const User = require('../models/user');

// GET method
const getUser = (req, res) => {
	res.send('User Found!');
};
// POST method
const addUser = (req, res) => {
	res.send('User Created!');
};
// PUT method
const updateUser = (req, res) => {
	res.send('User Updated!');
};
// DELETE method
const removeUser = (req, res) => {
	res.send('User Deleted!');
};
// GET method
const getUsers = (req, res) => {
	res.json([]);
};

module.exports = {
	getUser,
	addUser,
	updateUser,
	removeUser,
	getUsers,
};
