"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "./Button";
import InputField from "./InputField";
import axiosInstance from "@/lib/axios";
import { useLoading } from "@/context/LoadingContext";

interface ProfileProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const Profile: React.FC<ProfileProps> = ({ id, className, children }) => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);
  async function handleChange(e: React.FormEvent) {
    e.preventDefault();

    try {
      showLoading();
      await axiosInstance.put("/users/update/", {
        id: user?.id,
        username: username,
        email: email,
      });
      console.log("Successfully updated user!");
    } catch (err) {
      console.log(err);
    } finally {
      hideLoading();
    }
  }
  return (
    <div
      id={id}
      className={`min-h-screen w-full bg-white text-black ${className}`}
    >
      <form className="flex flex-row" onSubmit={handleChange}>
        <InputField
          type={"text"}
          placeholder={user?.username ?? ""}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type={"email"}
          value={email}
          placeholder={user?.email ?? ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type={"submit"}>Save</Button>
      </form>
    </div>
  );
};

export default Profile;
