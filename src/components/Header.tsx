import React, { type JSX } from "react";

interface HeaderProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

const levelClasses: Record<number, string> = {
  1: "text-6xl",
  2: "text-5xl",
  3: "text-4xl",
  4: "text-3xl lg:text-6xl",
  5: "text-2xl lg:text-5xl",
  6: "text-xl lg:text-2xl",
  7: "text-2xs lg:text-xl",
};

const Header: React.FC<HeaderProps> = ({
  id,
  className = "",
  children,
  level = 1,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const baseClass = levelClasses[level] || levelClasses[2]; // fallback

  return (
    <Tag id={id} className={`text-black ${baseClass} ${className}`}>
      {children}
    </Tag>
  );
};

export default Header;
