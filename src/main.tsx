import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AuthProvider from "./context/auth/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
          <App />
        </CssVarsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
