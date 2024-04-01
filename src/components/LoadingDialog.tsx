import Box from "@mui/joy/Box";
import DialogContent from "@mui/joy/DialogContent";
import DialogTitle from "@mui/joy/DialogTitle";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CircularProgress from "@mui/joy/CircularProgress";

const LoadingDialog = ({
  open,
  loadingMessage,
}: {
  open: boolean;
  onClose?: () => void;
  loadingMessage: string;
}) => {
  return (
    <Modal open={open}>
      <ModalDialog variant="outlined" role="loadingdialog">
        <DialogTitle>
          <InfoOutlined />
          Please Wait...
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box display="flex" alignItems="center">
            <CircularProgress sx={{ mr: 2 }} />
            <Typography>{loadingMessage ?? "Loading..."}</Typography>
          </Box>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default LoadingDialog;
