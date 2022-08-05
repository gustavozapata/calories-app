import React, { useContext } from "react";
import AppContext from "../../context";

const AdminHomePage: React.FC = () => {
  const { user } = useContext(AppContext);

  return (
    <div>
      <h2>Admin</h2>
      <p>Welcome home {user.name}</p>
    </div>
  );
};

export default AdminHomePage;
