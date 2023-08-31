import React from "react";
import classess from "./style.module.scss";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";

const DeleteNewMusicRecordDialog = ({ onClose, open, track }) => {
  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: 435,
          bgcolor: "#222C41",
          borderRadius: "12px",
          // color: "",
        },
      }}
      maxWidth='xs'
      open={open}
      className={classess.dialog}
    >
      <DialogTitle className={classess.dialog__title}>
        Delete New Music Record
      </DialogTitle>
      <DialogContent dividers className={classess.dialog__content}>
        <DialogContentText
          className={classess.dialog__content__text}
          id='alert-dialog-description'
        >
          This is to confirm you that, you want to delete the New Music Record
          from this Artist
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classess.dialog__actions}>
        <Button
          onClick={handleOk}
          className={classess.dialog__actions__yesButton}
        >
          Yes, I approve
        </Button>
        <Button
          autoFocus
          onClick={handleCancel}
          className={classess.dialog__actions__noButton}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteNewMusicRecordDialog;
