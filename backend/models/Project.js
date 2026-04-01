const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('In Progress', 'Completed'),
    defaultValue: 'In Progress'
  },
  image: {
    type: DataTypes.STRING
  },
  dateCompleted: {
    type: DataTypes.DATE
  },
  client: {
    type: DataTypes.STRING
  },
  cost: {
    type: DataTypes.FLOAT
  }
});

module.exports = Project;

