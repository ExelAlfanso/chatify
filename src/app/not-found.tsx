"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function NotFound() {
  const { setLoading } = useAuth();
  useEffect(() => {
    setLoading(false);
  });
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center text-4xl lg:text-7xl">
      <h1>Not Found (404).</h1>
    </div>
  );
}
