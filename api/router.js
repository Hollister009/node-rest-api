const express = require('express');
const router = express.Router();
const homePage = require('./controllers');
const usersController = require('./controllers/users');


router.get('/', homePage);

// user CRUD operations
router.post('/user/', usersController.addUser);

router.get('/user/:id', usersController.getUser);

router.put('/user/:id', usersController.updateUser);

router.delete('/user/:id', usersController.removeUser);

router.get('/users', usersController.getUsers);

module.exports = router;
