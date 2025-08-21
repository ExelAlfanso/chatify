"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import InputField from "@/components/InputField";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Signin() {
  const { user, refreshUser, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    refreshUser();
    if (user) {
      router.push("/");
    }
  }, [user, refreshUser, router]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
    } catch {
      setMessage("Invalid Credentials.");
    }
  }
  return (
    <form
      className="flex flex-col gap-10 items-center justify-center bg-white min-h-screen text-black"
      onSubmit={handleSubmit}
    >
      <Header className="font-bold">Sign in.</Header>
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="">email:</label>
          <br />
          <InputField
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></InputField>
        </div>
        <div>
          <label htmlFor="">password:</label>
          <br />
          <InputField
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></InputField>
        </div>
      </div>
      <Button type="submit">Sign in</Button>

      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}
