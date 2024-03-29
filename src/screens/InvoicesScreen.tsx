import { Box, Button, Typography } from "@mui/joy";
import InvoiceTabel from "@src/components/InvoiceTable";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes/routes";

const InvoicesScreen = () => {
  const navigate = useNavigate();

  const onNewInvoiceClick = () => {
    const route = (Routes.InvoiceDetailsScreen as string).replace(
      ":invoiceId",
      "new",
    );
    navigate(route);
  };

  return (
    <Box>
      <Box
        marginBottom={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography level="title-lg">All Invoices</Typography>
        <Button
          startDecorator={<NoteAddRoundedIcon />}
          onClick={onNewInvoiceClick}
        >
          New Invoice
        </Button>
      </Box>

      <Box>
        <InvoiceTabel />
      </Box>
    </Box>
  );
};

export default InvoicesScreen;
