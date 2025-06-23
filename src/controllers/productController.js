const productAdapter = require('../adapters/productAdapter');
const db = require('../models');
const Product = db.Product;

const getAllProducts = async (req, res) => {
  try {
    const products = await productAdapter.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productAdapter.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productAdapter.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await productAdapter.updateProduct(req.params.id, req.body);
    if (result[0] === 0) {
      return res.status(404).json({ message: 'Product not found or no changes' });
    }
    res.status(200).json({ message: 'Product updated' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await productAdapter.deleteProduct(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addTagToProduct = async (req, res) => {
  try {
    const result = await productAdapter.addTagToProduct(req.params.id, req.body.tagId);
    if (!result) {
      return res.status(404).json({ message: 'Product or tag not found' });
    }
    res.status(200).json({ message: 'Tag added to product', result });
  } catch (error) {
    console.error('Error adding tag to product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const removeTagFromProduct = async (req, res) => {
  try {
    const result = await productAdapter.removeTagFromProduct(req.params.id, req.params.tagId);
    if (!result) {
      return res.status(404).json({ message: 'Product or tag not found' });
    }
    res.status(200).json({ message: 'Tag removed from product', result });
  } catch (error) {
    console.error('Error removing tag from product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProductTags = async (req, res) => {
  try {
    const tags = await productAdapter.getProductTags(req.params.id);
    if (!tags) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching product tags:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const products = await db.Product.findAll({
      where: { categoryId },
      include: [
        { model: db.Category, as: 'category' },
        { model: db.Tag, as: 'tags' }
      ]
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Internal server error for getProductsByCategory' });
  }
};

const addStock = async (req, res) => {
  try {
    console.log('DEBUG -> Entró a addStock');
    console.log('DEBUG -> req.params.id:', req.params.id);
    console.log('DEBUG -> req.body:', req.body);

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      console.log('DEBUG -> Producto no encontrado');
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const { quantityToAdd } = req.body;
    console.log('DEBUG -> quantityToAdd:', quantityToAdd);

    if (typeof quantityToAdd !== 'number' || quantityToAdd <= 0) {
      console.log('DEBUG -> Cantidad inválida');
      return res.status(400).json({ message: 'Cantidad inválida' });
    }

    product.stock += quantityToAdd;
    await product.save();

    console.log('DEBUG -> Stock actualizado:', product.stock);
    res.json({ message: 'Stock actualizado', product });
  } catch (err) {
    console.error('DEBUG -> Error detallado:', err);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
  }
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addTagToProduct,
  removeTagFromProduct,
  getProductTags,
  getProductsByCategory,
  addStock
};
