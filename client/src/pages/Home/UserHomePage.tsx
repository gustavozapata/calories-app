import React, { useState, useContext } from "react";
import FoodEntries from "../../components/FoodEntries/FoodEntries";
import Check from "../../components/Icons/Check";
import Close from "../../components/Icons/Close";
import Pencil from "../../components/Icons/Pencil";
import AppContext from "../../context";

const UserHomePage: React.FC = () => {
  const [calorieLimit, setCalorieLimit] = useState("2100");
  const [isEditable, setIsEditable] = useState(false);
  const { foodEntries } = useContext(AppContext);

  const handleCalorieLimit = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.match(/^[0-9]*$/)) {
      setCalorieLimit(e.currentTarget.value);
    }
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
      <FoodEntries entries={foodEntries} />
    </div>
  );
};

export default UserHomePage;
