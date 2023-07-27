import express from 'express';
const router = express.Router();

import categoryModel from '../models/category.model';
router.use('/', async (req, res) => {
    // console.log('Da vao', req.body)
    let result = await categoryModel.readMany()
    console.log(result)
})

module.exports = router;