const express = require('express');

const controller = require('../controllers/user.controller');

const router = express.Router();

router.delete('/:_id', controller.deleteUser);
router.patch('/:_id', controller.updateUser);

module.exports = router;