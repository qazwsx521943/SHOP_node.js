const path = require('path');

const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

const userController = require('../controllers/user');

const authController = require('../controllers/auth');


router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.postAddProduct);

router.get('/user', userController.getAllUsers);

router.get('/add-user', authController.getAddUser);

router.post('/add-user', authController.postAddUser);

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

// 使用者詳細資訊
router.get('/user/:user_id', userController.getUserDetail);
module.exports = router;