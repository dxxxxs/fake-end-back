const controller = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();

router.post('/createUser', controller.createUser);

module.exports = router;
