const express = require('express');
const propertyController = require('../controller/property.controller');

const router = express.Router();

router.route('/').get(propertyController.getAllProperties);
router.route('/:id').get(propertyController.getPropertyDetail);
router.route('/').post(propertyController.createProperty);
router.route('/:id').patch(propertyController.updateProperty);
router.route('/:id').delete(propertyController.deleteProperty);

module.exports = router;
