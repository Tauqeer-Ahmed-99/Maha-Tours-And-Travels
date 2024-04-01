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

const InvoiceDialog = ({
  isConfirmationOpen,
  isPaymentConfirmationOpen,
  onRemoveCustomerConfirm,
  onRemovePaymentConfirm,
  onRemoveCustomerCancel,
  onRemovePaymentCancel,
}: {
  isConfirmationOpen: boolean;
  isPaymentConfirmationOpen: boolean;
  onRemoveCustomerConfirm: () => void;
  onRemovePaymentConfirm: () => void;
  onRemoveCustomerCancel: () => void;
  onRemovePaymentCancel: () => void;
}) => {
  return (
    <Modal open={isConfirmationOpen || isPaymentConfirmationOpen}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          <Typography>
            {isConfirmationOpen ? "Delete Customer?" : "Delete Payment?"}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box display="flex" alignItems="center">
            <Typography>
              {`Are you sure? you want to delete this ${
                isConfirmationOpen ? "customer" : "payment"
              }?`}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="primary"
            onClick={
              isConfirmationOpen
                ? onRemoveCustomerCancel
                : onRemovePaymentCancel
            }
          >
            No
          </Button>
          <Button
            variant="solid"
            color="danger"
            onClick={
              isConfirmationOpen
                ? onRemoveCustomerConfirm
                : onRemovePaymentConfirm
            }
          >
            Yes
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default InvoiceDialog;
