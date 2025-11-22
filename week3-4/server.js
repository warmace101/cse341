const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongodb = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Week 3-4 Project API',
      version: '1.0.0',
      description: 'REST API with CRUD operations for CSE 341',
    },
    servers: [
      {
        url: process.env.RENDER_URL || `http://localhost:${PORT}`,
        description: process.env.RENDER_URL ? 'Production server' : 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to API route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));

// Root route
app.get('/', (req, res) => {
  res.send('Week 3-4 Project API - Visit /api-docs for documentation');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  });
});

// Start server first, then connect to database
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

// Initialize database connection
mongodb.initDb((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
    console.log('Server is running but database connection failed. Check MONGODB_URI environment variable.');
  } else {
    console.log('Successfully connected to MongoDB');
  }
});

module.exports = app;
