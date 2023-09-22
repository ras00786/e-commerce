// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productsControllers');

// Add a new product
router.post('/products', ProductController.addProduct);


// Delete a product by its ID
router.delete('/products/productId', ProductController.deleteProduct);

// Get all products in a specific category by categoryId
router.get('/products/category/:categoryId', ProductController.getAllProductsInCategory);

module.exports = router;
