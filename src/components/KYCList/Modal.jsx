import React from "react";
import classess from "./style.module.scss";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";

const CustomModal = ({ onClose, open, track }) => {
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
      maxWidth="xs"
      open={open}
      className={classess.dialog}
    >
      <DialogTitle className={classess.dialog__title}>Delete Track</DialogTitle>
      <DialogContent dividers className={classess.dialog__content}>
        <DialogContentText
          className={classess.dialog__content__text}
          id="alert-dialog-description"
        >
          This is to confirm you that, you want to delete the track named{" "}
          <b>{track.title}.</b> Are you sure you want to delete this track?
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

export default CustomModal;

// import React, { useState } from "react";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import classess from "./style.module.scss";
// const CustomModal = ({ showCustomModal, closeCustomModal, heading, text }) => {
//   const newStyle = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     height: "199px",
//     bgcolor: "#222C41",
//     borderRadius: "12px",
//     boxShadow: 24,

//     // p: 4,
//   };

//   return (
//     <Modal
//       open={showCustomModal}
//       onClose={closeCustomModal}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={newStyle} className={classess.modalCss}>
//         <Box className={classess.modalCss__heading}>Genres: </Box>
//         <Box sx={{ pt: 3, pl: 3, pr: 3, pb: 1 }}>asd</Box>
//         <Box sx={{ display: "flex", justifyContent: "center" }}>
//           <Button
//             className={classess.modalCss__button}
//             onClick={closeCustomModal}
//           >
//             Close
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default CustomModal;
