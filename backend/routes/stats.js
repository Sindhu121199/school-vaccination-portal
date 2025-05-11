const express = require('express');
const router = express.Router();
const Student = require('../models/Students'); // Capital S if your file is Students.js

router.get('/vaccinations', async (req, res) => {
  try {
    const students = await Student.find();
    const stats = {};

    for (const student of students) {
      const taken = new Set();

      for (const v of student.vaccinations) {
        const vaccine = v.vaccineName;
        taken.add(vaccine);

        if (!stats[vaccine]) {
          stats[vaccine] = { vaccinated: 0, notVaccinated: 0 };
        }

        stats[vaccine].vaccinated += 1;
      }

      for (const vaccine in stats) {
        if (!taken.has(vaccine)) {
          stats[vaccine].notVaccinated += 1;
        }
      }
    }

    res.json(stats);
  } catch (err) {
    console.error('❌ Stats Error:', err);
    res.status(500).json({ error: 'Failed to generate stats' });
  }
});

module.exports = router;
