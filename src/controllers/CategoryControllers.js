// controllers/CategoryController.js

const Category = require('../models/category');
const Product = require('../models/productmodel');

// Function to add a new category
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: 'Category added successfully', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

// Function to retrieve a specific category by name
const getCategoryByName = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

// Function to retrieve all products in a specific category
const getProductsInCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const products = await Product.find({ category: category._id });
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

module.exports = { addCategory, getCategoryByName, getProductsInCategory };
