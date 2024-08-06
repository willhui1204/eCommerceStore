"use client";
import React from "react";
import { addCartItem, getCartItems } from "./_services/shopping-list-service"; 
import { useUserAuth } from "./_utils/auth-context";
import { useCart } from "./_utils/cart-context";
import { useState } from "react";
import Link from "next/link";

export default function ItemCard({
  id,
  title,
  price,
  description,
  category,
  image,
  rating: { count, rate },
}) {
    const { user } = useUserAuth(); 
    const { updateCount } = useCart();
    const [showCartModal, setShowCartModal] = useState(false);


    const handleAddToCart = async () => {
        await addCartItem(user.uid, {id, title, description, category, image, quantity: 1});
        updateCount();
        console.log('Add to cart');
        setShowCartModal(true);
        setTimeout(() => setShowCartModal(false), 2000); // Hide modal after 2 seconds
    }
    const handleBuyNow = () => {
        console.log('Buy Now');
    }

  return (
    <div className="card card-compact bg-base-100 w-80 shadow-xl">
      <figure>
        <img className="h-64 object-cover cursor-pointer" src={image} alt="image fail" />
      </figure>
      <div className="card-body">
        <div
          tabIndex="0"
          className="collapse collapse-arrow border-base-300 bg-base-200 border"
        >
          <div className="collapse-title text-xl font-medium">
            {title}
            <div>${price}</div>
          </div>
          <div className="collapse-content">
            <p>{description}</p>
          </div>
        </div>
        <div className="card-actions justify-end ">
          <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
          {/* <button className="btn btn-primary" onClick={handleBuyNow}>View Product</button> */}
          <Link href={`../user/products/${id}`} className="btn btn-primary">
                View Product
          </Link>
          {showCartModal && (
            <div className="fixed bottom-4 right-4 bg-green-500 p-4 rounded shadow-lg">
              Item added to cart!
            </div>
      )}
        </div>
      </div>
    </div>
  );
}
