import React from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

interface ConfirmModalProps {
  setDeleteId: (id: string) => void;
  onDeleteFood: (id: string) => void;
  deleteId: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  setDeleteId,
  onDeleteFood,
  deleteId,
}) => {
  return (
    <Modal>
      <div>
        <h2>Delete food entry</h2>
        <p>Are you sure you want to delete this food entry?</p>
        <Button
          label="Cancel"
          handleClick={() => setDeleteId("")}
          variant="secondary"
        />
        <Button label="Delete" handleClick={() => onDeleteFood(deleteId)} />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
