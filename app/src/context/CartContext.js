"use client";
import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCartItems);
      }
    };
    window.addEventListener('storage', () => {
      alert('local storage changed!')
    })
    // window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getTotalQuantity = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ getTotalQuantity, getTotalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
