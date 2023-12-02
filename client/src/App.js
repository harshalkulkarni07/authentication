import React from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cards from "./pages/Cards";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/FogotPassword";
import ResetPassword from "./pages/ResetPassword";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route exact path="/" element={<Cards />} />
      </Routes>
    </BrowserRouter>
  );
}
