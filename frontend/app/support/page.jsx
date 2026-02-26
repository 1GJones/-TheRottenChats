"use client";

import { useState } from "react";
import { sendToSupportBot } from "../../lib/api/supportBot";

export default function SupportPage() {
  const [input, setInput] = useState("");
  const [topic, setTopic] = useState("safety");
  const [location, setLocation] = useState("Boston");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const resp = await sendToSupportBot({
        message: trimmed,
        topic,
        location,
      });
      setMessages((prev) => [...prev, { from: "bot", text: resp.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Sorry, I couldn't reach the support bot. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Support & Safety Bot</h1>

      <div className="mb-3 flex gap-2">
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="safety">Safety</option>
          <option value="local">Local date ideas</option>
          <option value="app">App help</option>
        </select>

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Your city"
          className="border rounded px-2 py-1 flex-1"
        />
      </div>

      <div className="border rounded h-80 p-2 mb-3 overflow-y-auto bg-white">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`mb-2 ${m.from === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-2 py-1 rounded ${
                m.from === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500">Bot is typing…</div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about safety, local dates, or the app…"
          className="border rounded px-2 py-1 flex-1"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-1 rounded"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </main>
  );
}
