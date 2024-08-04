'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NavBar from '../../components/NavBar';
import { useCart } from '../../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getTotalQuantity, getTotalAmount } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-secondary-content">
      <NavBar cartQuantity={getTotalQuantity()} cartAmount={getTotalAmount()}/>
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-64 object-contain mb-4"
      />
      <p>{product.description}</p>
      <p className="font-bold text-xl">${product.price}</p>
    </div>
  );
};


export default ProductPage;
