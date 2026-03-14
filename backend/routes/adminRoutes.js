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
    const totalProjects = await Project.countDocuments();
    const completedProjects = await Project.countDocuments({ status: 'Completed' });
    const totalEmployees = await Employee.countDocuments({ status: 'Active' });
    const totalInventoryCount = await Inventory.countDocuments();
    const totalSalaries = await Employee.aggregate([
      { $match: { status: 'Active' } },
      { $group: { _id: null, total: { $sum: "$monthlySalary" } } }
    ]);

    res.json({
        totalProjects,
        completedProjects,
        totalEmployees,
        totalInventoryCount,
        monthlyPayroll: totalSalaries[0]?.total || 0,
        inProgressProjects: totalProjects - completedProjects
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching stats' });
  }
});

/* --- Employee Management --- */
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ dateJoined: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

router.post('/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: 'Error creating employee' });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

/* --- Inventory / Material Management --- */
router.get('/inventory', async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({ lastUpdated: -1 });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching inventory' });
  }
});

router.post('/inventory', async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Error adding inventory item' });
  }
});

router.put('/inventory/:id', async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error updating inventory' });
  }
});

router.delete('/inventory/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stock item removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting inventory item' });
  }
});

/* --- Project Management --- */
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ dateCompleted: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: 'Error creating project' });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
      const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
  } catch(err) {
      res.status(500).json({ error: 'Error updating project' });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting project' });
  }
});

/* --- Message/Contact Log --- */
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 });
        res.json(contacts);
    } catch(err) {
        res.status(500).json({ error: 'Error fetching contact log' });
    }
});

router.put('/contacts/:id', async (req, res) => {
    try {
        const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch(err) {
        res.status(500).json({ error: 'Error updating contact' });
    }
});

router.delete('/contacts/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Inquiry removed' });
    } catch(err) {
        res.status(500).json({ error: 'Error deleting contact' });
    }
});

module.exports = router;
