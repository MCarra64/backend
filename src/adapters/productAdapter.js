const productRepository = require('../repositories/productRepository');

const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

const getProductById = async (id) => {
  return await productRepository.getProductById(id);
};

const createProduct = async (data) => {
  return await productRepository.createProduct(data);
};

const updateProduct = async (id, data) => {
  return await productRepository.updateProduct(id, data);
};

const deleteProduct = async (id) => {
  return await productRepository.deleteProduct(id);
};

const addTagToProduct = async (productId, tagId) => {
  return await productRepository.addTagToProduct(productId, tagId);
};

const removeTagFromProduct = async (productId, tagId) => {
  return await productRepository.removeTagFromProduct(productId, tagId);
};

const getProductTags = async (productId) => {
  return await productRepository.getProductTags(productId);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addTagToProduct,
  removeTagFromProduct,
  getProductTags
};
