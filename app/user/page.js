"use client";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import ItemCard from "./item-card";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [targetProducts, setTargetProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');

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

  // Sort products based on selected sort option
  useEffect(() => {
    const sortedProducts = [...targetProducts];
    if (sortOption === 'name') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'price') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    setTargetProducts(sortedProducts);
  }, [sortOption]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="flex bg-primary-content">
      <div>
        <div className="flex flex-col m-2 space-y-4">
          <h2 className="mr-2 text-center">Categories</h2>
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
      <div className="sort-and-search mb-8">
        <label htmlFor="sort" className="ml-4 mr-2 mb-4">Sort By:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange} className="border p-2 rounded mr-4 mb-3">
            <option value="none">None</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        <label htmlFor="search" className="ml-4 mr-2">Search: </label>
        <input
          type="text"
          placeholder="Search your product"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded"
        />
        <div className="flex flex-wrap gap-4 ">
          {targetProducts.map((product) => (
            <ItemCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
