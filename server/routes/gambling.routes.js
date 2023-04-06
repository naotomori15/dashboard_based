const express = require('express');
const gamblingController = require('../controller/gambling.controller');

const router = express.Router();

router.route('/').get(gamblingController.getAllGambling);
router.route('/:id').get(gamblingController.getGamblingDetails);
router.route('/').post(gamblingController.creataGambling);
router.route('/:id').patch(gamblingController.editGambling);

module.exports = router;
