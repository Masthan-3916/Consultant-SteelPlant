const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
  image: { type: String },
  dateCompleted: { type: Date },
  client: { type: String },
  cost: { type: Number }
});

module.exports = mongoose.model('Project', projectSchema);
