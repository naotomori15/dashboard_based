const express = require('express');
const themeController = require('../controller/theme.controller');

const router = express.Router();

router.route('/').get(themeController.getAllThemes);
router.route('/:id').get(themeController.getDetailsThemes);
router.route('/').post(themeController.createThemes);
router.route('/:id').patch(themeController.editThemes);

module.exports = router;
