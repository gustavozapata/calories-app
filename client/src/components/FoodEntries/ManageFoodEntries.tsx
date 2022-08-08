import React, { useEffect, useState } from "react";
import { Food } from "../../@types/food";
import Loading from "../Loading/Loading";
import "./FoodEntries.css";

export interface FoodEntriesProps {
  entries: Array<Food>;
}

interface UserGroup {
  user: string | undefined;
  entries: Array<Food>;
}

const FoodEntries: React.FC<FoodEntriesProps> = ({ entries }) => {
  const [userGroups, setUserGroups] = useState<Array<UserGroup>>([]);

  useEffect(() => {
    const parseFoodEntries = () => {
      const groups: UserGroup[] = [];
      entries.forEach((entry) => {
        if (!groups.find((group) => group.user === entry.user?.name)) {
          groups.push({
            user: entry.user?.name,
            entries: [entry],
          });
        } else {
          groups
            .find((group) => group.user === entry.user?.name)
            ?.entries.push(entry);
        }
      });
      return groups;
    };
    setUserGroups(parseFoodEntries());
  }, [entries]);

  return (
    <div className="FoodEntries">
      {entries.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Food</th>
              <th>Calories</th>
              <th>Date and time</th>
            </tr>
          </thead>
          <tbody>
            {userGroups.map((group) => (
              <React.Fragment key={group.user}>
                {group.entries.map((entry, index) => (
                  <tr key={entry._id}>
                    <td className="user-row">
                      {index === 0 ? group.user : ""}
                    </td>
                    <td>{entry.name}</td>
                    <td>{entry.calories}</td>
                    <td>
                      {new Date(entry.date).toLocaleString().slice(0, -3)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
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
