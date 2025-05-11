const mongoose = require('mongoose');

const DriveSchema = new mongoose.Schema({
  vaccineName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  classes: [{
    type: String  // e.g., ["5", "6"]
  }],
  registeredStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
});


module.exports = mongoose.model('Drive', DriveSchema);
