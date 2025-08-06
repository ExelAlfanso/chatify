"use client";

import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import socket from "@/lib/socket";
import { useEffect, useState } from "react";

interface ChatRoomProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ id, className, children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axiosInstance.get("me");
        setUser(res.data.user);
      } catch (err) {
        router.push("/");
      }
    };
    checkLogin();
  }, [router]);

  useEffect(() => {
    const onUpgrade = (transport: { name: string }) => {
      setTransport(transport.name);
    };
    const onConnect = () => {
      console.log("Connected to socket");
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.io.engine.on("upgrade", onUpgrade);
    };
    const onDisconnect = () => {
      console.log("Disconnected from socket");
      setIsConnected(false);
      setTransport("N/A");
    };

    const onMessage = (msg: string) => {
      console.log("Socket received message:", msg);
      setMessages((prev) => [...prev, msg]);
    };
    socket.onAny((event, ...args) => {
      console.log("Socket Event:", event, args);
    });
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socket.io.engine.off("upgrade", onUpgrade);
      socket.offAny();
    };
  }, []);
  const sendMessage = () => {
    if (!input.trim()) return;
    console.log("Sending message:", input);
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div id={id} className={`${className}`}>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <div className="border p-4 h-64 overflow-y-scroll">
        {messages.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
      <input
        className="border px-2 py-1 mt-2 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-400"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
