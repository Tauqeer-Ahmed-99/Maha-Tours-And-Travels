import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AuthProvider from "./context/auth/AuthProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import InvoicesProvider from "./context/invoices/InvoicesProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
        <CssBaseline />
        <AuthProvider>
          <InvoicesProvider>
            <App />
          </InvoicesProvider>
        </AuthProvider>
      </CssVarsProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
