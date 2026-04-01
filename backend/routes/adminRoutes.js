const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Employee = require('../models/Employee');
const Inventory = require('../models/Inventory');
const Contact = require('../models/Contact');
const authMiddleware = require('./authMiddleware');

// Protect all admin routes
router.use(authMiddleware);

/* --- Dashboard Overview Stats --- */
router.get('/stats', async (req, res) => {
  try {
    const totalProjects = await Project.count();
    const completedProjects = await Project.count({ where: { status: 'Completed' } });
    const totalEmployees = await Employee.count({ where: { status: 'Active' } });
    const totalInventoryCount = await Inventory.count();

    // Sum of salaries
    const totalSalaries = await Employee.sum('monthlySalary', { where: { status: 'Active' } });

    res.json({
      totalProjects,
      completedProjects,
      totalEmployees,
      totalInventoryCount,
      monthlyPayroll: totalSalaries || 0,
      inProgressProjects: totalProjects - completedProjects
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching stats' });
  }
});

/* --- Employee Management --- */
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll({ order: [['dateJoined', 'DESC']] });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

router.post('/employees', async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: 'Error creating employee' });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    await Employee.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Employee removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

/* --- Inventory / Material Management --- */
router.get('/inventory', async (req, res) => {
  try {
    const inventory = await Inventory.findAll({ order: [['lastUpdated', 'DESC']] });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching inventory' });
  }
});

router.post('/inventory', async (req, res) => {
  try {
    const newItem = await Inventory.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Error adding inventory item' });
  }
});

router.put('/inventory/:id', async (req, res) => {
  try {
    await Inventory.update(req.body, { where: { id: req.params.id } });
    const updated = await Inventory.findByPk(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating inventory' });
  }
});

router.delete('/inventory/:id', async (req, res) => {
  try {
    await Inventory.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Stock item removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting inventory item' });
  }
});

/* --- Project Management --- */
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [['dateCompleted', 'DESC']] });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Error creating project' });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    await Project.update(req.body, { where: { id: req.params.id } });
    const updated = await Project.findByPk(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating project' });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Project removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting project' });
  }
});

/* --- Message/Contact Log --- */
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.findAll({ order: [['date', 'DESC']] });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching contact log' });
  }
});

router.put('/contacts/:id', async (req, res) => {
  try {
    await Contact.update(req.body, { where: { id: req.params.id } });
    const updated = await Contact.findByPk(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating contact' });
  }
});

router.delete('/contacts/:id', async (req, res) => {
  try {
    await Contact.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Inquiry removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting contact' });
  }
});

module.exports = router;

