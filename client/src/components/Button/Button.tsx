import React from "react";

export interface ButtonProps {
  label: string;
  handleClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  handleClick,
  variant,
  disabled,
}) => {
  return (
    <button
      className={`Button ${variant}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
