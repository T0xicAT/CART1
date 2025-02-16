// const config = require("../config/config")
// const { Cart, Product } = require("../models/index")


// const getCartByUser = async (user)=>{
//     let cart = await Cart.findOne({email:user.email})
//     if(cart === null){
//         throw new Error("User does not have a cart")
//     }
//     return cart
// }

// const addProductToCart = async (user,productId,quantity)=>{
//     let cart = await Cart.findOne({email:user.email});
//     if(!cart){
//         try {
//            cart = await Cart.create({
//             email:user.email,
//             cartItems:[],
//             paymentOption :config.default_payment_option
//            }) 
//         } catch (error) {
//             throw new Error("User cart creation failed, already have a cart")
//         }
//     }
//     if(cart === null){
//         throw new Error("User does not have a cart")
//     }
//     let productIndex = -1;
//     for (let i = 0;i < cart.cartItems.length;i++){
//         if(productId == cart.cartItems[i].product._id){
//             productIndex = i
//         }
//     }
//     if(productIndex == -1){
//         let product =await Product.findOne({_id:productId});
//         if(product == null) {
//             throw new Error("Product does not exist in database")
//         }
//         cart.cartItems.push({product:product,quantity:quantity})
//     } else {
//         throw new Error("Product already in the cart")
//     }

//     await cart.save()
//     return cart;
// }

// const updateProductInCart = async (user, productId,quantity)=>{
  
//     let cart = await Cart.findOne({email:user.email})
//     if(cart == null){
//         throw new Error("User does not have a cart")
//     }

//     let product = await Product.findOne({_id:productId})
//     if(product == null){
//         throw new Error("Product does not exist")
//     }
//     let productIndex = -1;
//     for (let i = 0;i < cart.cartItems.length;i++){
//         if(productId == cart.cartItems[i].product._id){
//             productIndex = i
//         }
//     }
//     if(productIndex == -1){
//         throw new Error("Product not in cart")
//     } else {
//         cart.cartItems[productIndex].quantity = quantity;
//     }
//     await cart.save()
//     return cart
// }

// const deleteProductInCart = async (user,productId)=>{
//  let cart = await Cart.findOne({email:user.email})
//  if(cart == null){
//     throw new Error("User does nt have a cart")
//  }
//  let productIndex = -1;
//  for (let i = 0;i < cart.cartItems.length;i++){
//      if(productId == cart.cartItems[i].product._id){
//          productIndex = i
//      }
//  }
//  if(productIndex == -1){
//     throw new Error("Product does not exist for this user")
//  } else {
//     cart.cartItems.splice(productIndex,1)
//  }
//  await cart.save()

// }

// const checkout = async (user)=>{
//     let cart = await Cart.findOne({email:user.email})
//     if(cart == null){
//         throw new Error("User does not have a cart")
//     }
    
//     if(cart.cartItems.length === 0){
//         throw new Error("Cart is empty")
//     }

//     if(user.address == config.default_address){
//         throw new Error("Address not set")
//     }

//     let total = 0;
//     for(let i =0;i<cart.cartItems.length;i++){
//         total += cart.cartItems[i].product.cost * cart.cartItems[i].quantity;
//     }
//     if(total > user.walletMoney){
//        throw new Error("User has insufficient money to process")
//     }
    
//     user.walletMoney -= total;
//     await user.save();

//     cart.cartItems = []
//     await cart.save();

// }

// module.exports = {
//     getCartByUser,
//     addProductToCart,
//     updateProductInCart,
//     deleteProductInCart,
//     checkout
// }

const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

const getCartByUser = async (user) => {
    const cart = await Cart.findOne({ user: user._id }).populate('items.product');
    return cart;
};

const addProductToCart = async (user, productId, quantity) => {
    let cart = await Cart.findOne({ user: user._id });
    if (!cart) {
        cart = new Cart({ user: user._id, items: [] });
    }

    const productIndex = cart.items.findIndex(p => p.product.toString() === productId);
    if (productIndex > -1) {
        cart.items[productIndex].quantity += quantity;
    } else {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    return cart;
};

const updateProductInCart = async (user, productId, quantity) => {
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
        throw new Error('Cart not found');
    }

    const productIndex = cart.items.findIndex(p => p.product.toString() === productId);
    if (productIndex > -1) {
        cart.items[productIndex].quantity = quantity;
    } else {
        throw new Error('Product not found in cart');
    }

    await cart.save();
    return cart;
};

const deleteProductInCart = async (user, productId) => {
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
        throw new Error('Cart not found');
    }

    cart.items = cart.items.filter(p => p.product.toString() !== productId);
    await cart.save();
    return cart;
};

const checkout = async (user) => {
    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
        throw new Error('Cart not found');
    }

    // Implement checkout logic here (e.g., create order, process payment, etc.)

    // Clear the cart after checkout
    cart.items = [];
    await cart.save();
};

module.exports = {
    getCartByUser,
    addProductToCart,
    updateProductInCart,
    deleteProductInCart,
    checkout
};