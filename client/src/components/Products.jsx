import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/products'); // Update the URL to match your backend server
        const data = await response.json();
        console.log(data); // Add this line to check the data
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:8082/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the user is authenticated
        },
        body: JSON.stringify({ productId, quantity: 1 }), // Add product with quantity 1
      });
      const data = await response.json();
      console.log('Product added to cart:', data);
      // Optionally, update the cart state or show a success message
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-600">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-t-lg" />
            <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-2">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product._id)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;