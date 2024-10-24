const controller = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();

router.post('/user', controller.createUser);
router.delete('/user/:_id', controller.deleteUser);

module.exports = router;