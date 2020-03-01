const express = require('express');
const connectDB = require('../config/db');
const authRoutes = require('./routes/authRoutes');
const auth = require('./middleware/requireAuth');
require('colors');


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './config/.env' });
}

connectDB();

const app = express();

app.use(express.json({ extended: false}));

app.use('/api/v1/auth', authRoutes);

app.get('/api/v1', auth, (req, res) => {
  res.send(`Your email is: ${req.user.email}`);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.rainbow.bold);
});
