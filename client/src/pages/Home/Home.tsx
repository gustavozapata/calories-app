import React from "react";
import AdminHomePage from "./AdminHomePage";
import UserHomePage from "./UserHomePage";
import { useContext } from "react";
import AppContext from "../../context";

const Home: React.FC = () => {
  const { user } = useContext(AppContext);

  return (
    <div>
      <h1>Home</h1>
      <div>{user.role === "admin" ? <AdminHomePage /> : <UserHomePage />}</div>
    </div>
  );
};

export default Home;
