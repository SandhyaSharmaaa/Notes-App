import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NoteProvider } from "@/context/NotesContext";
// import { AuthProvider } from "./context/Auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <NoteProvider>
      <App />
    </NoteProvider>
    {/* </AuthProvider> */}
  </React.StrictMode>
);
