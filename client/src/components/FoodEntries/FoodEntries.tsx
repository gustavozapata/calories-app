import React, { useContext } from "react";
import { Food } from "../../@types/food";
import AppContext from "../../context";
import { groupEntriesByDay, renderDate } from "../../utils";
import "./FoodEntries.css";

export interface FoodEntriesProps {
  entries: Array<Food>;
}

interface FoodEntriesByDay extends Food {
  overCalorieLimit: string;
}

const FoodEntries: React.FC<FoodEntriesProps> = ({ entries }) => {
  const { filteredEntries, filterApplied, user } = useContext(AppContext);

  const renderEntries = () => {
    let entriesRender = [];
    if (filterApplied) {
      entriesRender = groupEntriesByDay(filteredEntries);
    } else {
      entriesRender = groupEntriesByDay(entries);
    }
    let parsedEntries = parseEntries(entriesRender);
    parsedEntries = [].concat.apply([], parsedEntries);

    return parsedEntries.map((entry) => renderRows(entry));
  };

  const parseEntries = (entriesByDay: any) => {
    const parsedValues = Object.keys(entriesByDay).map((entry: string) => {
      if (calculateCalorieLimit(entriesByDay[entry]) > user.calorieLimit) {
        entriesByDay[entry].forEach((ent: FoodEntriesByDay, index: number) => {
          if (index === 0) {
            ent.overCalorieLimit = "Yes";
          } else {
            ent.overCalorieLimit = "";
          }
        });
      } else {
        entriesByDay[entry].forEach((ent: FoodEntriesByDay, index: number) => {
          if (index === 0) {
            ent.overCalorieLimit = "No";
          } else {
            ent.overCalorieLimit = "";
          }
        });
      }
      return entriesByDay[entry];
    });
    return parsedValues;
  };

  const calculateCalorieLimit = (entriesByDay: any) => {
    let totalCalories = 0;
    totalCalories += entriesByDay.reduce((acc: number, entry: Food) => {
      return acc + entry.calories;
    }, 0);
    return totalCalories;
  };

  const renderRows = (entry: FoodEntriesByDay) => (
    <tr key={entry._id}>
      <td>{entry.name}</td>
      <td>{entry.calories}</td>
      <td>{renderDate(entry.date, -3)}</td>
      <td>{entry.overCalorieLimit}</td>
    </tr>
  );

  return (
    <div className="FoodEntries">
      {entries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Food</th>
              <th>Calories</th>
              <th>Date and time</th>
              <th className="th-calorie-limit">Reached calorie limit</th>
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
