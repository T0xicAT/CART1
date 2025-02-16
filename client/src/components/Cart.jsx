// import React, { useEffect, useState } from 'react';

// const Cart = () => {
//   const [cart, setCart] = useState(null);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await fetch('https://cart-1-xi.vercel.app/api/cart', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`Error ${response.status}: ${response.statusText}`);
//         }

//         const data = await response.json();
//         setCart(data);
//       } catch (error) {
//         console.error('Error fetching cart:', error.message);
//       }
//     };
//     fetchCart();
//   }, []);

//   const handleUpdateQuantity = async (productId, quantity) => {
//     try {
//       const response = await fetch('https://cart-1-xi.vercel.app/api/cart/update', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ productId, quantity }),
//       });
//       const data = await response.json();
//       setCart(data);
//     } catch (error) {
//       console.error('Error updating product quantity:', error);
//     }
//   };

//   const handleRemoveProduct = async (productId) => {
//     try {
//       const response = await fetch('https://cart-1-xi.vercel.app/api/cart/remove', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ productId }),
//       });
//       const data = await response.json();
//       setCart(data);
//     } catch (error) {
//       console.error('Error removing product from cart:', error);
//     }
//   };

//   const handleCheckout = async () => {
//     try {
//       const response = await fetch('https://cart-1-xi.vercel.app/api/cart/checkout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       const data = await response.json();
//       alert(data.message);
//       setCart(null);
//     } catch (error) {
//       console.error('Error during checkout:', error);
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Cart</h1>
//       {cart && cart.items ? (
//         <div>
//           {cart.items.map((item, index) => (
//             <div key={item.product._id || index} className="bg-white p-4 rounded shadow-md">
//               <img src={item.product.image} alt={item.product.name} className="w-full h-48 object-cover mb-4" />
//               <h2 className="text-xl font-semibold">{item.product.name}</h2>
//               <p className="text-gray-600">${item.product.cost}</p>
//               <p className="text-gray-600">Quantity: {item.quantity}</p>
//               <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}>+</button>
//               <button onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}>-</button>
//               <button onClick={() => handleRemoveProduct(item.product._id)}>Remove</button>
//             </div>
//           ))}
//           <button onClick={handleCheckout} className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
//             Checkout
//           </button>
//         </div>
//       ) : (
//         <p>Loading cart...</p>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useEffect, useState } from 'react';
import { FaPlus, FaMinus, FaTrash, FaShoppingCart , FaArrowLeft} from "react-icons/fa"
import { useNavigate } from "react-router-dom"
const Cart = () => {
  const [cart, setCart] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate();


  const fetchCart = async () => {
    try {
      const response = await fetch("https://cart-1-xi.vercel.app/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setCart(data)
    } catch (error) {
      console.error("Error fetching cart:", error.message)
      setError("Failed to load cart. Please try again later.")
    }
  }

  useEffect(() => {
    fetchCart();
  }, [])



  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch("https://cart-1-xi.vercel.app/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      await response.json();
      fetchCart(); // Re-fetch the cart data
    } catch (error) {
      console.error("Error updating product quantity:", error);
      setError("Failed to update quantity. Please try again.");
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch("https://cart-1-xi.vercel.app/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });
      await response.json();
      fetchCart(); // Re-fetch the cart data
    } catch (error) {
      console.error("Error removing product from cart:", error);
      setError("Failed to remove product. Please try again.");
    }
  };


  const handleCheckout = async () => {
    try {
      const response = await fetch("https://cart-1-xi.vercel.app/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await response.json()
      alert(data.message)
      setCart(null)
    } catch (error) {
      console.error("Error during checkout:", error)
      setError("Checkout failed. Please try again.")
    }
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-8">{error}</div>
  }

  if (!cart) {
    return <p className="text-center text-xl mt-8">Loading cart...</p>
  }

  const cartItems = cart.items || []

  return (
    <div className="container mx-auto p-4 md:p-8">
<div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
      </div>      {cartItems.length === 0 ? (
        <p className="text-center text-xl">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item, index) => (
            <div
              key={item.product?._id || index}
              className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <img
                src={item.product?.image || "/placeholder.svg"}
                alt={item.product?.name || "Product"}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h2 className="text-xl font-semibold mb-2">{item.product?.name || "Unknown Product"}</h2>
              <p className="text-gray-600 mb-2">${item.product?.cost?.toFixed(2) || "0.00"}</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600">Quantity: {item.quantity || 0}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.product?._id, (item.quantity || 1) - 1)}
                    className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                    disabled={(item.quantity || 0) <= 1}
                  >
                    <FaMinus />
                  </button>
                  <button
                    onClick={() => handleUpdateQuantity(item.product?._id, (item.quantity || 0) + 1)}
                    className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveProduct(item.product?._id)}
                className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
              >
                <FaTrash className="mr-2" /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-2xl font-bold mb-4">
            Total: $
            {cartItems.reduce((total, item) => total + (item.product?.cost || 0) * (item.quantity || 0), 0).toFixed(2)}
          </p>
          <button
            onClick={handleCheckout}
            className="w-full md:w-auto bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors text-lg font-semibold flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" /> Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart

