import express from 'express';
const router = express.Router();

import v1 from './v1';

router.use('/v1', v1);

import testApi from './test';

router.use('/test', testApi);

module.exports = router;