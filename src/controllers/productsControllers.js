// controllers/ProductController.js

const Product = require('../models/productmodel');

// Function to add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const product = new Product({ name, description, price, category });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};
// Function to delete a product by its ID
const deleteProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Delete the product
      await Product.findByIdAndDelete(productId);
      
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  };
// Function to retrieve all products in a specific category
const getAllProductsInCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId });
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = { addProduct,deleteProduct, getAllProductsInCategory };
