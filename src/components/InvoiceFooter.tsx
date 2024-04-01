import { useContext, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes/routes";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import InvoicesContext from "@src/context/invoices/InvoicesContext";
import { ResponseStatus } from "@src/utilities/types";
import LoadingDialog from "./LoadingDialog";

const InvoiceFooter = ({
  invoiceId,
  onSaveInvoice,
}: {
  invoiceId?: string;
  onSaveInvoice: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const invoicesContext = useContext(InvoicesContext);

  const handlePreviewInvoice = () => {
    const url = Routes.InvoicePreviewScreen.replace(
      ":invoiceId",
      invoiceId as string,
    );

    navigate(url);
  };

  const handleDeleteInvoice = () => {
    setOpen(true);
  };

  const confirmDeleteInvoice = async () => {
    setOpen(false);
    setIsDeleting(true);

    const res = await invoicesContext.deleteInvoice(invoiceId as string);

    setIsDeleting(false);

    if (res.status === ResponseStatus.SUCCESS) {
      navigate(Routes.InvoicesScreen, { replace: true });
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end" my={2}>
      <Button
        onClick={handleDeleteInvoice}
        startDecorator={<DeleteOutlineRoundedIcon />}
        sx={{ mr: 2 }}
        color="danger"
        variant="outlined"
      >
        Delete Invoice
      </Button>
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
      <Modal open={open}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            <Typography>Delete Invoice?</Typography>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Box display="flex" alignItems="center">
              <Typography>
                Are you sure? you want to delete this invoice?
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="primary"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={confirmDeleteInvoice}
            >
              Yes
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
      <LoadingDialog open={isDeleting} loadingMessage="Deleting invoice..." />
    </Box>
  );
};

export default InvoiceFooter;
