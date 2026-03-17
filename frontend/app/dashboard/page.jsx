"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <div>User not found</div>;

  // ✅ Use user.email from API instead of undefined email
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <p className="text-lg mb-4">
        You're logged in as{" "} <span className="font-medium">{user.email}</span>
      </p>
      {/* ✅ FIXED: Added closing </button> tag */}
      <div className='flex items-center gap-4'>
      <button
        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
        </button>
    
        <Link href="#" className="font-semibold text-purple-600 hover:text-purple-700">
        Sign up
        </Link>
      </div>
    </main>
  );
  
}
