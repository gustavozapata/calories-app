import React from "react";
import { NutritionixFood } from "../../@types/food";
import "./Suggestions.css";

interface SuggestionsProps {
  suggestions: Array<NutritionixFood>;
  handleSelect: (item: NutritionixFood) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  handleSelect,
}) => {
  return (
    <div className="Suggestions">
      <ul>
        <li>
          <span>Food</span>
          <span>Calories</span>
        </li>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.food_name}
            onClick={() => handleSelect(suggestion)}
          >
            <span>{suggestion.food_name}</span>
            <span className="suggestions-calories">
              {suggestion.nf_calories.toFixed(2).replace(/\.00$/, "")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
