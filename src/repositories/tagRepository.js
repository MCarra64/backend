const db = require('../models');
const Tag = db.Tag;

const getAllTags = async () => {
  return await Tag.findAll({
    order: [['name', 'ASC']]  // Opcional: ordenar alfabéticamente
  });
};

const getTagById = async (id) => {
  if (!id) throw new Error('ID es requerido');
  return await Tag.findByPk(id);
};

const createTag = async (data) => {
  if (!data || !data.name || data.name.trim() === '') {
    throw new Error('El nombre de la etiqueta es requerido');
  }
  return await Tag.create({
    name: data.name.trim()
  });
};

const updateTag = async (id, data) => {
  if (!id) throw new Error('ID es requerido');
  if (data.name !== undefined && data.name.trim() === '') {
    throw new Error('El nombre de la etiqueta no puede estar vacío');
  }

  return await Tag.update(
    { name: data.name?.trim() },
    { where: { id } }
  );
};

const deleteTag = async (id) => {
  if (!id) throw new Error('ID es requerido');
  return await Tag.destroy({ where: { id } });
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
};
