"use client";
import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import ItemCard from "./item-card";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [targetProducts, setTargetProducts] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    setCategories(data);
  };

  const fetchAllProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  };

  const updateShowedProducts = async () => {
    const allProducts = await fetchAllProducts();
    let filteredProducts = allProducts;
    if (selectedCategory) {
      filteredProducts = allProducts.filter((product) =>
        product.category.includes(selectedCategory)
      );
    }
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setTargetProducts(filteredProducts);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    updateShowedProducts();
  }, [selectedCategory, searchTerm]);

  return (
    <div className="flex">
      <div>
        <div className="flex flex-col h-screen border border-blue-300 m-2 space-y-4">
          <h2>items categories</h2>
          {categories.map((category) => (
            <button
              key={category}
              className={clsx("btn", {
                "btn-secondary": selectedCategory === category,
              })}
              onClick={() => selectedCategory=== category? setSelectedCategory("") : setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          placeholder="Search your product"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded"
        />
        <div className="flex flex-wrap gap-4">
          {targetProducts.map((product) => (
            <ItemCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
