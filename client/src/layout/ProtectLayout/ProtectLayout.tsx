import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AppContext from "../../context";

const ProtectLayout: React.FC = () => {
  const { user } = useContext(AppContext);

  return user.role === "admin" ? (
    <div className="ProtectLayout">
      <Outlet />
    </div>
  ) : (
    <p>You need to login as an administrator to access this page</p>
  );
};

export default ProtectLayout;
