import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Open from "./pages/Open";

import "./index.css";
import "tailwindcss/tailwind.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:noteId" element={<Edit />} />
        <Route path="/open/:noteId" element={<Open />} />
      </Routes>
    </Router>
  );
};

export default App;
