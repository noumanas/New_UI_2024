import React,{useEffect} from 'react';
import classess from "./style.module.scss";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from "axios";
import { config as URLconfig } from "../../enviorment/enviorment";
import { useDispatch, useSelector } from "react-redux";
import { getItemToLocalStorage } from "../../services/storage";
import { toast } from "react-toastify";
const ArtistUpdateDialog = ({ onClose, open }) => {
    const artist = useSelector((state) => state.artist.artist);
    const user = useSelector((state) => state.auth.user);
    const storedToken = getItemToLocalStorage("accessToken");
    const [loading, setLoading] = React.useState(false);
    

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = () => {
        onClose(true);

    };
    
    // const UpdatesTrackInfo = () =>{
    //     setLoading(true)
    //     const payload ={
    //         spotify_id: artist?.spotify_id,
    //         user:user,
    //     }
    //     console.log('artist?.spotify_id',artist?.spotify_id);
    //     axios.post(`${URLconfig.BASE_URL}/artists/artistupdate/`,payload,{
    //         headers: {
    //             Authorization: `Bearer ${storedToken}`,
    //           },
    //         })
    //     .then((res) => {
    //      console.log('res',res)
    //      toast.success(res.data.data)
    //      setLoading(false);
    //      onClose(false);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  
    return (
        <Dialog
            sx={{
                '& .MuiDialog-paper': {
                    width: '80%', 
                    maxHeight: 435,
                    bgcolor: "#2F3443",
                    color: "#d0d0d0"
                }
            }}
            maxWidth="xs"
            open={open}
            className={classess.dialog}
        >
            <DialogTitle className={classess.dialog__title}>Do you want to updates</DialogTitle>
            <DialogContent dividers className={classess.dialog__content}>
                <DialogContentText className={classess.dialog__content__text} id="alert-dialog-description">
                    There are two types of updations.
                    
                </DialogContentText>
                {/* <LoadingButton autoFocus onClick={UpdatesTrackInfo} 
                    sx={{marginTop:'10px'}} 
                    className={classess.dialog__actions__updates}
                    loading={loading}
                    disabled={loading}
                    >
                        Tracks Streams Updates
                    </LoadingButton>
                    <LoadingButton sx={{marginTop:'10px'}} 
                        autoFocus onClick={UpdateArtistStatAndChartmetrics} 
                        className={classess.dialog__actions__updates}
                        loading={loading}
                        disabled={loading}
                        >
                        Artist Info Updates
                    </LoadingButton> */}
            </DialogContent>
            <DialogActions className={classess.dialog__actions}>
                <Button onClick={handleOk} className={classess.dialog__actions__yesButton}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ArtistUpdateDialog;