import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { NoteProvider } from "@/context/NotesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NoteProvider>
      <App />
    </NoteProvider>
  </React.StrictMode>
);
