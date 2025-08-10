"use client";
import LoadingOverlay from "@/components/LoadingOverlay";
import { createContext, useState, useContext } from "react";

interface LoadingContextType {
  showLoading: () => void;
  hideLoading: () => void;
}

interface LoadingProviderProps {
  children: React.ReactNode;
}
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      {children}
      {loading && <LoadingOverlay></LoadingOverlay>}
    </LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
