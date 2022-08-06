import React from "react";
import "./Button.css";

export interface ButtonProps {
  label: string;
  handleClick: () => void;
  variant?: "primary" | "secondary" | "cancel";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  handleClick,
  variant = "primary",
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
