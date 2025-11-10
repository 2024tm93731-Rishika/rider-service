
const express = require('express');
const cors = require('cors');
const riderRoutes = require('./routes/rider.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..')));

// Routes
app.use('/v1/riders', riderRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'Rider Service' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Rider Service API Docs',
}));

// Swagger JSON endpoint
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

module.exports = app;
