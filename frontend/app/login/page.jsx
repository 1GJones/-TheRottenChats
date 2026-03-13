"use client";

import { useState } from "react";

export default function LoginPage() {
    const [formData,setFormData] = useState({ email: '', password: ''})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState ('')

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})


    }
    
    const handleSubmit = async (e) => {
        console.log("Submitting login form with:", formData);  // <--- add this

        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)


        try {

            const res = await fetch("http://localhost:8000/api/auth/login",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData),   
            });
            
            console.log("Status:", res.status); // debug


            const data = await res.json();
            console.log("Response", data); // debug

            

            if (!res.ok || data.success === false) {
                throw new Error(data.error || data.message || "Logn failed"); 
            }

            if (data.token) {
                localStorage.setItem("token", data.token);
            }
            setSuccess("Logged in! (Next step: redirect to chat/dashboard)");
        }catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

        };

        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-100">
                <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8"
                >
                    <h1 className="text-2xl font-semibold mb-6 text-center">Log in</h1>
                    {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
                    {success && <p className="mb-4 text-sm text-green-600">{success}</p>}

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                            Email
                        </label>
                        <input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none boader rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        />
                        </div>

                        <div className="mb-6">
                        <label className="block text-sm font-medium mb-1" htmlFor="password"> 
                        Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
                            placeholder="••••••••"
                            required
                            />
                            <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 route focus:outline-none focus:ring disabled:opacity-60"
                            >
                                {loading ? "Logging in..." : "Log in"}
                            </button>
                    </div>
                </form>
            </main>
    );
    }


