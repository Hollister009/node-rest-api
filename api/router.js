const express = require('express');
const router = express.Router();
const homePage = require('./controllers');
const usersController = require('./controllers/users');

const { findUserById } = usersController;

// Default page
router.get('/', homePage);

// user CRUD operations
router.post('/users', usersController.addUser);

router.get('/users/:id', findUserById, usersController.getUser);

router.put('/users/:id', findUserById, usersController.updateUser);

router.delete('/users/:id', findUserById, usersController.removeUser);

router.get('/users', usersController.getAllUsers);

module.exports = router;
