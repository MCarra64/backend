const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/:id/tags', productController.addTagToProduct);
router.get('/:id/tags', productController.getProductTags);
router.delete('/:id/tags/:tagId', productController.removeTagFromProduct);

module.exports = router;
