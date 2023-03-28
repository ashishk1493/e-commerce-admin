import { Box, Button, Grid, TableCell, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import * as yup from 'yup';
import FormikCommanNew from '../../../comman/FormikCommanNew';
import { TableContainer, Table, TableHead, TableRow, TableBody } from '@mui/material';
import {} from '@mui/material';
import {} from '@mui/material';
import {} from '@mui/material';
import {} from '@mui/material';
import { Paper } from '@mui/material';

const style = {
  position: 'absolute',
  borderRadius: '10px',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  boxShadow: 15,
  p: 4,
};
const modelStyle = {
  opacity: 0.3,
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Total Messages:',0),
  createData('Total Clicked:',0)
];

const MissedCallWebhookModel = (props) => {
  const { open, handleClose, user } = props;
  const [urlEndpoint, setUrlEndpoint] = useState("")

 const handleTracking = () => {
    console.log('call traking')
    // handleClose()
 }
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
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h5">Form Stats</Typography>
              <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                <Button color="inherit" variant="text" onClick={handleClose}>
                  <CloseIcon />
                </Button>
              </Stack>
            </div>
          </Stack>
           <Grid container 
            style={{
                padding:"15px 0"
            }}
           >
                <Grid xs={12} md={12}>
                    Set up your webhook endpoint to receive live report from Bulksmsplans.

                </Grid>
                <Grid xs={12} md={12}>
                <FormikCommanNew
                    schema={{
                        urlEndpoint:yup.string("Please enter Url Endpoint").required("This field is required.")
                    }}
                    initialValuesProps={{
                        urlEndpoint:""
                    }}
                    onSubmitProps={values => {
                        console.log("value", values);
                    }}
                    Ch={AddUrlEndpoint}
                />
                </Grid>
            </Grid>
        </Box>
      </Modal>
    </div>
  );
};
export default MissedCallWebhookModel;


let AddUrlEndpoint = (props) => {
    const { formik } = props
    const isSubmitting = false
    console.log(formik.values.urlEndpoint,'formik.values.urlEndpoint');
    return(
        <form
            style={{
                padding:"15px 0"
            }}
            onSubmit={formik.handleSubmit}
        >
        <Grid container spacing={2}
              style={{
                  marginBottom:'20px',
                  alignItems:"center",
                  padding:"15px 0"
              }}
        >
            <Grid item xs={12}>
                <TextField
                    type={"text"}
                    fullWidth
                    name="urlEndpoint"
                    label="Endpoint URL"
                    value={formik.values.urlEndpoint}
                    onChange={(e) => {
                        formik.setFieldValue("urlEndpoint", e.target.value)
                    }}
                    error={formik.touched.urlEndpoint && Boolean(formik.errors.urlEndpoint)}
                    helperText={formik.touched.urlEndpoint && formik.errors.urlEndpoint}
                />
            </Grid>
            
        </Grid>
        <Grid container style={{justifyContent:"end"}}>
              <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                <Button color="inherit" variant="outlined" >
                    Close
                </Button>
                <Button type="submit" variant="contained" >
                    Add Endpoint
                </Button>
              </Stack>
            </Grid>
        </form>
    )
}
