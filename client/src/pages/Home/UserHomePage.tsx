import React, { useState, useContext } from "react";
import { Food } from "../../@types/food";
import Button from "../../components/Button/Button";
import FoodEntries from "../../components/FoodEntries/FoodEntries";
import FoodForm from "../../components/FoodForm/FoodForm";
import Check from "../../components/Icons/Check";
import Close from "../../components/Icons/Close";
import Pencil from "../../components/Icons/Pencil";
import Modal from "../../components/Modal/Modal";
import AppContext from "../../context";
import { apiAddFood } from "../../services/food";

const UserHomePage: React.FC = () => {
  const [calorieLimit, setCalorieLimit] = useState("2100");
  const [isEditable, setIsEditable] = useState(false);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const { foodEntries } = useContext(AppContext);

  const handleCalorieLimit = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.match(/^[0-9]*$/)) {
      setCalorieLimit(e.currentTarget.value);
    }
  };

  const handleCreateFood = (body: Food) => {
    setIsAddFoodOpen(false);
    apiAddFood(body);
  };

  return (
    <div>
      <div className="calorie-limit">
        Calorie limit per day:
        {isEditable ? (
          <>
            <input
              value={calorieLimit}
              type="text"
              onChange={handleCalorieLimit}
            />
            <Close handleClick={() => setIsEditable(false)} />
            <Check handleClick={() => {}} />
          </>
        ) : (
          <>
            <span>{calorieLimit}</span>
            <Pencil handleClick={() => setIsEditable(true)} />
          </>
        )}
      </div>
      <Button label="+ Add food" handleClick={() => setIsAddFoodOpen(true)} />
      <FoodEntries entries={foodEntries} />
      {isAddFoodOpen && (
        <Modal>
          <FoodForm
            confirm="Add food"
            onConfirm={handleCreateFood}
            onCancel={() => setIsAddFoodOpen(false)}
            title="New food entry"
          />
        </Modal>
      )}
    </div>
  );
};

export default UserHomePage;
