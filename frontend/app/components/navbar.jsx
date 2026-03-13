"use client";

import Link from "next/link";

export default function Navbar() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  // Hide on login page
  if (typeof window !== "undefined" && window.location.pathname === "/login") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={token ? "/chat-rooms" : "/login"} className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            💕 RottenChats
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link 
                  href="/chat-rooms" 
                  className="text-gray-700 hover:text-purple-600 font-medium px-3 py-2 rounded-lg transition"
                >
                  💬 Rooms
                </Link>
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-purple-600 font-medium px-3 py-2 rounded-lg transition"
                >
                  📊 Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
