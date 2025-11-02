"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ChatMessage {
  content: string;
  timestamp?: number;
}

export default function HomePage() {
  const [messages, setMessages] = useState<(string | ChatMessage)[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io("http://localhost:4000");
    setSocket(socketIo);

    socketIo.on("message", (msg: string | ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    const msg: ChatMessage = { content: input, timestamp: Date.now() };
    socket.emit("message", msg);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Next.js + Socket.IO Chat (TS)</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>

      <ul>
        {messages.map((msg, i) => (
          <li key={i}>
            {typeof msg === "string" ? msg : msg.content}{" "}
            {typeof msg !== "string" && (
              <small>({new Date(msg.timestamp!).toLocaleTimeString()})</small>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
