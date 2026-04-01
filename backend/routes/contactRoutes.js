const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await Contact.create({ name, email, message });
    res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin fetching contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.findAll({ order: [['date', 'DESC']] });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

