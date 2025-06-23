const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

const db = require('../models');
const Product = db.Product;
const Category = db.Category;

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/:id/tags', productController.addTagToProduct);
router.get('/:id/tags', productController.getProductTags);
router.delete('/:id/tags/:tagId', productController.removeTagFromProduct);
router.get('/by-category/:categoryId', productController.getProductsByCategory);
router.get('/products-with-categories', async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'salePrice'],
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name']
      }
    });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

module.exports = router;
