"use client";

import Button from "@/components/Button";
import LogoutButton from "@/components/LogoutButton";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axiosInstance.get("me");
        setUser(res.data.user);
      } catch {
        console.log("User is not logged in.");
      }
    };
    checkLogin();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white">
      {user !== null && (
        <div>
          <Link href="/chat">
            <Button type={"button"}>Enter Chat Room</Button>
          </Link>
          <LogoutButton></LogoutButton>
        </div>
      )}
      <div>
        {user === null && (
          <Link href="/login">
            <Button type="button">Login</Button>
          </Link>
        )}
        <Link href="/register">
          <Button type={"button"}>Register</Button>
        </Link>
      </div>
    </div>
  );
}
