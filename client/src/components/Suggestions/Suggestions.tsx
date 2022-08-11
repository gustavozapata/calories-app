import React from "react";
import { NutritionixFood } from "../../@types/food";
import Circle from "../Icons/Circle";
import "./Suggestions.css";

interface SuggestionsProps {
  suggestions: Array<NutritionixFood>;
  handleSelect: (item: NutritionixFood) => void;
  itemsToShow: number;
  setShowSuggestions: (showSuggestions: boolean) => void;
}

const Suggestions: React.FC<SuggestionsProps> = ({
  suggestions,
  handleSelect,
  itemsToShow,
  setShowSuggestions,
}) => {
  return (
    <div className="Suggestions">
      <ul>
        <span className="list-subtitle">
          <span>Common foods</span>
          <Circle handleClick={() => setShowSuggestions(false)} />
        </span>
        {suggestions.map((suggestion, index) => (
          <React.Fragment key={suggestion.food_name}>
            {index === itemsToShow && (
              <span className="list-subtitle branded">
                <span>Branded foods</span>
                <span>Calories</span>
              </span>
            )}
            <li onClick={() => handleSelect(suggestion)}>
              <span>{suggestion.food_name}</span>
              {suggestion.nf_calories && (
                <span className="suggestions-calories">
                  {suggestion.nf_calories.toFixed(2).replace(/\.00$/, "")}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
