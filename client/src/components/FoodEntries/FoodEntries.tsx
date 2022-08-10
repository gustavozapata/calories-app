import React, { useContext } from "react";
import { Food } from "../../@types/food";
import AppContext from "../../context";
import "./FoodEntries.css";

export interface FoodEntriesProps {
  entries: Array<Food>;
}

const FoodEntries: React.FC<FoodEntriesProps> = ({ entries }) => {
  const { filteredEntries, filterApplied } = useContext(AppContext);

  const renderRows = (entry: Food) => (
    <tr key={entry._id}>
      <td>{entry.name}</td>
      <td>{entry.calories}</td>
      <td>{new Date(entry.date).toLocaleString().slice(0, -3)}</td>
    </tr>
  );

  const renderEntries = () => {
    if (filterApplied) {
      return filteredEntries.map((entry: Food) => renderRows(entry));
    }
    return entries.map((entry: Food) => renderRows(entry));
  };

  return (
    <div className="FoodEntries">
      {entries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Food</th>
              <th>Calories</th>
              <th>Date and time</th>
            </tr>
          </thead>
          <tbody>{renderEntries()}</tbody>
        </table>
      ) : (
        <p className="no-entries">No food entries found</p>
      )}
    </div>
  );
};

export default FoodEntries;
