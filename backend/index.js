const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

app.get('/', (req, res) => {
  res.send('Steel Plant Consultant API Running');
});

// Database Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/steel_consultant';

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('MongoDB connection successful!');
    
    // Auto-seed if empty
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('No users found. Running auto-seed...');
      try {
        const Project = require('./models/Project');
        const Employee = require('./models/Employee');
        const Inventory = require('./models/Inventory');

        // Create Admin
        await new User({
            name: 'Super Admin',
            email: 'admin@steelplant.com',
            password: 'adminpassword123',
            role: 'admin'
        }).save();

        // Seed Employees
        await Employee.insertMany([
            { name: 'Arun Kumar', position: 'Chief Consultant', department: 'Metallurgy', monthlySalary: 12000, status: 'Active' },
            { name: 'Sarah Jenkins', position: 'Project Director', department: 'Engineering', monthlySalary: 10500, status: 'Active' }
        ]);

        // Seed Inventory
        await Inventory.insertMany([
            { itemName: 'Raw Limestone', quantity: 12400, unit: 'tons', warehouseLocation: 'Gudon-A', category: 'Raw Material' },
            { itemName: 'Steel Rods (12mm)', quantity: 5500, unit: 'tons', warehouseLocation: 'Gudon-C', category: 'Finished Good' }
        ]);

        console.log('✅ Auto-seed completed successfully!');
      } catch (seedErr) {
        console.error('❌ Auto-seed failed:', seedErr.message);
      }
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error. Please ensure MongoDB is running locally on port 27017.');
    console.error('Error Details:', err.message);
  });

// Server Start
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;