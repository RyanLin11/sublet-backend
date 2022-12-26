const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authenticate = require('../middleware/authenticate');

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);
router.get('/:id', UserController.getUser);
router.put('/:id', authenticate, UserController.editUser);
router.delete('/:id', authenticate, UserController.deleteUser);

module.exports = router;
