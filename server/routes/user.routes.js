const express = require('express');
const userController = require('../controller/user.controller');

// Import all the controller

const router = express.Router();

router.route('/').get(userController.getAllUsers);
router.route('/').post(userController.createUser);
router.route('/:id').get(userController.getUserInfoByID);

module.exports = router;
