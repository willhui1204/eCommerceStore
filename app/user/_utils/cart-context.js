"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUserAuth } from "./auth-context";
import { getDocs, collection } from "firebase/firestore";
import {db} from "./firebase";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(1);
  const { user } = useUserAuth();

  useEffect(() => {
    if (user) {
      updateCount();
    }
  }, [user]);

  const getCartItemCount = async (userId) => {
    try {
      const cartCollection = collection(db, "users", userId, "carts");
      const cartSnapshot = await getDocs(cartCollection);

      let totalItemCount = 0;

      cartSnapshot.forEach((doc) => {
        totalItemCount += doc.data().quantity;
      });

      return totalItemCount;
    } catch (error) {
      console.error("Error fetching cart items: ", error);
      return 0;
    }
  };
  const updateCount = async () => {
    const count = await getCartItemCount(user.uid);
    console.log("Cart count: ", count);
    setCartCount(count);
  };
  return (
    <CartContext.Provider value={{ cartCount, updateCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
