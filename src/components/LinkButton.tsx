import { useLoading } from "@/context/LoadingContext";
import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  id,
  className,
  children,
  href,
}) => {
  const { showLoading } = useLoading();
  return (
    <Link onClick={showLoading} href={href} id={id} className={`${className}`}>
      {children}
    </Link>
  );
};

export default LinkButton;
