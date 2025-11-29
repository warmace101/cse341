const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongodb = require('./database');
const User = require('../models/User');
const { ObjectId } = require('mongodb');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const db = mongodb.getDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Local Strategy for username/password login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const db = mongodb.getDatabase();
      const user = await db.collection('users').findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      const isValid = await User.comparePassword(password, user.password);
      if (!isValid) {
        return done(null, false, { message: 'Incorrect username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = mongodb.getDatabase();
        
        // Check if user already exists
        let user = await db.collection('users').findOne({ githubId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Create new user from GitHub profile
        const newUser = {
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName || profile.username,
          email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
          password: null, // No password for OAuth users
          createdAt: new Date(),
        };

        const result = await db.collection('users').insertOne(newUser);
        newUser._id = result.insertedId;
        
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;
