"use client";

import { getCartItems } from "../_services/shopping-list-service";
import { useUserAuth } from "../_utils/auth-context";
import { useEffect, useState } from "react";
import { db} from "../_utils/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useCart } from "../_utils/cart-context";

export default function Page() {
  const [cartItems, setCartItems] = useState([]);

  const { user } = useUserAuth();
  const { updateCount } = useCart();

  const increaseQuantity = async (itemId) => {
    const itemRef = doc(db, "users", user.uid, "carts", itemId.toString());
    const itemSnap = await getDoc(itemRef);
    if (itemSnap.exists()) {
      const newQuantity = itemSnap.data().quantity + 1;
      await updateDoc(itemRef, { quantity: newQuantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
    updateCount();
  };

  const decreaseQuantity = async (itemId) => {
    const itemRef = doc(db, "users", user.uid, "carts", itemId.toString());
    const itemSnap = await getDoc(itemRef);
    if (itemSnap.exists()) {
      const newQuantity = itemSnap.data().quantity - 1;
      if (newQuantity > 0) {
        await updateDoc(itemRef, { quantity: newQuantity });
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        await deleteDoc(itemRef);
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
      }
    }
    updateCount();
  };

  const removeItem = async (itemId) => {
    const itemRef = doc(db, "users", user.uid, "carts", itemId.toString());
    await deleteDoc(itemRef);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    updateCount();
  };

  useEffect(() => {
    if (user) {
      getCartItems(user.uid).then((items) => {
        setCartItems(items);
      });
    }
  }, [user]);

  return (
    <div className="mx-auto p-4 bg-primary-content">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li className="border  " key={item.id}>
            <div className="flex space-x-3" m-2>
              <img className="w-32 h-32" src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
            </div>
            <div className="flex space-x-4 m-2">
              <button className="btn" onClick={() => increaseQuantity(item.id)}>
                +
              </button>
              <p className="text-center">Quantity: {item.quantity}</p>
              <button className="btn" onClick={() => decreaseQuantity(item.id)}>
                -
              </button>
              <button
                className="btn bg-red-500"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
