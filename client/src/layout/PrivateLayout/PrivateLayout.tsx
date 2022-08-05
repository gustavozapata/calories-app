import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../../context";
import Navigation from "../Navigation/Navigation";
import "./PrivateLayout.css";

const PrivateLayout: React.FC = () => {
  const { isLoggedIn } = useContext(AppContext);

  return isLoggedIn ? (
    <div className="PrivateLayout">
      <Navigation />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateLayout;
