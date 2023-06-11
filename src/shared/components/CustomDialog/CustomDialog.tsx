import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./CustomDialog.scss";
import { Button } from "@mui/material";

type CustomDialogProps = {
  open: boolean;
  handleCloseAction: (_event: any, _reason: string) => void;
  handleConfirmAction: () => void;
  children: React.ReactNode;
};

const CustomDialog: React.FC<CustomDialogProps> = (props) => {
  const { handleConfirmAction, handleCloseAction, open } = props;

  return (
    <Dialog
      open={open}
      onClose={handleCloseAction}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEscapeKeyDown
      className="customDialog"
    >
      <IconButton
        aria-label="close"
        sx={{ position: "absolute", right: "0", top: "0" }}
        onClick={
          handleCloseAction as React.MouseEventHandler<HTMLButtonElement>
        }
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions sx={{ gap: "15px" }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleConfirmAction}
        >
          Da
        </Button>
        <Button
          color="error"
          onClick={
            handleCloseAction as React.MouseEventHandler<HTMLButtonElement>
          }
          variant="contained"
        >
          Nu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
