import express from 'express';
const router = express.Router();

import categoryController from '../../controllers/category.controller';

router.post('/', categoryController.create);

module.exports = router;