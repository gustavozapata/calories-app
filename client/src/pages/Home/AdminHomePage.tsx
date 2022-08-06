import React, { useContext } from "react";
import FoodEntries from "../../components/FoodEntries/FoodEntries";
import AppContext from "../../context";

const AdminHomePage: React.FC = () => {
  const { foodEntries } = useContext(AppContext);

  return (
    <div>
      <FoodEntries entries={foodEntries} />
    </div>
  );
};

export default AdminHomePage;
