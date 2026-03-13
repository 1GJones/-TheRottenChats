"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [formData,setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState ('');
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});


    };
    
    const handleSubmit = async (e) => {
        console.log("Submitting login form with:", formData);  

        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        // TEST: Backend alive?
    try {
        const test = await fetch("http://localhost:8000/");
        console.log("✅ Backend alive:", await test.json());
    } catch (err) {
        console.log("❌ Backend DEAD:", err.message);
        setError("Backend not running! Start: cd backend && npm run dev");
        return;
    }


        try {

            const res = await fetch("http://localhost:8000/api/auth/login",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData),   
            });
            
            console.log("Status:", res.status); // debug


            const data = await res.json();
            console.log("Response", data); // debug

            

            if (res.ok && data.success) {
                // ✅ Save to localStorage and redirect
                localStorage.setItem("token",data.token);
                localStorage.setItem("email",data.user.email || formData.email);
                setSuccess("Login successful! Redirecting...");
                
                // Redirect to chat rooms

                setTimeout(() => {
                    router.push("/chat-rooms");
                }, 1000);
            } else {
                setError(data.error || "login failed");
            }


        }  catch (err) {
               console.error("Login error:", err);
               setError("Network error. Is backend running on port 8000?");
            }finally {
                setLoading(false);
            }
     
        };

        return (
              <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 px-4 py-12">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                        </label>
                        <input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                        placeholder="you@example.com"
                        autoComplete="email"
                        
                        />
                        </div>

                        <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !formData.email || !formData.password}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="text-center">
                   <p className="text-sm text-gray-600">
                        Dont have an account?{' '}
                        <Link href="#" className="font-semibold text-purple-600 hover:text-purple-700">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}