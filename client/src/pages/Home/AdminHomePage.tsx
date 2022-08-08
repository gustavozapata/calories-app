import React, { useContext } from "react";
import ManageFoodEntries from "../../components/FoodEntries/ManageFoodEntries";
import AppContext from "../../context";

const AdminHomePage: React.FC = () => {
  const { foodEntries } = useContext(AppContext);

  return (
    <div>
      <ManageFoodEntries entries={foodEntries} />
    </div>
  );
};

export default AdminHomePage;
