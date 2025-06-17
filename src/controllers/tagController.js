const tagAdapter = require('../adapters/tagAdapter');

const getAllTags = async (req, res) => {
  try {
    const tags = await tagAdapter.getAllTags();
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getTagById = async (req, res) => {
  try {
    const tag = await tagAdapter.getTagById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (error) {
    console.error('Error fetching tag:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createTag = async (req, res) => {
  try {
    const tag = await tagAdapter.createTag(req.body);
    res.status(201).json(tag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTag = async (req, res) => {
  try {
    const result = await tagAdapter.updateTag(req.params.id, req.body);
    if (result[0] === 0) {
      return res.status(404).json({ message: 'Tag not found or no changes' });
    }
    res.status(200).json({ message: 'Tag updated' });
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTag = async (req, res) => {
  try {
    const result = await tagAdapter.deleteTag(req.params.id);
    if (result === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.status(200).json({ message: 'Tag deleted' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
};
