const express = require('express');
const controller = require('../controllers/endpoint.controller');
const endpointSimulator = require('../middlewares/endpointSimulator');

const router = express.Router();

router.all('/:userId/*', endpointSimulator);

module.exports = router;