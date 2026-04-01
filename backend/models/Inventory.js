const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unit: {
    type: DataTypes.ENUM('tons', 'kg', 'meters', 'units'),
    allowNull: false
  },
  warehouseLocation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING
  },
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Inventory;

