const userRouter = require('./user.routes');

const express = require('express');
const router = express.Router();

router.use('/api', userRouter);
// router.use('/u', endpointRoutes);

module.exports = router;