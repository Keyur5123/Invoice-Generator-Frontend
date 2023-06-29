import React from "react";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import Constants from "../Utilities/Constants/responseConstants"

function SnackbarCompo({ snackbar, setSnackbar }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, status: false });
    };
    
    return (
        <div>
            <Snackbar open={snackbar.status} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={handleClose}>
                <Alert className='snkacbar' onClose={handleClose} severity={snackbar.severity ? snackbar.severity : Constants.INFO} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SnackbarCompo;