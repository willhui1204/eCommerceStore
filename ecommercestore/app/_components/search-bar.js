"use client"

import { useState } from "react";


export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
  
    const handleSearch = (event) => {
      event.preventDefault();
      onSearch(query);
    };
  
    return (
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          className="w-96 h-10 p-2 rounded text-black"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-6 rounded">
          Search
        </button>
      </form>
    );
  }