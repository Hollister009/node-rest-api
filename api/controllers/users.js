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
	res.send('User Found!');
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
			res.status(404).json({ message: 'User not found' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}

	res.user = user;
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
