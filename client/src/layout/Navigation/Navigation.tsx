import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AppContext from "../../context";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const { user, handleLogout } = useContext(AppContext);

  return (
    <div className="Navigation">
      <p className="logo">
        <Link to="/">TopCal</Link>
      </p>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {user.role === "admin" && (
            <li>
              <NavLink to="/report">Report</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <div className="nav-account">
        <span className="account-name">
          {user.name} | {user.role}
        </span>
        <span className="logout" onClick={() => handleLogout()}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default Navigation;
