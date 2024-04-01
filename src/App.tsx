import { Routes, Route, Navigate } from "react-router-dom";
import routes, { Routes as AvailableRoutes } from "@src/routes/routes";

import AppBarWithDrawerProvider from "@src/providers/AppBarWithDrawerProvider";
import "@fontsource/inter";
import InvoiceErrorDialog from "./components/InvoiceErrorDialog";

function App() {
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.path === AvailableRoutes.HomeScreen ? (
                <Navigate to={AvailableRoutes.LoginScreen} />
              ) : route.appBar ? (
                <AppBarWithDrawerProvider>
                  <route.screen />
                </AppBarWithDrawerProvider>
              ) : (
                <route.screen />
              )
            }
          />
        ))}
      </Routes>
      <InvoiceErrorDialog />
    </>
  );
}

export default App;
