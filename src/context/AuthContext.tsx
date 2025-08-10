"use client";

import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
  useContext,
} from "react";
import axiosInstance from "@/lib/axios";
interface AuthProviderProps {
  children: ReactNode;
}
interface User {
  username: string;
  email: string;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  refreshUser: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchUser = async () =>
    await axiosInstance
      .get("/me")
      .then((res) => {
        console.log("Fetched from /me:", res.data.user);
        setUser(res.data.user);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, setUser, refreshUser: fetchUser }}
    >
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
