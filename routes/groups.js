const express = require('express');
const router = express.Router();
const GroupController = require('../controllers/GroupController');
const authenticate = require('../middleware/authenticate');

router.get('/', GroupController.getGroups);
router.post('/', authenticate, GroupController.createGroup);
router.get('/:id', GroupController.getGroup);
router.delete('/:id', authenticate, GroupController.deleteGroup);

module.exports = router;