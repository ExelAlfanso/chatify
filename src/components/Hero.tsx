import ChatRoomList from "@/components/ChatRoomList";
import React, { useState } from "react";

interface HeroProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ id, className, children }) => {
  return (
    <div
      id={id}
      className={`flex flex-col items-center justify-center text-black my-32 bg-white ${className}`}
    >
      <div className="w-200 text-7xl font-bold mb-10   ">
        <h1 className="inline">The Platform </h1>
        <h1>to connect People</h1>
      </div>
      <ChatRoomList></ChatRoomList>
      {children}
    </div>
  );
};

export default Hero;
