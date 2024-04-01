import React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";

const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ overflowX: "auto", maxWidth: "100%" }}>
      <Sheet sx={{ minWidth: "870px" }}>{children}</Sheet>
    </Box>
  );
};

export default TableWrapper;
