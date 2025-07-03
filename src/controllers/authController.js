const { createUser, findUserByEmail } = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/token');

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await findUserByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await hashPassword(password);
    const [user] = await createUser({ name, email, password: hashed, role });

    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
