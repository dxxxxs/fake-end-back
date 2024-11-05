const express = require('express');
const controller = require('../controllers/endpoint.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, controller.createEndpoint);

module.exports = router;