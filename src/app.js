const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

module.exports = app;