"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
      setShowCartModal(true);
      setTimeout(() => setShowCartModal(false), 2000); // Hide modal after 2 seconds
    }
  };

  return (
    <div className="product-card border p-4 rounded shadow">
      <img
        src={product.image}
        alt={product.name}
        onClick={handleImageClick}
        className="w-full h-64 object-cover cursor-pointer"
      />
      <h2 class="card-title">{product.title}</h2>

      <input 
        type="number" 
        value={quantity} 
        min="1" 
        onChange={handleQuantityChange} 
        className="border p-1 w-16 mt-2 mr-2"
      />
      <button onClick={handleAddToCart} className="bg-primary-content text-blue-500 px-2 py-1 rounded mt-2">Add to Cart</button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl mb-4">{product.title}</h2>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
            <div className="mt-4">
              <Link href={`../src/products/${product.id}`} className="px-4 py-2 bg-blue-500 text-white rounded mr-2 inline-block">
                View Product
              </Link>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded inline-block"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCartModal && (
        <div className="fixed bottom-4 right-4 bg-green-500 p-4 rounded shadow-lg">
          Item added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;