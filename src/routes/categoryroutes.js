// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryControllers');

// Add a new category
router.post('/categories', CategoryController.addCategory);

// Get a specific category by name
router.get('/categories/:categoryName', CategoryController.getCategoryByName);

// Get all products in a specific category
router.get('/categories/:categoryName/products', CategoryController.getProductsInCategory);

module.exports = router;
