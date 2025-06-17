const db = require('../models');
const User = db.User;

const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'username',
        'fullName',
        'role',
        'canAccessResumen',
        'canAccessControlPersonal',
        'canAddSale',
        'canAddInventory',
        'status'
      ]
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: [
        'id',
        'username',
        'fullName',
        'role',
        'canAccessResumen',
        'canAccessControlPersonal',
        'canAddSale',
        'canAddInventory',
        'status'
      ]
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const updateUser = async (id, userData) => {
  try {
    const [rowsUpdated] = await User.update(userData, {
      where: { id }
    });
    return rowsUpdated;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const rowsDeleted = await User.destroy({
      where: { id }
    });
    return rowsDeleted;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const login = async (username) => {
  try {
    const user = await User.findOne({
      where: { username }
    });
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const cambiarClave = async (data, id) => {
  try {
    const [rowsUpdated] = await User.update(data, {
      where: { id }
    });
    return rowsUpdated;
  } catch (error) {
    console.error('Error updating user password:', error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  cambiarClave
};
