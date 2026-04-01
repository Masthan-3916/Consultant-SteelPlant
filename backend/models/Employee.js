const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING
  },
  monthlySalary: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  dateJoined: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('Active', 'On Leave', 'Resigned'),
    defaultValue: 'Active'
  },
  email: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  }
});

module.exports = Employee;

