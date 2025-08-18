"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
import Link from "next/link";

interface ProfileDropdownProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  id,
  className,
  children,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const handleDropdown = () => {
    setIsOpen((open) => !open);
  };
  const handleLogout = async () => {
    try {
      showLoading();
      await axiosInstance.post("/logout");
      router.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      hideLoading();
    }
  };

  return (
    <div
      ref={dropdownRef}
      id={id}
      className={`text-black font-primary font-semibold ${className}`}
    >
      <button
        onClick={handleDropdown}
        className="flex items-center justify-between gap-2 py-2 bg-gray-100 rounded-full w-50 hover:bg-gray-200 focus:outline-none focus:ring-1"
      >
        <div className="flex flex-row items-center justify-center">
          <div className="mx-5 border-2 rounded-full">{/* <User /> */}</div>
          {user && user.username ? (
            <span className="text-sm font-semibold">{user.username}</span>
          ) : (
            <span className="text-sm font-semibold">Guest</span>
          )}
        </div>
      </button>
      {children}
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 bg-white rounded shadow">
          <Link
            href={"/profile"}
            className="block w-full px-4 py-2 text-left cursor hover:bg-gray-100"
          >
            Profile
          </Link>
          <button
            className="block w-full px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
