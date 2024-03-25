import * as React from "react";
import CssBaseline from "@mui/joy/CssBaseline";

import Layout from "@src/components/AppDrawer/Layout";
import Navigation from "@src/components/AppDrawer/Navigation";
import Header from "@src/components/AppDrawer/Header";
import { Box } from "@mui/joy";

export default function AppBarWithDrawerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: "1fr",
            sm: "minmax(64px, 200px) minmax(450px, 1fr)",
            md: "minmax(160px, 300px) minmax(600px, 1fr)",
          },
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}
      >
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Box padding={2}>{children}</Box>
      </Layout.Root>
    </>
  );
}
