import express from 'express';
const router = express.Router();

import userController from '../../controllers/user.controller';
import userMiddleware from '../../middlewares/user.middleware';

// tạo ra middleware validate tất cả query, params trước khi userController.getUsers đươcj gọi.
router.get('/', userMiddleware.getUserValidate, userController.getUsers);

router.post('/', userController.createUser)

router.delete('/:id', userController.deleteUserById)

router.put('/:id', userController.updateUserById)

router.patch('/:id', userController.updateFieldUserById)

module.exports = router;