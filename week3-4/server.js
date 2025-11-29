const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongodb = require('./config/database');
const passport = require('./config/passport');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this-in-production',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Week 3-4 Project API',
      version: '1.0.0',
      description: 'REST API with CRUD operations and OAuth authentication for CSE 341',
    },
    servers: [
      {
        url: process.env.RENDER_URL || `http://localhost:${PORT}`,
        description: process.env.RENDER_URL ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        sessionAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid',
          description: 'Session-based authentication. Login via /auth/login or /auth/github to obtain session cookie.',
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Path to API route files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));

// Serve static HTML landing page
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
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
