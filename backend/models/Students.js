const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  class: String,
  studentId: String,
  vaccinations: [
    {
      vaccineName: String,
      date: Date
    }
  ]
});

module.exports = mongoose.model('Student', StudentSchema);
