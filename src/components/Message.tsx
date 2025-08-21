import React from "react";
import Image from "next/image";
interface MessageProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  username?: string;
  avatar?: string;
}

const Message: React.FC<MessageProps> = ({
  id,
  className,
  children,
  username,
  avatar,
}) => {
  return (
    <div
      id={id}
      className={`flex flex-row text-black p-2 mb-2 w-1/2 ${className}`}
    >
      <Image
        src={avatar || "/default-avatar.jpg"}
        width={50}
        height={50}
        alt={username || "avatar"}
        className="inline rounded-full mr-2"
      />
      <span>
        <div className="font-semibold">{username}</div>
        <div>{children}</div>
      </span>
    </div>
  );
};

export default Message;
