"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import InputField from "@/components/InputField";
import { useLoading } from "@/context/LoadingContext";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { showLoading, hideLoading } = useLoading();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password should atleast has 6 characters");
      return;
    }
    if (password != confirmPassword) {
      setError("Password is not the same as confirmed password!");
      return;
    }
    try {
      showLoading();
      await axiosInstance.post("/register", {
        username,
        email,
        password,
      });
      router.push("/");
    } catch {
      setError("Account already exists.");
    } finally {
      hideLoading();
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
          <div>
            <label htmlFor="">confirm password:</label>
            <br />
            <InputField
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></InputField>
          </div>
        </div>
      </div>
      <Button type="submit">Sign up</Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
