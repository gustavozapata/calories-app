import React, { useContext } from "react";
import AppContext from "../../context";

const UserHomePage: React.FC = () => {
  const { user } = useContext(AppContext);

  return (
    <div>
      <h2>User</h2>
      <p>Welcome home {user.name}</p>
    </div>
  );
};

export default UserHomePage;
