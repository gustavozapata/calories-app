import React from "react";
import "./Modal.css";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="Modal">
      <div className="popup">{children}</div>
    </div>
  );
};

export default Modal;
