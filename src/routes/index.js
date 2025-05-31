const { Router} = require('express')

const router = Router();

const authRouter = require('./auth.routes');

router.use('/api/v1/auth', authRouter);

module.exports = router