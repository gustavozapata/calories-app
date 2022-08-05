import React, { useContext } from "react";
import AppContext from "../../context";

const AdminHomePage: React.FC = () => {
  const { user } = useContext(AppContext);
  console.log("user", user);

  return (
    <div>
      <p>Add a food entry</p>
    </div>
  );
};

export default AdminHomePage;
