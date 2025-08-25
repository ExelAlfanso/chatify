import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BackIcon = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "/";
  };
  return (
    <Link href="/" onClick={handleClick} className="absolute top-10 left-10 ">
      <MoveLeft></MoveLeft>
    </Link>
  );
};

export default BackIcon;
