import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../../context";
import Navigation from "../Navigation/Navigation";
import "./PrivateLayout.css";

const PrivateLayout: React.FC = () => {
  const { isLoggedIn, loadInitialData } = useContext(AppContext);

  useEffect(() => {
    if (isLoggedIn) {
      loadInitialData();
    }
  }, [isLoggedIn]);

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
