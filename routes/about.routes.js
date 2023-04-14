const express = require('express');
const aboutController = require('../controller/about.controller');

const router = express.Router();

router.route('/').get(aboutController.getAllAbouts);
router.route('/:id').get(aboutController.getAboutDetails);
router.route('/').post(aboutController.createAbout);
router.route('/:id').patch(aboutController.editAbout);
router.route('/:id').delete(aboutController.deleteAbout);

module.exports = router;
