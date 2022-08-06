import React, { useContext } from "react";
import AdminHomePage from "./AdminHomePage";
import UserHomePage from "./UserHomePage";
import AppContext from "../../context";
import "./Home.css";

const Home: React.FC = () => {
  const { user } = useContext(AppContext);

  return (
    <div>
      <h1>Food entries</h1>
      <div>{user.role === "admin" ? <AdminHomePage /> : <UserHomePage />}</div>
    </div>
  );
};

export default Home;
