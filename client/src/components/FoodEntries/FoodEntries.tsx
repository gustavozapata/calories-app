import React from "react";
import { Food } from "../../@types/food";

export interface FoodEntriesProps {
  entries: Array<Food>;
}

const FoodEntries: React.FC<FoodEntriesProps> = ({ entries }) => {
  return (
    <div>
      {entries.length > 0 ? (
        entries.map((entry) => (
          <div key={entry.id}>
            <p>{entry.name}</p>
            <p>{entry.calories}</p>
          </div>
        ))
      ) : (
        <p>No food entries found</p>
      )}
    </div>
  );
};

export default FoodEntries;
