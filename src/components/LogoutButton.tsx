"use client";

import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import axiosInstance from "@/lib/axios";

interface LogoutButtonProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  id,
  className,
  children,
}) => {
  const router = useRouter();

  async function handleLogout() {
    await axiosInstance.post("/logout");
    router.push("/login");
  }
  return (
    <Button type={"button"} onClick={handleLogout} className={className}>
      Logout
      {children}
    </Button>
  );
};

export default LogoutButton;
