"use client";
import Image from "next/image";
import axiosInstance from "@/lib/axios";
import socket from "@/lib/socket";
import { useEffect, useRef, useState } from "react";
import Message from "@/components/Message";
import { MoveLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BackIcon from "./BackIcon";
interface MessageData {
  senderUsername: string;
  content: string;
  avatar: string;
  roomID: string;
  tempID?: string;
}
interface OnlineUser {
  username: string;
  avatar?: string;
}
interface ChatRoomProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ id, className }) => {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
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
    loadMessages();
  }, [id]);

  useEffect(() => {
    if (!user) return;
    const onUpgrade = (transport: { name: string }) => {
      setTransport(transport.name);
    };
    const onConnect = () => {
      console.log("Connected to socket");
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.io.engine.on("upgrade", onUpgrade);
      socket.emit("join-room", { roomID: id, user });
    };
    const onDisconnect = () => {
      console.log("Disconnected from socket");
      setIsConnected(false);
      setTransport("N/A");
    };

    const onMessage = (msg: MessageData) => {
      console.log("Socket received message:", msg);
      setMessages((prev) => {
        if (msg.tempID && prev.some((m) => m.tempID === msg.tempID)) {
          return prev;
        }
        return [...prev, msg];
      });
    };

    const onOnlineUsers = (users: OnlineUser[]) => {
      console.log("Online users updated:", users);
      setOnlineUsers(users);
    };

    socket.onAny((event, ...args) => {
      console.log("Socket Event:", event, args);
    });
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("online-users", onOnlineUsers);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socket.off("online-users", onOnlineUsers);
      socket.io.engine.off("upgrade", onUpgrade);
      socket.offAny();
    };
  }, [user, id]);
  const sendMessage = () => {
    if (!input.trim()) return;
    const tempID = Date.now().toString();
    const messagePayload: MessageData & { tempID?: string } = {
      senderUsername: user?.username || "",
      content: input,
      avatar: user?.avatar || "",
      roomID: id,
      tempID,
    };
    setMessages((prev) => [...prev, messagePayload]);
    socket.emit("message", messagePayload);
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div id={id} className={`w-1/2 text-black ${className}`}>
      <BackIcon />
      <h1 className="text-center text-3xl lg:text-6xl font-bold p-10">
        {id} chat room{" "}
        <span
          className={`inline ${
            isConnected ? "text-green-500" : "text-red-500"
          }`}
        >
          .
        </span>
      </h1>
      <div className="flex flex-row items-center justify-center gap-2   w-full">
        <div className="mb-4 border p-2">
          <h2 className="font-semibold mb-2">
            Online Users ({onlineUsers.length})
          </h2>
          <ul className="space-y-2">
            {onlineUsers.map((u, i) => (
              <li key={i} className="flex items-center gap-2">
                <Image
                  src={u.avatar || "/default-avatar.png"}
                  alt={u.username}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>{u.username}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
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
          <div className="flex flex-row gap-1">
            <input
              className=" px-2 py-1 mt-2 w-full border border-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="mt-2 px-4 py-2 bg-white text-black cursor-pointer hover:bg-slate-50 font-semibold  border border-black"
              onClick={sendMessage}
            >
              <MoveLeft></MoveLeft>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
