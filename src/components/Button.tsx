import React from "react";

interface ButtonProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: "submit" | "reset" | "button";
}

const Button: React.FC<ButtonProps> = ({
  id,
  className,
  children,
  onClick,
  type,
}) => {
  return (
    <button
      type={type}
      id={id}
      onClick={onClick}
      className={`cursor-pointer border-black border hover:bg-slate-50 font-semibold rounded-full px-4 py-2 ${className} text-black`}
    >
      {children}
    </button>
  );
};

export default Button;
