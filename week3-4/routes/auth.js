const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongodb = require('../config/database');
const User = require('../models/User');
const { isNotAuthenticated } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username (min 3 characters)
 *         email:
 *           type: string
 *           description: Valid email address
 *         password:
 *           type: string
 *           description: Password (min 6 characters)
 *     UserLogin:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *           example:
 *             username: "john_doe"
 *             email: "john@example.com"
 *             password: "mypassword123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Server error
 */
router.post('/register', isNotAuthenticated, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate user data
    const errors = User.validate({ username, email, password });
    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    const db = mongodb.getDatabase();

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User already exists', 
        message: 'Username or email already taken' 
      });
    }

    // Hash password
    const hashedPassword = await User.hashPassword(password);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const result = await db.collection('users').insertOne(newUser);

    // Log the user in automatically after registration
    const createdUser = await db.collection('users').findOne({ _id: result.insertedId });
    
    req.login(createdUser, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Registration successful but login failed' });
      }
      res.status(201).json({ 
        message: 'User registered and logged in successfully',
        user: {
          id: createdUser._id,
          username: createdUser.username,
          email: createdUser.email
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user', details: error.message });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with username and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *           example:
 *             username: "john_doe"
 *             password: "mypassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', isNotAuthenticated, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Login failed', details: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed', message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed', details: err.message });
      }
      res.status(200).json({ 
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    });
  })(req, res, next);
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Server error
 */
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed', details: err.message });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Initiate GitHub OAuth login
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to GitHub for authentication
 */
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects after authentication
 */
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login/failed' }),
  (req, res) => {
    res.redirect('/auth/login/success');
  }
);

/**
 * @swagger
 * /auth/login/success:
 *   get:
 *     summary: OAuth login success endpoint
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: 'OAuth login successful',
      user: {
        id: req.user._id,
        username: req.user.username,
        displayName: req.user.displayName
      }
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

/**
 * @swagger
 * /auth/login/failed:
 *   get:
 *     summary: OAuth login failure endpoint
 *     tags: [Authentication]
 *     responses:
 *       401:
 *         description: Login failed
 */
router.get('/login/failed', (req, res) => {
  res.status(401).json({ error: 'OAuth authentication failed' });
});

/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: Get current user information
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Current user details
 *       401:
 *         description: Not authenticated
 */
router.get('/user', (req, res) => {
  if (req.user) {
    res.status(200).json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        displayName: req.user.displayName
      }
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;
