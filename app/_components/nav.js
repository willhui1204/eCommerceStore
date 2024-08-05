"use client";

import Link from 'next/link';
import React from 'react';



export default function Nav(){
    return (
      <nav className="p-4 bg-slate-800 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link href="./" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link href="./cart" className="hover:underline">Cart</Link>
          </li>
          <li>
            <Link href="./login" className="hover:underline">Login</Link>
          </li>
        </ul>
      </nav>
    );
  }
