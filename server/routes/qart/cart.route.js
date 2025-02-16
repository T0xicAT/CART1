// const express = require('express');
// const router = express.Router();
// const Cart = require('../../models/cart.model'); // Ensure you have a Cart model
// const Product = require('../../models/product.model');
// const { protect } = require('../../middlewares/auth'); // Ensure you have an auth middleware

// // Add item to cart
// router.post('/add', protect, async (req, res) => {
//   // console.log(req.body);
//   const { productId, quantity } = req.body;
//   try {
//     let cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) {
//       cart = new Cart({ user: req.user._id, items: [] });
//     }

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ product: productId, quantity });
//     }

//     await cart.save();
//     res.json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const {
//   getCart,
//   addProductToCart,
//   updateProductInCart,
//   checkout
// } = require('../controllers/cart.controller'); // Import cart controllers
// const { protect } = require('../middlewares/auth'); // Middleware for authentication

// // Get Cart Items
// router.get('/', protect, getCart);

// // Add Product to Cart
// router.post('/add', protect, addProductToCart);

// // Update Product in Cart
// router.put('/update', protect, updateProductInCart);

// // Checkout
// router.post('/checkout', protect, checkout);

// module.exports = router;

const express = require('express');
const cartController = require('../../controllers/cart.controller'); // Corrected path
const { protect } = require('../../middlewares/auth'); // Import the auth middleware

const router = express.Router();

router.get('/', protect, cartController.getCart);
router.post('/add', protect, cartController.addProductToCart);
router.put('/update', protect, cartController.updateProductInCart);
router.post('/checkout', protect, cartController.checkout);
router.delete('/remove', protect, cartController.deleteProductInCart); // Add remove route


module.exports = router;