"use client";

import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import socket from "@/lib/socket";
import { useEffect, useRef, useState } from "react";
import Message from "@/components/Message";

interface MessageData {
  senderUsername: string;
  content: string;
}

interface ChatRoomProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ id, className }) => {
  const [user, setUser] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axiosInstance.get("me");
        setUser(res.data.user);
        console.log(res.data.user);
      } catch {
        router.push("/");
      }
    };
    const loadMessages = async () => {
      try {
        const res = await axiosInstance.get("/messages", {
          params: { roomID: id },
        });
        setMessages(res.data.messages);
      } catch {
        console.error("Failed to load messages.");
      }
    };
    checkLogin();
    loadMessages();
  }, [id, router]);

  useEffect(() => {
    const onUpgrade = (transport: { name: string }) => {
      setTransport(transport.name);
    };
    const onConnect = () => {
      console.log("Connected to socket");
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.io.engine.on("upgrade", onUpgrade);
      socket.emit("join-room", id);
    };
    const onDisconnect = () => {
      console.log("Disconnected from socket");
      setIsConnected(false);
      setTransport("N/A");
    };

    const onMessage = (msg: MessageData) => {
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
  }, [id]);
  const sendMessage = () => {
    if (!input.trim()) return;
    const messagePayload = {
      roomID: id,
      senderUsername: user,
      content: input,
    };
    socket.emit("message", messagePayload);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });
  return (
    <div id={id} className={`min-h-screen text-black bg-white ${className}`}>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <div className="border p-4 h-64 overflow-y-scroll">
        {messages.map((msg, idx) => {
          return (
            <Message key={idx} username={msg.senderUsername}>
              {msg.content}
            </Message>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <input
        className="border border-black px-2 py-1 mt-2 w-full"
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
