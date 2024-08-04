"use client";
import React, { useEffect, useState } from 'react';
import NavBar from './src/components/NavBar';
import ProductCard from './src/components/ProductCard';
import { useCart } from './src/context/CartContext';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('');
  const { getTotalQuantity, getTotalAmount } = useCart();

  // Fetch all categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products based on selected category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `https://fakestoreapi.com/products/category/${selectedCategory}`
          : 'https://fakestoreapi.com/products';
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Sort products based on selected sort option
  useEffect(() => {
    const sortedProducts = [...products];
    if (sortOption === 'name') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'price') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    setProducts(sortedProducts);
  }, [sortOption]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCartItems);
  }, []);

  const handleAddToCart = (product, quantity) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    let updatedCart;
    
    if (existingItemIndex > -1) {
      // Update quantity if item already in the cart
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to the cart
      updatedCart = [...cart, { ...product, quantity }];
    }
    
    setCart(updatedCart);
    if (typeof window !== undefined) {
      localStorage.setItem(
        'cart',
        
        JSON.stringify(updatedCart)
      );
    }
    //localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto p-4 bg-secondary-content">
      <NavBar cartQuantity={getTotalQuantity()} cartAmount={getTotalAmount()}/>
      {/* <h1 className="text-2xl font-bold mb-4">Products</h1> */}
      
      <div className="mb-4">
        <label htmlFor="category" className="mr-2">Select Category:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange} className="border p-2 rounded">
          <option value="">All</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <label htmlFor="sort" className="ml-4 mr-2">Sort By:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange} className="border p-2 rounded">
          <option value="">None</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;