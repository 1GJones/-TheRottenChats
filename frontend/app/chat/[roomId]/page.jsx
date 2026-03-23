"use client";
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import io from 'socket.io-client';

export default function ChatRoom() {
  const { roomId } = useParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [connected, setConnected] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check login
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (!email || !token) {
      router.push('/login');
      return;
    }
    setUserEmail(email);

    // Connect to socket server
    const newSocket = io('/', { path: '/api/socket' });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('🟢 Socket connected!', newSocket.id);
      setConnected(true);
      newSocket.emit('join-room', roomId);
    });

    newSocket.on('receive-message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      newSocket.off("receive-message");
      newSocket.close();
    };
  }, [roomId, router]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket?.connected) return;

    const messageData = {
      roomId,
      email: userEmail,
      message: input.trim(),
    };

    // Optimistic render
    setMessages((prev) => [
      ...prev,
      { ...messageData, timestamp: new Date().toISOString() },
    ]);

    socket.emit('send-message', messageData);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  if (!userEmail) return <div>Loading...</div>;

  const roomNameMap = {
    1: "Public Lounge",
    2: "Dating Lounge",
    3: "Singles Chats",
    4: "Fun & Games",
    5: "Adults Fun",
  };

  const roomName = roomNameMap[roomId] || "Chat Room";

  return (
    <>
      
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Top bar */}
        <div className="bg-white border-b p-4">
          <Link href="/chat-rooms" className="text-purple-600 font-semibold">
            ← Back to Rooms
          </Link>
          <span className="ml-4 text-sm text-gray-500">
            {roomName} • {connected ? '🟢 Live' : '🔴 Offline'}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-4 flex ${msg.email === userEmail ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-md p-3 rounded-lg ${
                msg.email === userEmail 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-900'
              }`}>
                <div className="text-xs opacity-75">{msg.email === userEmail ? 'You' : msg.email}</div>
                <div>{msg.message}</div>
                {msg.timestamp && (
                  <div className='text-[10px] opacity-50 mt-1'>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-4 bg-white border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${roomName}...`}
            className="flex-1 p-3 border rounded-lg 
    text-gray-900 text-lg font-medium 
    placeholder-gray-500 placeholder:text-sm
    bg-white
    focus:text-black focus:outline-none focus:ring-2 focus:ring-purple-500
    [-webkit-text-security:none]
    [-webkit-appearance:textfield]
    not-placeholder-shown:text-gray-900"
            disabled={!connected}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || !connected}
            className="px-6 py-3 bg-purple-600 text-black rounded-lg disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}
