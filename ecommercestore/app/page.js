"use client"

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./_components/search-bar";
import ProductList from "./_components/product-list";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <main className="bg-slate-950 min-h-screen">
      <nav className="p-4 bg-slate-800 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link href="./cart/" className="hover:underline">Cart</Link>
          </li>
          <li>
            <Link href="./login" className="hover:underline">Login</Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <h1 className="text-3xl font-bold m-2 text-white">E-commerce Store</h1>
        <SearchBar className="w-96" onSearch={handleSearch} />
        <ProductList searchQuery={searchQuery} />
      </div>
    </main>
    
  );
}
