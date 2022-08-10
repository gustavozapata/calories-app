import React from "react";
import "./Button.css";

export interface ButtonProps {
  label: string;
  handleClick: () => void;
  variant?: "primary" | "secondary";
  size?: "small" | "large";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  handleClick,
  variant = "primary",
  size = "large",
  disabled,
}) => {
  return (
    <button
      className={`Button ${variant} btn-${size}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
