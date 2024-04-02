import React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";

const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        overflow: "auto",
        maxWidth: "calc(100vw - 3.2rem)",
        ml: { xs: 1.25, md: 0 },
      }}
    >
      <Sheet sx={{ minWidth: "870px" }}>{children}</Sheet>
    </Box>
  );
};

export default TableWrapper;
