const { sequelize } = require('./config/db');
const User = require('./models/User');
const Employee = require('./models/Employee');
const Inventory = require('./models/Inventory');
const Project = require('./models/Project');
require('dotenv').config();

const seed = async () => {
    try {
        // Sync database (force: true will drop and recreate tables)
        await sequelize.sync({ force: true });
        console.log('Database synced (all tables dropped and recreated)...');

        console.log('Seeding new data...');

        // Admin
        await User.create({
            name: 'Super Admin',
            email: 'admin@steelplant.com',
            password: 'adminpassword123',
            role: 'admin'
        });

        // Employees
        await Employee.bulkCreate([
            { name: 'Arun Kumar', position: 'Chief Consultant', department: 'Metallurgy', monthlySalary: 12000, status: 'Active' },
            { name: 'Sarah Jenkins', position: 'Project Director', department: 'Engineering', monthlySalary: 10500, status: 'Active' },
            { name: 'Michael Chen', position: 'Safety Inspector', department: 'Compliance', monthlySalary: 8000, status: 'Active' },
            { name: 'Elena Rodriguez', position: 'Automation Engineer', department: 'IT Operations', monthlySalary: 9500, status: 'Active' }
        ]);

        // Inventory
        await Inventory.bulkCreate([
            { itemName: 'Raw Limestone', quantity: 12400, unit: 'tons', warehouseLocation: 'Gudon-A', category: 'Raw Material' },
            { itemName: 'Iron Ore Sinter', quantity: 45000, unit: 'tons', warehouseLocation: 'Gudon-B', category: 'Raw Material' },
            { itemName: 'Steel Rods (12mm)', quantity: 5500, unit: 'tons', warehouseLocation: 'Gudon-C', category: 'Finished Good' },
            { itemName: 'Conveyor Pellets', quantity: 800, unit: 'units', warehouseLocation: 'Spare-Store', category: 'Spare Part' }
        ]);

        // Projects
        await Project.bulkCreate([
            { title: 'Blast Furnace #4 Optimization', description: 'Increasing yield by 15% via process tuning.', status: 'Completed', client: 'Dubai Steel Corp', cost: 450000 },
            { title: 'Safety Framework Integration', description: 'World-class EHS standards setup.', status: 'In Progress', client: 'Global Metal Ltd', cost: 120000 },
            { title: 'Casting Mill Automation', description: 'Industry 4.0 IoT deployment.', status: 'In Progress', client: 'Tata Steel (Sample)', cost: 890000 }
        ]);

        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error('Seed Error:', err);
        process.exit(1);
    }
};

seed();

