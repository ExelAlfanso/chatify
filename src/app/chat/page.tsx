"use client";

import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ChatRoomProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ id, className, children }) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axiosInstance.get("auth/me");
        setUser(res.data.user);
      } catch (err) {
        router.push("/");
      }
    };
    checkLogin();
  }, []);

  return (
    <div id={id} className={`${className}`}>
      hi
      {children}
    </div>
  );
};

export default ChatRoom;
