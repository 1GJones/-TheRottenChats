"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';


// Wait for client

export default function Navbar() {

  // Read directly - ignore hydration (React 18 handles it)
const [isClient , setIsClient]= useState(false);  
const [token, setToken] = useState(null);
const [pathname, setPathname]= useState(null);

useEffect(() => {
  // Only runs on client after mount
  setIsClient(true);
  setToken(localStorage.getItem("token"));
  setPathname(window.location.pathname);

}, []);

if (!isClient)return null;
if (!token || pathname === "/login") return null;

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };
  return (
<nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/chat-rooms" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            💕 RottenChats
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/chat-rooms" className="text-gray-700 hover:text-purple-600 font-medium px-3 py-2 rounded-lg transition">
              💬 Rooms
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium px-3 py-2 rounded-lg transition">
              📊 Dashboard
            </Link>
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
