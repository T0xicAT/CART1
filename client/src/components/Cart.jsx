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
            </div>
          ))}
        </div>
      ) : (
        <p>Loading cart...</p>
      )}
    </div>
  );
};

export default Cart;