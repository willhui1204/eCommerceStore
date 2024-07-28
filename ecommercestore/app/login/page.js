"use client"

import Link from 'next/link';
import React, { useState } from 'react';

export default function Login(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
    alert(`Logging in with\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <main className="bg-slate-950 min-h-screen p-4 text-white">
      <nav className="p-4 bg-slate-800 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link href="/cart" className="hover:underline">Cart</Link>
          </li>
          <li>
            <Link href="/login" className="hover:underline">Login</Link>
          </li>
        </ul>
      </nav>
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="bg-slate-800 p-4 rounded">
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-96 p-2 rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-96 p-2 rounded text-black"
          />
        </div>
        <button type="submit" className="w-96 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </main>
  );
}