import React, { useState, useContext } from "react";
import { Food } from "../../@types/food";
import Button from "../../components/Button/Button";
import FilterEntries from "../../components/FilterEntries/FilterEntries";
import FoodEntries from "../../components/FoodEntries/FoodEntries";
import FoodForm from "../../components/FoodForm/FoodForm";
import Check from "../../components/Icons/Check";
import Close from "../../components/Icons/Close";
import Pencil from "../../components/Icons/Pencil";
import Modal from "../../components/Modal/Modal";
import AppContext from "../../context";

const UserHomePage: React.FC = () => {
  const { foodEntries, user, handleAddFood, updateCalorieLimit } =
    useContext(AppContext);
  const [calorieLimit, setCalorieLimit] = useState(
    user.calorieLimit.toString()
  );
  const [isEditable, setIsEditable] = useState(false);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

  const handleCalorieLimit = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.match(/^[0-9]*$/)) {
      setCalorieLimit(e.currentTarget.value);
    }
  };

  const handleCreateFood = (body: Food) => {
    setIsAddFoodOpen(false);
    handleAddFood(body, body.user?._id as string);
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
            <Close
              handleClick={() => {
                if (calorieLimit === "") {
                  setCalorieLimit(user.calorieLimit.toString());
                }
                setIsEditable(false);
              }}
            />
            <Check
              handleClick={() => {
                if (calorieLimit !== "") {
                  updateCalorieLimit(user._id, calorieLimit, () =>
                    setIsEditable(false)
                  );
                }
              }}
            />
          </>
        ) : (
          <>
            <span>{calorieLimit}</span>
            <Pencil handleClick={() => setIsEditable(true)} />
          </>
        )}
      </div>
      <div className="entries-bar">
        <Button label="+ Add food" handleClick={() => setIsAddFoodOpen(true)} />
        <FilterEntries />
      </div>
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
