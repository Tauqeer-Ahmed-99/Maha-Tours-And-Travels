import React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";

const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        overflow: "auto",
        maxWidth: "calc(100vw - 3.2rem)",
      }}
    >
      <Sheet sx={{ minWidth: "870px" }}>{children}</Sheet>
    </Box>
  );
};

export default TableWrapper;
