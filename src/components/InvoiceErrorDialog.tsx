import { useContext } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import DialogActions from "@mui/joy/DialogActions";
import DialogContent from "@mui/joy/DialogContent";
import DialogTitle from "@mui/joy/DialogTitle";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import InvoicesContext from "@src/context/invoices/InvoicesContext";

const InvoiceErrorDialog = () => {
  const invoicesContext = useContext(InvoicesContext);

  return (
    <Modal open={invoicesContext.isError}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          Error
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box display="flex" alignItems="center">
            <Typography>{invoicesContext.errorMessage}</Typography>
          </Box>
        </DialogContent>
        {invoicesContext.isError && (
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={invoicesContext.clearErrors}
            >
              Close
            </Button>
          </DialogActions>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default InvoiceErrorDialog;
