import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function Popup(props){
    const {title, children, openPopup, setOpenPopup} = props;
    return(
        <Dialog open = {openPopup} >
            <DialogTitle>
            <div style = {{flexGrow:1}}>Edite la venta
            <Button variant="contained" onClick ={()=>{setOpenPopup(false)}}>X</Button>
            </div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>

        </Dialog>
    )

}
