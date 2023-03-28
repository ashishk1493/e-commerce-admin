    import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import {LoadingButton} from "@mui/lab";
import React from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import * as yup from "yup";
import FormikCommanNew from "../../../comman/FormikCommanNew";

const style = {
    position: 'absolute',
    borderRadius: "10px",
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const modelStyle = {
    opacity: 0.3
};
const ViewInvoiceModel = (props)=> {
    const { open, handleClose,user } = props;
    return (
        <div style={modelStyle}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                  <Box sx={style}>
                    <Stack spacing={3}>
                        <div style={{
                            display:"flex",
                            alignItems:"baseline",
                            justifyContent:"space-between"
                        }}>

                        <Typography variant="h5">Subscription Details</Typography>
                        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                            <Button color="inherit" variant="text" onClick={handleClose}>
                                <CloseIcon/>
                            </Button>
                        </Stack>
                        </div>
                        <Grid container spacing={2}
                              style={{
                                  marginBottom:'20px',
                                  padding:"25px 10px",
                                  alignItems:"center",
                                  display:"flex",
                                  justifyContent:"space-between",
                                  background:"#fff",
                                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
                              }}
                        >
                            <Grid item xs={6} md={6}>
                                <Typography variant="body1" sx={{pb:1}}><b>Gold</b></Typography>
                                <Typography variant="caption">HSN SAC:<b> 0</b></Typography>
                                <br/>
                                <Typography variant="caption">SMS Credit:<b>1400</b></Typography>
                                <br/>
                                <Typography variant="caption">Validity:<b>Six Month</b></Typography>
                            </Grid>
                            <Grid item xs={6} md={6}
                                style={{
                                    textAlign:"end",
                                    paddingRight:"15px",

                                }}
                            >
                                <Typography variant="body1" sx={{pb:1}}><b>1652 INR</b></Typography>
                                <Typography variant="caption">Rate:<b> 1400.00 INR</b></Typography>
                                <br/>
                                <Typography variant="caption">GST: (18%):<b> {((1400*18)/100)} INR</b></Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                        <Grid item xs={3}>
                            <div>
                               <Typography variant="h6" style={{textAlign:"center",display:"block"}}><b>1652 INR</b></Typography>
                               <Typography variant="caption" style={{textAlign:"center",display:"block"}}>Sub Total</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div>
                               <Typography variant="h6" style={{textAlign:"center",display:"block"}}><b>1652 INR</b></Typography>
                               <Typography variant="caption" style={{textAlign:"center",display:"block"}}>Grand Total</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div>
                               <Typography variant="h6" style={{textAlign:"center",display:"block"}}><b>0</b></Typography>
                               <Typography variant="caption" style={{textAlign:"center",display:"block"}}>Balance Due</Typography>
                            </div>
                        </Grid>
                       
                        </Grid>

                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}
export default ViewInvoiceModel;
