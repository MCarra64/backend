const authAdapter = require('../adapters/authAdapter');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const users = await authAdapter.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await authAdapter.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await authAdapter.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = req.body;
    const result = await authAdapter.updateUser(id, userData);
    res.status(200).json({ message: 'User updated', rowsAffected: result });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await authAdapter.deleteUser(id);
    res.status(200).json({ message: 'User deleted', rowsAffected: result });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authAdapter.login(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const safeUser = {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      canAddSale: user.canAddSale,
      canAddInventory: user.canAddInventory,
      canAccessResumen: user.canAccessResumen,
      canAccessControlPersonal: user.canAccessControlPersonal,
      status: user.status
    };

    res.status(200).json(safeUser);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const cambiarClave = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await authAdapter.cambiarClave(data, id);
    res.status(200).json({ message: 'Password updated', rowsAffected: result });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Internal server error' });
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
