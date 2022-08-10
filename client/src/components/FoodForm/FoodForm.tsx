import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Food, NutritionixFood } from "../../@types/food";
import AppContext from "../../context";
import { nutritionix_url } from "../../services";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Suggestions from "../Suggestions/Suggestions";
import "./FoodForm.css";

interface FoodFormProps {
  title: string;
  confirm: string;
  onConfirm: (body: Food) => void;
  onCancel: () => void;
  manageUserId?: string;
  foodId?: string;
  foodValue?: string;
  caloriesValue?: string;
  dateValue?: string;
}

const FoodForm: React.FC<FoodFormProps> = ({
  title,
  confirm,
  onConfirm,
  onCancel,
  manageUserId,
  foodId,
  foodValue = "",
  caloriesValue = "",
  dateValue = new Date().toISOString().slice(0, 16),
}) => {
  const [food, setFood] = useState(foodValue);
  const [calories, setCalories] = useState(caloriesValue);
  const [date, setDate] = useState(dateValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (food !== "") {
      handleApiGetFood(food);
    }
  }, [food]);

  const handleApiGetFood = (query: string) => {
    axios
      .get(`${nutritionix_url}?query=${query}`, {
        headers: {
          "x-app-id": process.env.REACT_APP_NUTRITIONIX_APP_ID as string,
          "x-app-key": process.env.REACT_APP_NUTRITIONIX_API_KEY as string,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSuggestions(res.data.branded);
      });
  };

  const handleSelect = (item: NutritionixFood) => {
    setFood(item.food_name);
    setCalories(item.nf_calories.toFixed(2).replace(/\.00$/, "").toString());
    setShowSuggestions(false);
  };

  return (
    <div className="FoodForm">
      <h1>{title}</h1>
      <form>
        <div className="suggestions-wrapper">
          <Input
            label="Food"
            type="text"
            size="large"
            value={food}
            handleChange={(e) => setFood(e.target.value)}
            handleFocus={() => setShowSuggestions(true)}
            // handleBlur={() => setShowSuggestions(false)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <Suggestions
              handleSelect={handleSelect}
              suggestions={suggestions}
            />
          )}
        </div>
        <Input
          label="Calories"
          type="number"
          value={calories}
          handleChange={(e) => setCalories(e.target.value)}
        />
        <Input
          label="Date"
          type="datetime-local"
          value={date}
          handleChange={(e) => setDate(e.target.value)}
        />
      </form>
      <div className="popup-buttons">
        <Button variant="secondary" label="Cancel" handleClick={onCancel} />
        <Button
          label={confirm}
          disabled={food === "" || calories === "" || date === ""}
          handleClick={() =>
            onConfirm({
              _id: foodId,
              name: food,
              calories,
              date,
              user: { _id: user.role !== "admin" ? user._id : manageUserId },
            })
          }
        />
      </div>
    </div>
  );
};

export default FoodForm;
