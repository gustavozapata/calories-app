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
}

const FoodForm: React.FC<FoodFormProps> = ({
  title,
  confirm,
  onConfirm,
  onCancel,
}) => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
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
          type="date"
          value={date}
          handleChange={(e) => setDate(e.target.value)}
        />
      </form>
      <div className="popup-buttons">
        <Button variant="cancel" label="Cancel" handleClick={onCancel} />
        <Button
          label={confirm}
          handleClick={() =>
            onConfirm({ name: food, calories, date, user: user._id })
          }
        />
      </div>
    </div>
  );
};

export default FoodForm;
