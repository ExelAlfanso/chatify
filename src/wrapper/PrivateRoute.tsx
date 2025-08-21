"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface PrivateRouteProps {
  to?: string | undefined;
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ to = "/", children }) => {
  const { refreshUser, user, setLoading, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    refreshUser();
    if (!loading && !user) {
      setLoading(false);
      router.push(to);
    }
  }, [user, refreshUser, setLoading, loading, to, router]);
  return children;
};

export default PrivateRoute;
