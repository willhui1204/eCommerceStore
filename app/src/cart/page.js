"use client";
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { getTotalQuantity, getTotalAmount } = useCart();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <div className="container mx-auto p-4 bg-secondary-content">
      <NavBar cartQuantity={getTotalQuantity()} cartAmount={getTotalAmount()}/>
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map((item, index) => (
              <div key={index} className="border p-4 rounded shadow flex items-center">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover mr-4" />
              <div>
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-gray-700">${item.price}</p>
                <p className="text-gray-700">Quantity: {item.quantity}</p>
                <button
                  className="mt-2 px-4 py-2 font-bold text-white bg-error rounded hover:bg-red-700"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            </div>
            ))}
          </div>
          <button
            className="mt-4 px-4 py-2 font-bold bg-primary-content text-blue-500 rounded hover:bg-blue-700"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
