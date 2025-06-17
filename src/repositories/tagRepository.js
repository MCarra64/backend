const db = require('../models');
const Tag = db.Tag;

const getAllTags = async () => {
  return await Tag.findAll();
};

const getTagById = async (id) => {
  return await Tag.findByPk(id);
};

const createTag = async (data) => {
  return await Tag.create(data);
};

const updateTag = async (id, data) => {
  return await Tag.update(data, { where: { id } });
};

const deleteTag = async (id) => {
  return await Tag.destroy({ where: { id } });
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
};
