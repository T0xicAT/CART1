const express = require('express');
const router = express.Router();
const Product = require('../../models/product.model'); // Ensure you have a Product model

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;