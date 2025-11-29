// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    error: 'Unauthorized', 
    message: 'You must be logged in to access this resource' 
  });
};

// Middleware to check if user is NOT authenticated (for login/register routes)
const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.status(400).json({ 
    error: 'Already authenticated', 
    message: 'You are already logged in' 
  });
};

module.exports = {
  isAuthenticated,
  isNotAuthenticated,
};
