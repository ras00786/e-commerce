const jwt = require('jsonwebtoken');
const secretKey = "rasool786";

module.exports = (req, res, next) => {
  try {
    // Get the token from the authorization header
    const token = req.headers.authorization.split(' ')[1]; 

    // Add this line for debugging
    console.log('Received Token:', token); // Add this line for debugging

    const decodedToken = jwt.verify(token, secretKey);
    req.userData = {
      userId: decodedToken.userId,
      username: decodedToken.username,
      email: decodedToken.email,
      role: decodedToken.role
    }; // Store the decoded user ID and role in the request for later use
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
