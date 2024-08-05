"use client";
import { getCartItems, addCartItem } from "../_services/shopping-list-service";
import { useUserAuth } from "../_utils/auth-context";
import { useEffect, useState } from "react";

export default function Page() {
  const [cartItems, setCartItems] = useState([]);

  const { user } = useUserAuth();

  useEffect(() => {
    if (user) {
      getCartItems(user.uid).then((items) => {
        setCartItems(items);
      });
    }
  }, [user]);
  return (
    <div>
      <h1>Welcome to cart</h1>
      <div>
        <h2>Cart Items</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              Item: {item.title}, Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
