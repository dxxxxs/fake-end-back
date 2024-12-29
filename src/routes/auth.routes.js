const express = require('express');
const loginLimiter = require('../middlewares/loginLimiter');
const controller = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', loginLimiter, controller.login);

module.exports = router;