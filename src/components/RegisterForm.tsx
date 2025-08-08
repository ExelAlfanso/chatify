"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import InputField from "@/components/InputField";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axiosInstance.post("/register", {
        username,
        email,
        password,
      });
      router.push("/");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-10 items-center justify-center bg-white min-h-screen text-black"
    >
      <Header className="font-bold">Sign up.</Header>
      <div className="flex flex-col gap-10">
        <div>
          <div>
            <label htmlFor="">username:</label>
            <br />
            <InputField
              type="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            ></InputField>
          </div>
          <label htmlFor="">email:</label>
          <br />
          <InputField
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></InputField>
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
      </div>
      <Button type="submit">Sign up</Button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}
