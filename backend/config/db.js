const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'steel_consultant',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false, // Set to console.log to see SQL queries
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL/Sequelize connection successful!');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
