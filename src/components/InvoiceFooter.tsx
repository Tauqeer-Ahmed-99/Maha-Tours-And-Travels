import { Box, Button } from "@mui/joy";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";

const InvoiceFooter = ({ onSaveInvoice }: { onSaveInvoice: () => void }) => {
  return (
    <Box display="flex" justifyContent="flex-end" my={2}>
      <Button
        onClick={onSaveInvoice}
        startDecorator={<ReceiptRoundedIcon />}
        sx={{ mr: 2 }}
      >
        Preview Invoice
      </Button>
      <Button onClick={onSaveInvoice} startDecorator={<SaveRoundedIcon />}>
        Save Invoice
      </Button>
    </Box>
  );
};

export default InvoiceFooter;
