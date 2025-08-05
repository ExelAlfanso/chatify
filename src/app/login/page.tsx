"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import InputField from "@/components/InputField";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login Failed.");
        return;
      }
      router.push("/");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
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
