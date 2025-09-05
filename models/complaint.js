const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comments: String
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
