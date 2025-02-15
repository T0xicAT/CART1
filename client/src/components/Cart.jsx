import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const handleAddProduct = async (productId, quantity) => {
    try {
      const response = await fetch('http://localhost:8082/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch('http://localhost:8082/api/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch('http://localhost:8082/api/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      alert(data.message);
      setCart(null);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>
      {cart ? (
        <div>
          {cart.items.map((item) => (
            <div key={item.product._id} className="bg-white p-4 rounded shadow-md">
              <img src={item.product.image} alt={item.product.name} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-xl font-semibold">{item.product.name}</h2>
              <p className="text-gray-600">${item.product.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}>+</button>
              <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}>-</button>
              <button onClick={() => handleRemoveProduct(item.product._id)}>Remove</button>
            </div>
          ))}
          <button onClick={handleCheckout} className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Checkout
          </button>
        </div>
      ) : (
        <p>Loading cart...</p>
      )}
    </div>
  );
};

export default Cart;