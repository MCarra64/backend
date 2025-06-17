const authRepository = require('../repositories/authRepository');

const getAllUsers = async () => {
  try {
    const users = await authRepository.getAllUsers();
    return users ? users : [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await authRepository.getUserById(id);
    return user ? user : null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

const bcrypt = require('bcrypt');

const createUser = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const user = await authRepository.createUser(userData);
    return user ? user : null;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


const updateUser = async (id, userData) => {
  try {
    const result = await authRepository.updateUser(id, userData);
    return result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const result = await authRepository.deleteUser(id);
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const login = async (username) => {
  try {
    const user = await authRepository.login(username);
    return user ? user : null;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

const cambiarClave = async (data, id) => {
  try {
    const result = await authRepository.cambiarClave(data, id);
    return result;
  } catch (error) {
    console.error('Error changing password:', error);
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
