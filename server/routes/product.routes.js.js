const express = require('express');
const productsController = require('../controller/product.controller');

const router = express.Router();

router.route('/').get(productsController.getAllProducts);
router.route('/:id').get(productsController.getProductsDetails);
router.route('/').post(productsController.createProducts);
router.route('/:id').patch(productsController.updateProducts);
router.route('/:id').delete(productsController.deleteProducs);

module.exports = router;
