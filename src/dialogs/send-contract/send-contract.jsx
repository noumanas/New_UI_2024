import React from 'react';
import classess from "./style.module.scss";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

const SendContractDialog = ({ onClose, open,setIsEmail ,IsEmail, convertHtmlToDoc}) => { 
    const handleCancel = () => {
        onClose(false);
    };

    const send = () => {
        onClose(false);
       convertHtmlToDoc();
    };

    return (
        <Dialog
            sx={{
                '& .MuiDialog-paper': {
                    width: '80%', 
                    maxHeight: 435, 
                    color: "#d0d0d0"
                }
            }}
            maxWidth="xs"
            open={open}
            className={classess.dialog}
        >
            <DialogTitle className={classess.dialog__title} style={{color: "black"}} >Send Contract</DialogTitle>
            <DialogContent dividers className={classess.dialog__content}>
                
                <TextField type="email" id="outlined-basic" style={{width: "100%"}} onChange = {(e)=>{setIsEmail(e.target.value)}} label="Email" variant="outlined" required/> 
           
            </DialogContent>
            <DialogActions className={classess.dialog__actions}>
                <Button autoFocus onClick={handleCancel} className={classess.dialog__actions__noButton}>
                    Cancel
                </Button>
                <Button onClick={send} disabled={IsEmail == "" ? true : false} className={classess.dialog__actions__yesButton}>Send</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SendContractDialog;