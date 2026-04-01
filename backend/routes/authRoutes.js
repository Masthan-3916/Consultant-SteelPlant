const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    if (user.role !== 'admin') return res.status(403).json({ error: 'Not an admin' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Setup Initial Admin (One-time or development only)
router.post('/setup-admin', async (req, res) => {
  try {
    const existing = await User.findOne({ where: { email: 'admin@steelplant.com' } });
    if (existing) return res.status(400).json({ error: 'Admin already exists' });

    await User.create({
      name: 'Super Admin',
      email: 'admin@steelplant.com',
      password: 'adminpassword123',
      role: 'admin'
    });
    res.status(201).json({ message: 'Admin setup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

