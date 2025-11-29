const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

class User {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password; // Will be hashed
    this.githubId = user.githubId || null;
    this.displayName = user.displayName || user.username;
    this.createdAt = user.createdAt || new Date();
  }

  // Hash password before saving
  static async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  // Compare password with hashed password
  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Validate user data for registration
  static validate(user, isOAuth = false) {
    const errors = [];

    if (!isOAuth) {
      if (!user.username || typeof user.username !== 'string' || user.username.trim().length < 3) {
        errors.push('Username is required and must be at least 3 characters');
      }

      if (!user.email || typeof user.email !== 'string' || !user.email.includes('@')) {
        errors.push('Valid email is required');
      }

      if (!user.password || typeof user.password !== 'string' || user.password.length < 6) {
        errors.push('Password is required and must be at least 6 characters');
      }
    } else {
      if (!user.githubId) {
        errors.push('GitHub ID is required for OAuth users');
      }
    }

    return errors;
  }
}

module.exports = User;
