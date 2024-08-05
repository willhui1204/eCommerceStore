"use client";
import React from "react";
import { addCartItem, getCartItems } from "./_services/shopping-list-service"; 
import { useUserAuth } from "./_utils/auth-context";
import { useCart } from "./_utils/cart-context";

export default function ItemCard({
  id,
  title,
  description,
  category,
  image,
  rating: { count, rate },
}) {
    const { user } = useUserAuth(); 
    const { updateCount } = useCart();


    const handleAddToCart = async () => {
        await addCartItem(user.uid, {id, title, description, category, image, quantity: 1});
        updateCount();
        console.log('Add to cart');
    }
    const handleBuyNow = () => {
        console.log('Buy Now');
    }

  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img className="w-32 h-32 object-contain" src={image} alt="image fail" />
      </figure>
      <div className="card-body">
        <div
          tabIndex="0"
          className="collapse collapse-arrow border-base-300 bg-base-200 border"
        >
          <div className="collapse-title text-xl font-medium">
            {title}
          </div>
          <div className="collapse-content">
            <p>{description}</p>
          </div>
        </div>
        <div className="card-actions justify-end ">
          <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
          <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
