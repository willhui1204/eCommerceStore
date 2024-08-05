"use client";

import Link from "next/link";
import { useState } from "react";
import Nav from "../_components/nav";


const initialCartItems = [
  { id: 1, name: 'Smartphone', price: 699, quantity: 1 },
  { id: 2, name: 'Laptop', price: 999, quantity: 1 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, quantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    ));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="bg-slate-950 min-h-screen p-4 text-white">
      <Nav />
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="p-4 m-4 bg-slate-700 rounded">
              <h2 className="font-bold text-xl">{item.name}</h2>
              <p>Price: ${item.price}</p>
              <label className="block mb-2">
                Quantity:
                <input 
                  type="number" 
                  value={item.quantity} 
                  min="1"
                  onChange={(event) => handleQuantityChange(item.id, event.target.value)}
                  className="w-16 ml-2 p-1 rounded text-black"
                />
              </label>
              <p>Total: ${item.price * item.quantity}</p>
            </div>
          ))}
          <div className="text-xl font-bold mt-4">
            Cart Total: ${total}
          </div>
        </div>
      )}
    </main>
  );
}