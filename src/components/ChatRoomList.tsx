"use client";

import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import LinkButton from "./LinkButton";
import { useAuth } from "@/context/AuthContext";

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
  const { user } = useAuth();
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
    <div id={id} className={`grid grid-cols-3 ${className}`}>
      {rooms.map((room, idx) => (
        <LinkButton
          href={`${user === null ? `/login` : `/chat/${room.roomID}`}`}
          key={idx}
        >
          <Button type={"button"}>Enter {room.name} chat room</Button>
        </LinkButton>
      ))}

      {children}
    </div>
  );
};

export default ChatRoomList;
