"use client";

import React from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

interface HomeProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ id, className }) => {
  return (
    <section id={id} className={`font-sans min-h-screen bg-white ${className}`}>
      <Navbar id="Navbar" />
      <Hero id="Hero"></Hero>
    </section>
  );
};

export default Home;
