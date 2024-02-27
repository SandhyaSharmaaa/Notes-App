import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Create from "@/pages/Create";
import Edit from "@/pages/Edit";
import Open from "@/pages/Open";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import PageNotFound from "@/pages/PageNotFound";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import PublicRoutes from "@/routes/PublicRoutes";
import { AuthProvider } from "@/context/Auth";

import "./index.css";
import "tailwindcss/tailwind.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:noteId" element={<Edit />} />
            <Route path="/open/:noteId" element={<Open />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
