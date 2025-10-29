const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'UP', 
    service: 'Rider Service',
    timestamp: new Date().toISOString() 
  });
});

// Get all riders
app.get('/v1/riders', (req, res) => {
  db.getAllRiders((err, riders) => {
    if (err) {
      console.error('Error fetching riders:', err);
      return res.status(500).json({ 
        error: 'Failed to fetch riders',
        message: err.message 
      });
    }
    res.json({
      success: true,
      count: riders.length,
      data: riders
    });
  });
});

// Get rider by ID
app.get('/v1/riders/:rider_id', (req, res) => {
  const { rider_id } = req.params;
  
  db.getRiderById(rider_id, (err, rider) => {
    if (err) {
      console.error('Error fetching rider:', err);
      return res.status(500).json({ 
        error: 'Failed to fetch rider',
        message: err.message 
      });
    }
    
    if (!rider) {
      return res.status(404).json({ 
        error: 'Rider not found',
        rider_id: rider_id 
      });
    }
    
    res.json({
      success: true,
      data: rider
    });
  });
});

// Create new rider
app.post('/v1/riders', (req, res) => {
  const { name, email, phone } = req.body;
  
  // Validation
  if (!name || !email || !phone) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['name', 'email', 'phone']
    });
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Invalid email format' 
    });
  }
  
  const newRider = {
    name,
    email,
    phone
  };
  
  db.createRider(newRider, function(err) {
    if (err) {
      console.error('Error creating rider:', err);
      if (err.message.includes('UNIQUE constraint')) {
        return res.status(409).json({ 
          error: 'Email already exists' 
        });
      }
      return res.status(500).json({ 
        error: 'Failed to create rider',
        message: err.message 
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Rider created successfully',
      data: newRider
    });
  });
});

// Update rider
app.put('/v1/riders/:rider_id', (req, res) => {
  const { rider_id } = req.params;
  const { name, email, phone } = req.body;
  
  // Validation
  if (!name || !email || !phone) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      required: ['name', 'email', 'phone']
    });
  }
  
  const updatedRider = {
    name,
    email,
    phone
  };
  
  db.updateRider(rider_id, updatedRider, function(err) {
    if (err) {
      console.error('Error updating rider:', err);
      return res.status(500).json({ 
        error: 'Failed to update rider',
        message: err.message 
      });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ 
        error: 'Rider not found',
        rider_id: rider_id 
      });
    }
    
    res.json({
      success: true,
      message: 'Rider updated successfully',
      rider_id: rider_id
    });
  });
});

// Delete rider
app.delete('/v1/riders/:rider_id', (req, res) => {
  const { rider_id } = req.params;
  
  db.deleteRider(rider_id, function(err) {
    if (err) {
      console.error('Error deleting rider:', err);
      return res.status(500).json({ 
        error: 'Failed to delete rider',
        message: err.message 
      });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ 
        error: 'Rider not found',
        rider_id: rider_id 
      });
    }
    
    res.json({
      success: true,
      message: 'Rider deleted successfully',
      rider_id: rider_id
    });
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log('Rider Service running on port ${PORT}');
  console.log('Health check: http://localhost:${PORT}/health');
  console.log('API Base URL: http://localhost:${PORT}/v1/riders');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...');
  db.close();
  process.exit(0);
}); 
