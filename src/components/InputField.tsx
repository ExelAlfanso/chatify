import React from "react";

interface InputFieldProps {
  id?: string;
  type: string;
  placeholder: string;
  className?: string;
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type = "email",
  placeholder,
  className,
  children,
  onChange,
}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`border rounded-full border-black py-2 px-4 ${className}`}
      onChange={onChange}
    >
      {children}
    </input>
  );
};

export default InputField;
