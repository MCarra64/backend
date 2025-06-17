const tagRepository = require('../repositories/tagRepository');

const getAllTags = async () => {
  return await tagRepository.getAllTags();
};

const getTagById = async (id) => {
  return await tagRepository.getTagById(id);
};

const createTag = async (data) => {
  return await tagRepository.createTag(data);
};

const updateTag = async (id, data) => {
  return await tagRepository.updateTag(id, data);
};

const deleteTag = async (id) => {
  return await tagRepository.deleteTag(id);
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
};
