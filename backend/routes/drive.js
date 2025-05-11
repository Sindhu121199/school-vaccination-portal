const express = require('express');
const router = express.Router();
const Drive = require('../models/Drive');
const Student = require('../models/Students'); // ✅ ensure this is imported

// POST /api/drives/create
router.post('/create', async (req, res) => {
  try {
    const { vaccineName, date, classes } = req.body;

    const drive = new Drive({
      vaccineName,
      date,
      classes,
      registeredStudents: []
    });

    await drive.save();
    res.status(201).json({ message: 'Drive created', drive });
  } catch (err) {
    console.error('❌ Error creating drive:', err);
    res.status(500).json({ error: 'Failed to create drive' });
  }
});

// GET /api/drives
router.get('/', async (req, res) => {
  try {
    const drives = await Drive.find().populate('registeredStudents');
    res.json(drives);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drives' });
  }
});

// PUT /api/drives/:id/register
router.put('/:id/register', async (req, res) => {
  try {
    const { studentId } = req.body;

    const drive = await Drive.findById(req.params.id);
    const student = await Student.findById(studentId);

    if (!drive || !student) {
      return res.status(404).json({ error: 'Drive or student not found' });
    }

    // ❗ Class-based eligibility check
    if (!drive.classes.includes(student.class)) {
      return res.status(400).json({
        error: `Student from class ${student.class} is not eligible for this drive. Allowed classes: ${drive.classes.join(', ')}`
      });
    }

    // ✅ Register if not already registered
    if (!drive.registeredStudents.includes(studentId)) {
      drive.registeredStudents.push(studentId);
      await drive.save();
    }

    res.json({ message: 'Student registered for drive', drive });
  } catch (err) {
    console.error('❌ Register Error:', err);
    res.status(500).json({ error: 'Failed to register student' });
  }
});

// GET /api/drives/:id/eligible-students
router.get('/:id/eligible-students', async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) {
      return res.status(404).json({ error: 'Drive not found' });
    }

    const eligible = await Student.find({
      class: { $in: drive.classes },
      _id: { $nin: drive.registeredStudents }
    });

    res.json(eligible);
  } catch (err) {
    console.error('❌ Error fetching eligible students:', err);
    res.status(500).json({ error: 'Failed to fetch eligible students' });
  }
});
// DELETE /api/drives/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Drive.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Drive not found' });
    res.json({ message: 'Drive deleted successfully', drive: deleted });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ error: 'Failed to delete drive' });
  }
});


module.exports = router;
