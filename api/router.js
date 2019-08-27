const router = require('express').Router();
const usersController = require('./controllers/users');

const { findUserById } = usersController;

// Home page
router.get('/', (req, res) => res.render('index'));

// Users page
router.get('/users', (req, res) => res.render('users'));

// Files page
router.get('/files', (req, res) => res.render('files'));

// user CRUD operations
router.route('api/users')
  .get(usersController.getAllUsers)
  .post(usersController.addUser)

router.route('api/users/:id')
  .get(findUserById, usersController.getUser)
  .put(findUserById, usersController.updateUser)
  .delete(findUserById, usersController.removeUser);

module.exports = router;
