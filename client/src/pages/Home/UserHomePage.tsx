import React, { useState, useContext } from "react";
import FoodEntries from "../../components/FoodEntries/FoodEntries";
import AppContext from "../../context";

const UserHomePage: React.FC = () => {
  const [calorieLimit] = useState(0);
  const { foodEntries } = useContext(AppContext);

  return (
    <div>
      <FoodEntries entries={foodEntries} />
      <div className="calorie-limit">
        <p>{calorieLimit}</p>
      </div>
    </div>
  );
};

export default UserHomePage;
