require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

// Test DB connection
db.query('SELECT 1')
  .then(() => console.log('Database connected'))
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/podcasts', require('./routes/podcasts'));
app.use('/api', require('./routes/episodes'));
app.use('/api/categories', require('./routes/categories'));
app.use(require('./middleware/errorHandler'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});