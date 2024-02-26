import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "@/context/auth";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Open from "../pages/Open";
import Create from "../pages/Create";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:noteId" element={<Edit />} />
      <Route path="/open/:noteId" element={<Open />} />
    </Routes>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
