import { useContext } from "react";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import DialogActions from "@mui/joy/DialogActions";
import DialogContent from "@mui/joy/DialogContent";
import DialogTitle from "@mui/joy/DialogTitle";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import AuthContext from "../context/auth/AuthContext";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

const Dialog = () => {
  const authContext = useContext(AuthContext);

  return (
    <Modal open={authContext.isError || authContext.isLoading}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          {authContext.isLoading ? (
            <InfoOutlined />
          ) : authContext.isError ? (
            <WarningRoundedIcon />
          ) : (
            <></>
          )}
          {authContext.isLoading
            ? "Loading"
            : authContext.isError
            ? "Error"
            : "Dialog"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box display="flex" alignItems="center">
            {authContext.isLoading && <CircularProgress sx={{ mr: "1rem" }} />}
            <Typography>
              {authContext.isError
                ? authContext.errorMessage
                : authContext.message}
            </Typography>
          </Box>
        </DialogContent>
        {authContext.isError && (
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={authContext.clearError}
            >
              Close
            </Button>
          </DialogActions>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default Dialog;
