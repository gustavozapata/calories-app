import React from "react";
import Button from "../Button/Button";
import "./Modal.css";

interface ModalProps {
  confirm: string;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  confirm,
  onConfirm,
  onCancel,
  children,
}) => {
  return (
    <div className="Modal">
      <div className="popup">
        {children}
        <div className="popup-buttons">
          <Button variant="cancel" label="Cancel" handleClick={onCancel} />
          <Button label={confirm} handleClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
