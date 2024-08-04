"use client";

import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const NavBar = () => {

  const { getTotalQuantity, getTotalAmount } = useCart();
  const [quantity, setQuantity] = useState(getTotalQuantity(0));
  const [amount, setAmount] = useState(getTotalAmount(0));

  useEffect(() => {
    // Update state whenever `getTotalQuantity` or `getTotalAmount` changes
    const updateCart = () => {
      setQuantity(getTotalQuantity());
      setAmount(getTotalAmount());
    };

    // Initial update
    updateCart();

    // Setup event listener for localStorage changes
    window.addEventListener('storage', updateCart);

    //updateCart();

    // Cleanup event listener
    return () => {
      window.removeEventListener('storage', updateCart);
    };
  }, [getTotalQuantity, getTotalAmount]);

  // const quantity = getTotalQuantity();
  // const amount = getTotalAmount();

  return (
    <nav className="flex justify-between items-center py-4">
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <Link href="/" legacyBehavior>
          <a class="btn btn-ghost text-xl">My E-commerce Site</a>
          </Link>
        </div>
        <div class="flex-none">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
              <div class="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="badge badge-sm indicator-item">{quantity}</span>
              </div>
            </div>
            <div
              tabindex="0"
              class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
              <div class="card-body">
                <span class="text-lg font-bold">{quantity} Items</span>
                <span class="text-info">Subtotal: ${amount}</span>
                <div class="card-actions">
                  <Link href="../src/cart" legacyBehavior>
                  <a class="btn btn-primary btn-block">View cart</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link href="../src/login" legacyBehavior>
                <a class="justify-between">
                  Login
                </a>
                </Link>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
