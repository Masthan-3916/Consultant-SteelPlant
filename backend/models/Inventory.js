const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, enum: ['tons', 'kg', 'meters', 'units'], required: true },
  warehouseLocation: { type: String, required: true }, // Gudon/Warehouse name
  category: { type: String }, // Raw Material, Spare Part, Finished Good
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);
