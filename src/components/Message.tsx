import React from "react";

interface MessageProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  username?: string;
}

const Message: React.FC<MessageProps> = ({
  id,
  className,
  children,
  username,
}) => {
  return (
    <div
      id={id}
      className={`flex flex-col text-black border border-black p-2 ${className}`}
    >
      <div>{username}</div>
      <div>{children}</div>
    </div>
  );
};

export default Message;
