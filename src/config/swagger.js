const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rider Service API',
      version: '1.0.0',
      description: 'API documentation for Rider Service - Ride Hailing Platform',
      contact: {
        name: 'API Support',
        email: 'support@ridehailing.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
      {
        url: 'http://localhost:3001',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoints',
      },
      {
        name: 'Riders',
        description: 'Rider management endpoints',
      },
      {
        name: 'Trips',
        description: 'Trip management for riders',
      },
    ],
    components: {
      schemas: {
        Rider: {
          type: 'object',
          required: ['name', 'email', 'phone'],
          properties: {
            rider_id: {
              type: 'integer',
              description: 'Unique identifier',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Rider full name',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Rider email address',
              example: 'john@example.com',
            },
            phone: {
              type: 'string',
              description: 'Rider phone number',
              example: '+1234567890',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        Trip: {
          type: 'object',
          properties: {
            trip_id: {
              type: 'string',
              description: 'Unique trip identifier',
              example: '12345',
            },
            rider_id: {
              type: 'integer',
              description: 'ID of the rider',
              example: 1,
            },
            driver_id: {
              type: 'integer',
              description: 'ID of the assigned driver',
              example: 101,
            },
            pickup_zone: {
              type: 'string',
              description: 'Pickup zone/location',
              example: 'Downtown',
            },
            drop_zone: {
              type: 'string',
              description: 'Drop-off zone/location',
              example: 'Airport',
            },
            distance_km: {
              type: 'number',
              format: 'float',
              description: 'Trip distance in kilometers',
              example: 12.5,
            },
            fare: {
              type: 'number',
              format: 'float',
              description: 'Trip fare amount',
              example: 250.00,
            },
            status: {
              type: 'string',
              enum: ['REQUESTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
              description: 'Current trip status',
              example: 'REQUESTED',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Trip creation timestamp',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'string',
              example: 'Error message',
            },
            message: {
              type: 'string',
              example: 'Detailed error description',
            },
            required: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['pickup_zone', 'drop_zone', 'distance_km'],
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './server.js'], // Path to API docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;