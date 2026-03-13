"use client";
import { useEffect,useState } from "react";

export default function DashboardPage(){
    const [email, setEmail]= useState<string | null>(null);
    const [loading, setLoading]= useState (true);

    useEffect(() => {

        // Simulate a simple a client-side "auth" check

        const token = localStorage.getItem("token");
        const storedEmail = localStorage.getItem("email"); // we'll set this from login

        if (!token) {
            setLoading(false);
            return;
        }

        setEmail(storedEmail);
        setLoading(false);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify bg-gray-100">
                <p className="text-gray-700">Checking login status...</p>
            </main>
        );
    }
        if (!email){
            return (
                <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

                    <h1 className="text-2xl font-semifold mb-4">Not logged in</h1>
                    <a
                    href="/login"
                    className="text-blue-600 underline"
                    >
                        Go to login page
                        </a>
                </main>
            );
            
        }
return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
        <p className="text-lg mb-4">You&aposre logged in as<span className="font-medium">{email}</span></p>
        <button
        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
        onClick={() =>{
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            window.location.href ="/login";

        }}
        >
            Log out
        </button>
    </main>
);


}