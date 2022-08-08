import React, { useContext, useEffect, useState } from "react";
import { Food } from "../../@types/food";
import AppContext from "../../context";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import FoodForm from "../FoodForm/FoodForm";
import Modal from "../Modal/Modal";
import "./FoodEntries.css";

export interface FoodEntriesProps {
  entries: Array<Food>;
}

interface UserGroup {
  user: string | undefined;
  entries: Array<Food>;
}

const ManageFoodEntries: React.FC<FoodEntriesProps> = ({ entries }) => {
  const { handleAddFood, handleEditFood, handleDeleteFood } =
    useContext(AppContext);
  const [manageAction, setManageAction] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [manageUserId, setManageUserId] = useState("");
  const [foodId, setFoodId] = useState("");
  const [entry, setEntry] = useState({
    foodValue: "",
    caloriesValue: "",
    dateValue: "",
  });
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

  const handleManageFood = (body: Food) => {
    if (manageAction === "add") {
      handleAddFood(body, manageUserId);
    } else {
      handleEditFood(body, manageUserId);
    }
    setManageAction("");
  };

  const onDeleteFood = (entryId: string) => {
    handleDeleteFood(entryId);
    setDeleteId("");
  };

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userGroups.map((group, index) => (
              <React.Fragment key={index}>
                {group.entries.map((entry, index) => (
                  <tr key={entry._id}>
                    <td className="user-row">
                      {index === 0 ? group.user : ""}
                    </td>
                    <td className="food-row">{entry.name}</td>
                    <td>{entry.calories}</td>
                    <td>
                      {new Date(entry.date).toLocaleString().slice(0, -3)}
                    </td>
                    <td className="actions-row">
                      <span
                        onClick={() => {
                          setManageUserId(entry.user?._id as string);
                          setManageAction("add");
                        }}
                      >
                        Add
                      </span>
                      <span
                        className="actions-edit"
                        onClick={() => {
                          setEntry({
                            foodValue: entry.name,
                            caloriesValue: entry.calories,
                            dateValue: new Date(entry.date).toString(),
                          });
                          setFoodId(entry?._id as string);
                          setManageUserId(entry.user?._id as string);
                          setManageAction("edit");
                        }}
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => setDeleteId(entry._id as string)}
                        className="actions-delete"
                      >
                        Delete
                      </span>
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
      {manageAction && (
        <Modal>
          <FoodForm
            title={`${manageAction === "add" ? "New" : "Edit"} food entry`}
            confirm={`${manageAction === "add" ? "Add food" : "Save changes"}`}
            onConfirm={handleManageFood}
            onCancel={() => setManageAction("")}
            manageUserId={manageUserId}
            foodId={foodId}
            foodValue={manageAction === "edit" ? entry.foodValue : ""}
            caloriesValue={manageAction === "edit" ? entry.caloriesValue : ""}
            dateValue={
              manageAction === "edit"
                ? new Date(entry.dateValue).toISOString().slice(0, 16)
                : new Date().toISOString().slice(0, 16)
            }
          />
        </Modal>
      )}
      {deleteId && (
        <ConfirmModal
          setDeleteId={setDeleteId}
          onDeleteFood={onDeleteFood}
          deleteId={deleteId}
        />
      )}
    </div>
  );
};

export default ManageFoodEntries;
