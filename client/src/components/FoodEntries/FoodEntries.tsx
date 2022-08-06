import React, { useContext } from "react";
import { Food } from "../../@types/food";
import AppContext from "../../context";
import "./FoodEntries.css";

export interface FoodEntriesProps {
  entries: Array<Food>;
}

const FoodEntries: React.FC<FoodEntriesProps> = ({ entries }) => {
  const { user } = useContext(AppContext);

  return (
    <div>
      {entries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Calories</th>
              <th>Date</th>
              {user.role === "admin" && <th>User</th>}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.name}</td>
                <td>{entry.calories}</td>
                {user.role === "admin" && <th>{user.name}</th>}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-entries">No food entries found</p>
      )}
    </div>
  );
};

export default FoodEntries;
