import React, { useContext } from "react";
import { Food } from "../../@types/food";
import AppContext from "../../context";
import Loading from "../Loading/Loading";
import "./FoodEntries.css";

export interface FoodEntriesProps {
  entries: Array<Food>;
}

const FoodEntries: React.FC<FoodEntriesProps> = ({ entries }) => {
  const { user } = useContext(AppContext);

  return (
    <div className="FoodEntries">
      {entries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Calories</th>
              <th>Date and time</th>
              {user.role === "admin" && <th>User</th>}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.name}</td>
                <td>{entry.calories}</td>
                <td>{new Date(entry.date).toLocaleString()}</td>
                {user.role === "admin" && <td>{entry.user?.name}</td>}
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
