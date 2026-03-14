const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String },
  monthlySalary: { type: Number, required: true },
  dateJoined: { type: Date, default: Date.now },
  status: { type: String, enum: ['Active', 'On Leave', 'Resigned'], default: 'Active' },
  email: { type: String },
  phone: { type: String }
});

module.exports = mongoose.model('Employee', employeeSchema);
