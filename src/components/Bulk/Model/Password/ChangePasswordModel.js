import { Box, Button, Grid, TableCell, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import React from 'react';
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
  boxShadow: 24,
  p: 4,
};
const modelStyle = {
  opacity: 0.3,
};

const regExp = /\b\d{10}\b/;

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData('Total Messages:', 0), createData('Total Clicked:', 0)];

const ChangePasswordModel = (props) => {
  const { open, handleClose, user ,handleSubmit} = props;

  const handleTracking = () => {
    console.log('call traking');
    handleClose();
  };

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
              <Typography variant="h5">Change API Password</Typography>
              <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                <Button color="inherit" variant="text" onClick={handleClose}>
                  <CloseIcon />
                </Button>
              </Stack>
            </div>

            <FormikCommanNew
              schema={{
                password: yup.string().required('Password is required')
                .min(8, 'Password is too short - should be 8 chars minimum.'),
                new_password: yup.string().required('New Password is required')
                   .oneOf([yup.ref('password'), null], 'Passwords must match')
                }
              }
              initialValuesProps={{
                password: '',
                new_password: '',
              }}
              onSubmitProps={(values) => {
                console.log('VALUE MALIE GAY', values);
                handleSubmit(values)
              }}
              Ch={changePassword}
            />

            {/* <Grid container style={{ justifyContent: 'end' }}>
              <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                  <Button type="button" color="inherit" variant="outlined" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="button" variant="contained" onClick={handleTracking}>
                    Generate Tracking CSV
                  </Button>
                </Stack>
              </Stack>
            </Grid> */}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
export default ChangePasswordModel;


let changePassword = (props) => {
    const { formik,handleClose } = props
    const isSubmitting = false
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
                      alignItems:"center"
                  }}
            >
                <Grid item xs={12}>
                    <TextField
                        type={"text"}
                        fullWidth
                        name="password"
                        label="New API Password"
                        value={formik.values.password || ""}
                        onChange={(e) => {
                            formik.setFieldValue("password", e.target.value)
                        }}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type={"text"}
                        fullWidth
                        name="new_password"
                        label="Confirm New API Password"
                        value={formik.values.new_password || ""}
                        onChange={(e) => {
                            formik.setFieldValue("new_password", e.target.value)
                        }}
                        error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                        helperText={formik.touched.new_password && formik.errors.new_password}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{ mt: 3 }}
                    style={{
                        textAlign:"end"
                    }}>
                    <div>
                        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                            <Button color="inherit" variant="outlined" onClick={handleClose}>
                                Close
                            </Button>
                            <LoadingButton type="submit" variant="contained" onClick={handleClose}>
                                Change API Password
                            </LoadingButton>
                        </Stack>
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}