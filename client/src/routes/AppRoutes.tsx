import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateLayout from "../layout/PrivateLayout/PrivateLayout";
import ProtectLayout from "../layout/ProtectLayout/ProtectLayout";
import PublicLayout from "../layout/PublicLayout/PublicLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Report from "../pages/Report/Report";
import Signup from "../pages/Signup/Signup";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectLayout />}>
            <Route path="/report" element={<Report />} />
          </Route>
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
