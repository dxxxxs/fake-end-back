const express = require('express');

const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');

const router = express.Router();

router.use('/api/user', userRouter);
router.use('/api/auth', authRouter);
// router.use('/u', endpointRoutes);

module.exports = router;