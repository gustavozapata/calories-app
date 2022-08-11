import React from "react";
import "./Input.css";

export interface InputProps {
  label: string;
  value: string | number;
  type: string;
  msg?: string;
  size?: "small" | "large";
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  type,
  msg,
  size = "small",
  handleChange,
  handleFocus,
}) => {
  return (
    <div className="Input">
      <span>{label}</span>
      <br />
      <input
        className={`input-${size}`}
        type={type}
        name={label}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      <p>{msg}</p>
    </div>
  );
};

export default Input;
