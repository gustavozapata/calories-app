import React, { useContext, useEffect, useState } from "react";
import { Food, NutritionixFood } from "../../@types/food";
import AppContext from "../../context";
import { nutritionix_url } from "../../services";
import { axiosNutritionix } from "../../services";
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

const ITEMS_TO_SHOW = 3;

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
  const [suggestions, setSuggestions] = useState<any>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (food !== "") {
      handleApiGetFood(food);
    }
  }, [food]);

  const handleApiGetFood = async (query: string) => {
    const foodItems = await axiosNutritionix.get(
      `${nutritionix_url}/search/instant?query=${query}`
    );
    setSuggestions([
      ...foodItems.data.common.slice(0, ITEMS_TO_SHOW),
      ...foodItems.data.branded.slice(0, ITEMS_TO_SHOW),
    ]);
  };

  const getFoodCalories = async (foodName: string) => {
    const foodCalories = await axiosNutritionix.post(
      `${nutritionix_url}/natural/nutrients?query=${foodName}`,
      { query: foodName }
    );
    console.log(foodCalories.data);
    setCalories(foodCalories.data.foods[0].nf_calories);
  };

  const handleSelect = (item: NutritionixFood) => {
    setFood(item.food_name);
    if (item.nf_calories) {
      setCalories(item.nf_calories.toFixed(2).replace(/\.00$/, "").toString());
    } else {
      getFoodCalories(item.food_name);
    }
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
            msg={
              suggestions.length < 1 && food !== ""
                ? "Food not found, please enter manually"
                : ""
            }
            value={food}
            handleChange={(e) => setFood(e.target.value)}
            handleFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <Suggestions
              handleSelect={handleSelect}
              setShowSuggestions={setShowSuggestions}
              suggestions={suggestions}
              itemsToShow={ITEMS_TO_SHOW}
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
