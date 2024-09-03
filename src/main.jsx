import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NoteProvider } from "@/context/NotesContext";
import { AuthProvider } from "./context/Auth";
import { ThemeProvider } from "@mui/material";
import { theme } from "./mui/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
