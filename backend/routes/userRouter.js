const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/userController');

userRouter.post('/signUp', userController.postSignUp);
userRouter.post('/login', userController.postLogin);
userRouter.get('/user/:id', userController.getUser);

module.exports = userRouter;