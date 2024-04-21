import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Screens/Login/Login";
import Signup from "../Screens/SignUp/Signup";
import Lab from "../Screens/Lab";
import ProtectedRoutes from "./ProtectedRoutes";
import ForgotPassword from "../Screens/ForgotPassword/ForgotPassword";
import AuthPrivateRoutes from "./AuthPrivateRoutes";

const HomeRoutes = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login" element={<AuthPrivateRoutes Component={Login} />} />
        <Route path="/signup" element={<AuthPrivateRoutes Component={Signup} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/pdfdocument" element={<PdfDocument />} /> */}
        <Route path="/lab" element={<Lab />} />
      </Routes>
    </div>
  );
};

export default HomeRoutes;
