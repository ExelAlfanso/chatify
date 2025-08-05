"use client";

import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

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
    await fetch("/api/auth/logout", {
      method: "POST",
    });
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
