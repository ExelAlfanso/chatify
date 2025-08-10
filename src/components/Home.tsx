"use client";

import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { useLoading } from "@/context/LoadingContext";
import { useAuth } from "@/context/AuthContext";

interface HomeProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ id, className }) => {
  const { hideLoading } = useLoading();
  const { refreshUser } = useAuth();
  useEffect(() => {
    hideLoading();
    refreshUser();
  }, [hideLoading, refreshUser]);
  return (
    <section id={id} className={`font-sans min-h-screen bg-white ${className}`}>
      <Navbar id="Navbar" />
      <Hero id="Hero"></Hero>
    </section>
  );
};

export default Home;
