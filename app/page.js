
"use client"

import Link from "next/link";
import ProductList from "./_components/product-list";
import Nav from "./_components/nav";
import { useState } from "react";
import SearchBar from "./_components/search-bar";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <main className="bg-slate-950 min-h-screen">
      <Nav />
      <div className="p-4">
        <h1 className="text-3xl font-bold m-2 text-white">E-commerce Store</h1>
        <SearchBar onSearch={handleSearch} />
        <ProductList searchQuery={searchQuery} />
      </div>
    </main>
    
  );
}