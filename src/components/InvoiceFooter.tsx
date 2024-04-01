import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes/routes";

const InvoiceFooter = ({
  invoiceId,
  onSaveInvoice,
}: {
  invoiceId?: string;
  onSaveInvoice: () => void;
}) => {
  const navigate = useNavigate();

  const handlePreviewInvoice = () => {
    const url = Routes.InvoicePreviewScreen.replace(
      ":invoiceId",
      invoiceId as string,
    );

    navigate(url);
  };

  return (
    <Box display="flex" justifyContent="flex-end" my={2}>
      <Button
        onClick={handlePreviewInvoice}
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
