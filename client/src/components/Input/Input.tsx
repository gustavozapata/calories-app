import React from "react";
import "./Input.css";

export interface InputProps {
  label: string;
  value: string;
  type: string;
  msg?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  type,
  msg,
  handleChange,
}) => {
  return (
    <div className="Input">
      {label}
      <br />
      <input type={type} name={label} value={value} onChange={handleChange} />
      <p>{msg}</p>
    </div>
  );
};

export default Input;
