const db = require('../models');
const Product = db.Product;
const Category = db.Category;
const Tag = db.Tag;

const getAllProducts = async () => {
  return await Product.findAll({
    attributes: ['id', 'name', 'stock', 'salePrice', 'costPrice', 'provider', 'categoryId'],
    include: [
      { model: Category, as: 'category' },
      { 
        model: Tag, 
        as: 'tags',
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }
    ]
  });
};

const getProductById = async (id) => {
  return await Product.findByPk(id, {
    attributes: ['id', 'name', 'stock', 'salePrice', 'costPrice', 'provider', 'categoryId'],
    include: [
      { model: Category, as: 'category' },
      { 
        model: Tag, 
        as: 'tags',
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }
    ]
  });
};

const createProduct = async (data) => {
  return await Product.create(data);
};

const updateProduct = async (id, data) => {
  return await Product.update(data, { where: { id } });
};

const deleteProduct = async (id) => {
  return await Product.destroy({ where: { id } });
};

const addTagToProduct = async (productId, tagId) => {
  const product = await Product.findByPk(productId);
  const tag = await Tag.findByPk(tagId);
  if (!product || !tag) return null;
  await product.addTag(tag);
  return { productId, tagId };
};

const removeTagFromProduct = async (productId, tagId) => {
  const product = await Product.findByPk(productId);
  const tag = await Tag.findByPk(tagId);
  if (!product || !tag) return null;
  await product.removeTag(tag);
  return { productId, tagId };
};

const getProductTags = async (productId) => {
  const product = await Product.findByPk(productId, {
    include: [
      { 
        model: Tag, 
        as: 'tags',
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }
    ]
  });
  return product ? product.tags : null;
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
