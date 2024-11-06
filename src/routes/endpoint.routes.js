const express = require('express');
const controller = require('../controllers/endpoint.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, controller.createEndpoint);
router.delete('/:endpointId', authMiddleware, controller.deleteEndpoint);
router.patch('/:endpointId', authMiddleware, controller.updateEndpoint);
router.get('/', authMiddleware, controller.getEndpoints);

module.exports = router;