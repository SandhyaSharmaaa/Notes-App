import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Open from "./pages/Open";

import "./index.css";
import "tailwindcss/tailwind.css";
// import ProtectedRoutes from "./routes/ProtectedRoutes";
// import PublicRoutes from "./routes/PublicRoutes";
import { AuthProvider } from "./context/Auth";
// import Home from "./pages/Home";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:noteId" element={<Edit />} />
      <Route path="/open/:noteId" element={<Open />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
