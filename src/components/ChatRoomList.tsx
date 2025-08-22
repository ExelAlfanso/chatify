"use client";

import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface ChatRoom {
  roomID: string;
  name: string;
  count: number;
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
  const router = useRouter();
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
    <div id={id} className={`font-primary ${className}`}>
      <table className="border border-black border-collapse w-100 lg:w-200">
        <thead>
          <tr>
            <th>No</th>
            <th>Room Name</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, idx) => (
            <tr
              key={idx}
              className="cursor-pointer hover:bg-gray-50 hover:font-semibold"
              onClick={() => {
                router.push(
                  `${user === null ? `/login` : `/chat/${room.roomID}`}`
                );
              }}
            >
              <td className="p-5">{idx + 1}</td>
              <td className="p-5">{room.name} Chat Room</td>
              <td className="p-5">{room.count}/50</td>
            </tr>
          ))}
        </tbody>
      </table>

      {children}
    </div>
  );
};

export default ChatRoomList;
