"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import LogoutButton from "./LogoutButton";
import { NavBarDatas } from "@/datas/NavbarDatas";

interface NavbarProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ id, className, children }) => {
  const { user } = useAuth();
  return (
    <nav
      id={id}
      className={`flex flex-row items-center justify-evenly w-full h-10 border border-black p-10 bg-white ${className}`}
    >
      <p className="text-black font-bold ">Chatify</p>
      {NavBarDatas.map((item, idx) => (
        <Link
          href={item.href}
          key={idx}
          className="text-black font-semibold hover:bg-slate-50 p-5"
        >
          {item.label}
        </Link>
      ))}
      {user === null && (
        <div className="flex gap-5">
          <Link href="/login">
            <Button type="button">Login</Button>
          </Link>
          <Link href="/register">
            <Button type={"button"}>Register</Button>
          </Link>
        </div>
      )}
      {user && <LogoutButton></LogoutButton>}
      {children}
    </nav>
  );
};

export default Navbar;
