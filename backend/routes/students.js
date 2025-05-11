const express = require('express');
const router = express.Router();
const Student = require('../models/Students');

const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: 'uploads/' });

// ✅ POST - Add student
router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student added', student });
  } catch (err) {
    console.error('❌ Add Error:', err);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// ✅ GET - Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// ✅ PUT - Vaccinate a student
router.put('/:id/vaccinate', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    student.vaccinations.push({
      vaccineName: req.body.vaccineName,
      date: req.body.date
    });

    await student.save();
    res.json({ message: 'Vaccination added', student });
  } catch (err) {
    console.error('❌ PUT Error:', err);
    res.status(500).json({ error: 'Failed to update vaccination' });
  }
});

// ✅ PUT - Edit student
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student updated', student: updatedStudent });
  } catch (err) {
    console.error('❌ Edit Error:', err);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// ✅ DELETE - Remove student
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted', student: deleted });
  } catch (err) {
    console.error('❌ Delete Error:', err);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

// ✅ POST - Upload CSV file to import students
router.post('/upload', upload.single('file'), async (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      const vaccinations = [];

      if (row.vaccine1 && row.date1) {
        vaccinations.push({ vaccineName: row.vaccine1, date: row.date1 });
      }

      if (row.vaccine2 && row.date2) {
        vaccinations.push({ vaccineName: row.vaccine2, date: row.date2 });
      }

      results.push({
        name: row.name,
        class: row.class,
        studentId: row.studentId,
        vaccinations
      });
    })
    .on('end', async () => {
      try {
        await Student.insertMany(results);
        fs.unlinkSync(req.file.path); // cleanup
        res.status(201).json({ message: 'Students imported successfully', count: results.length });
      } catch (err) {
        console.error('❌ CSV Import Error:', err);
        res.status(500).json({ error: 'Failed to import students' });
      }
    });
});

// ✅ This must be LAST
module.exports = router;
