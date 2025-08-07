"use client";

import axiosInstance from "@/lib/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "./Button";

interface ChatRoom {
  roomID: string;
  name: string;
}

interface ChatRoomListProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({
  id,
  className,
  children,
}) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axiosInstance.get("/chatrooms");
        setRooms(res.data.rooms);
      } catch (err) {
        console.error("Failed to fetch chat rooms", err);
      }
    };
    fetchRooms();
  }, []);
  return (
    <div id={id} className={`${className}`}>
      {rooms.map((room, idx) => (
        <Link href={`/chat/${room.roomID}`} key={idx}>
          <Button type={"button"}>Enter {room.name} chat room</Button>
        </Link>
      ))}

      {children}
    </div>
  );
};

export default ChatRoomList;
