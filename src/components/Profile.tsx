"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "./Button";
import InputField from "./InputField";
import axiosInstance from "@/lib/axios";
import { useLoading } from "@/context/LoadingContext";
import { User, Camera } from "lucide-react";
import Image from "next/image";

interface ProfileProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const Profile: React.FC<ProfileProps> = ({ id, className, children }) => {
  const { user, refreshUser } = useAuth();
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setAvatar(user.avatar);
      setUserId(user.id);
    }
  }, [user]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      showLoading();
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        const res = await axiosInstance.put(
          `/users/${user?.id}/uploadAvatar`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setAvatar(res.data.avatarUrl);
      }
      await axiosInstance.put(`/users/${userId}/update`, {
        id: userId,
        username: username,
        email: email,
      });
      console.log("Successfully updated user!");
    } catch (err) {
      console.log(err);
    } finally {
      refreshUser();
      hideLoading();
    }
  }
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;
    const previewUrl = URL.createObjectURL(file);
    setAvatar(previewUrl);
    setAvatarFile(file);
  };
  return (
    <div
      id={id}
      className={`flex items-center justify-center min-h-screen w-full bg-white text-black ${className}`}
    >
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="relative group flex items-center justify-center border-2 border-black rounded-full w-32 h-32 overflow-hidden">
          {avatar ? (
            <Image
              src={avatar}
              alt="user profile"
              width={128}
              height={128}
              className="object-cover w-full h-full"
              priority
            />
          ) : (
            <User size={100} className="p-3 " />
          )}

          <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <Camera className="text-white w-6 h-6" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </div>
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
