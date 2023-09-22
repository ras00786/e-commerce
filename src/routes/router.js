const express = require("express");
const router = express.Router();

// Import your route modules
const userRoutes = require("./userroutes"); 
const Adminroute =require("./Adminroute")
// Mount your route modules
router.use("/users", userRoutes);

// Define other routes if needed
router.get("/", (req, res) => {
  res.send("Hello, this is the homepage.");
});

// Export the router
module.exports = router;
