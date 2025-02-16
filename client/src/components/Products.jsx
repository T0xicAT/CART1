import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [showQuantityControls, setShowQuantityControls] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://cart-1-xi.vercel.app/api/products');
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const quantity = quantities[productId] || 1;
      const response = await fetch('https://cart-1-xi.vercel.app/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      setCart(data);
      toast.success('Item added to cart!');
      setCartItemsCount(data.items.length); // Update cart items count
      setShowQuantityControls((prev) => ({ ...prev, [productId]: true })); // Show quantity controls
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add item to cart.');
    }
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + change),
    }));
  };

  const handleDone = async (productId) => {
    try {
      const quantity = quantities[productId] || 1;
      const response = await fetch('https://cart-1-xi.vercel.app/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      setCart(data);
      toast.success('Item added to cart!');
      setCartItemsCount(data.items.length); // Update cart items count
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add item to cart.');
    }
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Our Premium Products</h1>
        <button
          onClick={() => navigate('/cart')}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 relative"
        >
          <FaShoppingCart />
          {cartItemsCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItemsCount}
            </span>
          )}
          Cart
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-gray-600 mt-2">${product.cost}</p>
            {showQuantityControls[product._id] ? (
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => handleQuantityChange(product._id, -1)}
                  className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                  disabled={(quantities[product._id] || 1) <= 1}
                >
                  <FaMinus />
                </button>
                <span className="mx-2">{quantities[product._id] || 1}</span>
                <button
                  onClick={() => handleQuantityChange(product._id, 1)}
                  className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => handleDone(product._id)}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors ml-4"
                >
                  Done
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(product._id)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;