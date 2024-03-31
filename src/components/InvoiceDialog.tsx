import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
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
            {isConfirmationOpen ? "Remove Customer?" : "Remove Payment?"}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box display="flex" alignItems="center">
            <Typography>
              {`Are you sure? you want to remove this ${
                isConfirmationOpen ? "customer" : "payment"
              }?`}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="warning"
            onClick={
              isConfirmationOpen
                ? onRemoveCustomerConfirm
                : onRemovePaymentConfirm
            }
          >
            Yes
          </Button>
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
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default InvoiceDialog;
