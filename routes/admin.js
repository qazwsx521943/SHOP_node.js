const path = require('path');

const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

const userController = require('../controllers/user');


router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.postAddProduct);

router.get('/user', userController.getAllUsers);

router.get('/add-user', userController.getAddUser);

router.post('/add-user', userController.postAddUser);

router.get('/login', userController.getLogin);

// router.post('/login', userController.postLogin);

// 使用者詳細資訊
router.get('/user/:user_id', userController.getUserDetail);
module.exports = router;