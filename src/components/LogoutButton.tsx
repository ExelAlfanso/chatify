"use client";

import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import { useLoading } from "@/context/LoadingContext";

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
  const { showLoading } = useLoading();
  async function handleLogout() {
    try {
      showLoading();
      await axiosInstance.post("/logout");
    } catch (err) {
      console.error(err);
    }
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
