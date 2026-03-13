"use client";

import Link from "next/link";

export default function ChatRoomsPage() {
    // ✅ Read localStorage directly in render - NO useEffect needed!
    const userEmail = typeof window !== "undefined" ? localStorage.getItem("email"):null;
    const rooms=[
        {id: 1, name: "Public Lounge", users: 12, description: "Casual chat"},
        {id: 2, name: "Dating Lounge", users: 18, description: "Meet me at the Movies"},
        {id: 3, name: "Singles Chats", users: 24, description: "No couples, Just Single"},
        {id: 4, name: "Fun & Games", users: 30, description: "No strings attached"},
        {id: 5, name: "Adult fun", users: 30, description: "We Grown Chat"},
    ];

    // Early return if not logged in

    if (!userEmail){
        return (
            <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-purple-500 to-blue-600 text-white">
           <h1 className="text-4xl font-bold mb-4">Chat Rooms</h1>
           <p className="text-xl mb-8">Please log in to join chat rooms</p>
           <Link
           href="/login"
           className="bg-white text-purple-600 px-8 py-3 rounded-1g font-semibold hover:bg-gray-100 transition"
           >
           Go to Login
           </Link>
            </main>
        );
    }

   

    return(
        <main className="min-h-screen bg-gray-s0 py-12 px-4">
            <div className="max-w-4x1 mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4x1 font-bold text-gray-900 mb-2">Chat Rooms</h1>
                        <p className="text-x1 text-gray-600">
                            Logged in as <span className="font-semibold text-gray-900">
                                {userEmail}</span>
                        </p>
                    </div>
                    <Link
                    href="/dashboard"
                    className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
                    >
                        Dashboard
                    </Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                    {rooms.map((room)=>(
                        <div
                        key={room.id}
                        className="bg-white p-8 rounded-x1 shadow-lg hover:shadow-x1 transition-all duration-300 border-1-4 border-purple-500"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2x1 font-bold text-gray-900">{room.name}</h3>
                               <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                {room.users} online
                               </span>
                             </div> 
                             <p className="text-gray-600 mb-6">{room.description}</p>
                             <Link
                             href={`/chat/${room.id}`} 
                         className="w-full block bg-linear-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg text-center font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Join Room
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}