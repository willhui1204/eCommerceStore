
"use client";

import React, { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import Nav from '../_components/nav';

export default function Page() {
  const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle email and password login logic here
    alert(`Logging in with\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <main className="bg-black min-h-screen p-4 text-white">
      <Nav />
      <div className="bg-black rounded-lg">
        <h1 className="text-3xl font-bold m-2 text-white">E-commerce Store</h1>

        <div className="shadow-md p-5 bg-black">
          <p className="text-white">{user ? "You have signed in! " : "Sign in with GitHub or Google"}</p>
          {user && user.displayName}
          <p className="p-2"></p>
          <a className="text-lg hover:underline text-white" href="/cart">
            {user ? "Continue to your Shopping" : ""}
          </a>

          <p className="p-4">
            {user ? (
              <button className="mr-2 px-4 py-2 rounded bg-blue-600 text-white" onClick={firebaseSignOut}>Sign Out</button>
            ) : (
              <div>
                <button className="mr-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white" onClick={gitHubSignIn}>
                  Sign in with GitHub
                </button>
                <button className="mr-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white" onClick={googleSignIn}>
                  Sign in with Google
                </button>                
              </div>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
