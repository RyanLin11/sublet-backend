const express = require('express');
const router = express.Router();
const SessionController = require('../controllers/SessionController');
const authenticate = require('../middleware/authenticate');

router.post('/', SessionController.createSession);
router.get('/me', authenticate, SessionController.getMySession);
router.delete('/me', authenticate, SessionController.deleteMySession);

module.exports = router;