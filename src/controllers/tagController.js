const tagAdapter = require('../adapters/tagAdapter');

const getAllTags = async (req, res) => {
  try {
    const tags = await tagAdapter.getAllTags();
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error.message);
    res.status(500).json({ message: 'Error al obtener etiquetas' });
  }
};

const getTagById = async (req, res) => {
  try {
    const tag = await tagAdapter.getTagById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Etiqueta no encontrada' });
    }
    res.status(200).json(tag);
  } catch (error) {
    console.error('Error fetching tag:', error.message);
    res.status(500).json({ message: 'Error al obtener la etiqueta' });
  }
};

const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'El nombre de la etiqueta es requerido' });
    }

    const tag = await tagAdapter.createTag({ name: name.trim() });
    res.status(201).json(tag);
  } catch (error) {
    console.error('Error creating tag:', error.message);
    res.status(500).json({ message: 'Error al crear la etiqueta' });
  }
};

const updateTag = async (req, res) => {
  try {
    const { name } = req.body;
    if (name && name.trim() === '') {
      return res.status(400).json({ message: 'El nombre de la etiqueta no puede estar vacío' });
    }

    const result = await tagAdapter.updateTag(req.params.id, req.body);
    if (result[0] === 0) {
      return res.status(404).json({ message: 'Etiqueta no encontrada o sin cambios' });
    }
    res.status(200).json({ message: 'Etiqueta actualizada' });
  } catch (error) {
    console.error('Error updating tag:', error.message);
    res.status(500).json({ message: 'Error al actualizar la etiqueta' });
  }
};

const deleteTag = async (req, res) => {
  try {
    const result = await tagAdapter.deleteTag(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Etiqueta no encontrada' });
    }
    res.status(200).json({ message: 'Etiqueta eliminada' });
  } catch (error) {
    console.error('Error deleting tag:', error.message);
    res.status(500).json({ message: 'Error al eliminar la etiqueta' });
  }
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
};
