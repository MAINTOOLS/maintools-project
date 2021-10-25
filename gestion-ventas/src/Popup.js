import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Table,DropdownButton,Dropdown,Form, Row,Col} from "react-bootstrap"

export default function Popup(props){
    const {title, children, openPopup, setOpenPopup} = props;
    return(
        <Dialog open = {openPopup}  maxWidth="md" >
            <DialogTitle Class="d-flex flex-row-reverse bd-highlight">
            
            <Form >
            <Col >
            <Button  xs="auto" variant="contained" onClick ={()=>{setOpenPopup(false)}}>X</Button>
            </Col>
            </Form>
           
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>

        </Dialog>
    )

}
