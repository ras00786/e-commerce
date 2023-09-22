const express = require("express");
const router = express.Router();
const Usercontrollers = require("../controllers/Usercontrollers");
const authMiddleware = require('../middleware/authverify');
const AdminController = require('../controllers/Usercontrollers');

// // Registration route
// router.post('/register', AdminController.register,Usercontrollers.register);

// // Login route
// router.post('/login', AdminController.login,Usercontrollers.login);





// Combined Registration route for both admin and user
router.post('/register', (req, res, next) => {
  // Check the 'role' field in the request body to determine if it's admin or user registration
  const { role } = req.body;

  if (role === 'admin') {
      // If 'role' is 'admin', call AdminController.register
      AdminController.register(req, res, next);
  } else {
      // If 'role' is 'user' or not provided, call Usercontrollers.register
      Usercontrollers.register(req, res, next);
  }
});




// Combined Login route for both admin and user
router.post('/login', (req, res, next) => {
  // Check the 'role' field in the request body to determine if it's admin or user login
  const { role } = req.body;

  if (role === 'admin') {
      // If 'role' is 'admin', call AdminController.login
      AdminController.login(req, res, next);
  } else {
      // If 'role' is 'user' or not provided, call Usercontrollers.login
      Usercontrollers.login(req, res, next);
  }
});



// Protected route (for testing JWT authentication)
router.get('/user/details', authMiddleware, async (req, res) => {
    // Access user details from req.userData (set in authMiddleware)
    const userDetails = {
      userId: req.userData.userId,
      username: req.userData.username,
      email: req.userData.email,
      
      // Add any other user details you want to include
    };
  
    res.json({ message: 'User details retrieved', user: userDetails });
  });



  
  // Protected route for admin
router.get('/admin/details', authMiddleware, async (req, res) => {
  // Access admin details from req.userData (set in authMiddleware)
  const adminDetails = {
    adminId: req.userData.userId,
    adminName: req.userData.username,
    adminEmail: req.userData.email,
    // Add any other admin details you want to include
  };

  res.json({ message: 'Admin details retrieved', admin: adminDetails });
});

module.exports = router;
