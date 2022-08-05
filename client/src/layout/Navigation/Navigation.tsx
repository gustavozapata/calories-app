import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AppContext from "../../context";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const { handleLogout } = useContext(AppContext);

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
        </ul>
      </nav>
      <p className="logout" onClick={() => handleLogout()}>
        Logout
      </p>
    </div>
  );
};

export default Navigation;
