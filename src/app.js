
const express = require('express');
const cors = require('cors');
const riderRoutes = require('./routes/rider.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/v1/riders', riderRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'Rider Service' });
});

module.exports = app;
