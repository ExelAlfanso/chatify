import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BackIcon = () => {
  return (
    <Link href="/" className="absolute top-10 left-10 ">
      <MoveLeft></MoveLeft>
    </Link>
  );
};

export default BackIcon;
