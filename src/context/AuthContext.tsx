"use client";

import {
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
  useContext,
  useCallback,
} from "react";
import axiosInstance from "@/lib/axios";
import User from "../models/User.js";
import { useRouter } from "next/navigation.js";
import LoadingOverlay from "@/components/LoadingOverlay";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchUser = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/me");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      await axiosInstance.post("/register", {
        username,
        email,
        password,
      });
      router.push("/");
    } catch (err) {
      console.error("Registrastion failed.", err);
    } finally {
      setLoading(false);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await axiosInstance.post("/login", {
        email,
        password,
      });
      router.push("/home");
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("/logout");
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        loading,
        setLoading,
        refreshUser: fetchUser,
      }}
    >
      {loading && <LoadingOverlay></LoadingOverlay>}
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
