require('dotenv').config(); // Load env first

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import and use route handler
const studentRoutes = require('./routes/students');
const statsRoutes = require('./routes/stats');
const driveRoutes = require('./routes/drive');

app.use('/api/students', studentRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/drives', driveRoutes);


// ✅ Root route
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// ✅ MongoDB connection + Server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.log('❌ MongoDB connection error:', err));
