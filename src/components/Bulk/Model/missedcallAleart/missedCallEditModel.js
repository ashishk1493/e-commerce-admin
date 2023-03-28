import { Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, TableCell, TextField, Typography } from '@mui/material';
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
import AnqAutocomplete from 'src/components/comman/FormImputs/AnqAutocomplete';

const style = {
  position: 'absolute',
  borderRadius: '10px',
  top: '50%',
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

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
];
  

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [createData('Total Messages:', 0), createData('Total Clicked:', 0)];

const MissedCallEditModel = (props) => {
  const { open, handleClose, user } = props;

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
              <Typography variant="h5">Edit Details</Typography>
              <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                <Button color="inherit" variant="text" onClick={handleClose}>
                  <CloseIcon />
                </Button>
              </Stack>
            </div>
          </Stack>
          <Grid
            container
            style={{
              padding: '15px 0',
            }}
          >
            <Grid xs={12} md={12}>
              <FormikCommanNew
                schema={{
                }}
                initialValuesProps={{
                  myCheckboxGroup: [],
                  sms_select_template:'',
                  sender_id:"",
                  sms_type:"",
                }}
                onSubmitProps={(values) => {
                  console.log('value', values);
                }}
                Ch={editMisscall}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
export default MissedCallEditModel;

let editMisscall = (props) => {
  const { formik } = props;
  const isSubmitting = false;
  console.log(formik.values.urlEndpoint, 'formik.values.urlEndpoint');

  const options = [
    {
        value:"Notify to customer using SMS",
        label:"Notify to customer using SMS"
    },{
        value:"Notify to customer using OBD",
        label:"Notify to customer using OBD"
    },{
        value:"Notify to admin using SMS",
        label:"Notify to admin using SMS"
    },{
        value:"Notify to admin using OBD",
        label:"Notify to admin using OBD"
    },
  ];

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    const currentValue = formik.values['myCheckboxGroup'] || [];
    const updatedValue = isChecked ? [...currentValue, value] : currentValue.filter((v) => v !== value);
    formik.setFieldValue('myCheckboxGroup', updatedValue);
  };
  console.log(formik.values,'formik.values');
  console.log(formik.values['myCheckboxGroup']?.includes("Notify to customer using SMS"),'hello');

  return (
    <form
      style={{
        padding: '15px 0',
      }}
      onSubmit={formik.handleSubmit}
    >
      <Grid
        container
        spacing={2}
        style={{
          marginBottom: '20px',
          alignItems: 'center',
          padding: '15px 0',
        }}
      >
        <Grid item xs={12}>
          Action Event
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.label}
                control={
                  <Checkbox
                    checked={formik.values['myCheckboxGroup']?.includes(option.value)}
                    onChange={handleCheckboxChange}
                    value={option.value}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
          {formik.values['myCheckboxGroup']?.includes("Notify to customer using SMS") 
            ? (
              <>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
              {/* SMS Type */}
              <AnqAutocomplete
                label="SMS Type"
                name="sms_type"
                disablePortal
                options={top100Films}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("sms_type", valueTmp)
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="sms_type"
                    label="SMS Type"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.sms_type && Boolean(formik.errors.sms_type)}
                    helperText={formik.touched.sms_type && formik.errors.sms_type}
                  />
                )}
              />
                </Grid>
                <Grid item xs={12} md={6}>
                {/* Select Sender ID */}
                <AnqAutocomplete
                    label="Select Sender ID"
                    name="sender_id"
                    disablePortal
                    options={top100Films}
                    onChange={((e, value) => {
                    let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                    formik.setFieldValue("sender_id", valueTmp)
                    })}
                    required={true}
                    renderInput={params => (
                    <TextField
                        {...params}
                        name="sender_id"
                        label="Select Sender ID"
                        variant="outlined"
                        fullWidth
                        error={formik.touched.sender_id && Boolean(formik.errors.sender_id)}
                        helperText={formik.touched.sender_id && formik.errors.sender_id}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={12} md={6}>
                {/* Select SMS Encoding */}
                <AnqAutocomplete
                    label="Select SMS Encoding"
                    name="sms_select_template"
                    disablePortal
                    options={top100Films}
                    onChange={((e, value) => {
                    let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                    formik.setFieldValue("sms_select_template", valueTmp)
                    })}
                    required={true}
                    renderInput={params => (
                    <TextField
                        {...params}
                        name="sms_select_template"
                        label="Select SMS Encoding"
                        variant="outlined"
                        fullWidth
                        error={formik.touched.sms_select_template && Boolean(formik.errors.sms_select_template)}
                        helperText={formik.touched.sms_select_template && formik.errors.sms_select_template}
                    />
                    )}
                />
                </Grid>
                <Grid item xs={12} md={6}>
                {/* Select SMS Encoding */}
                <AnqAutocomplete
                    label="Select Template"
                    name="sms_select_template"
                    disablePortal
                    options={top100Films}
                    onChange={((e, value) => {
                    let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                    formik.setFieldValue("sms_select_template", valueTmp)
                    })}
                    required={true}
                    renderInput={params => (
                    <TextField
                        {...params}
                        name="sms_select_template"
                        label="Select Template"
                        variant="outlined"
                        fullWidth
                        error={formik.touched.sms_select_template && Boolean(formik.errors.sms_select_template)}
                        helperText={formik.touched.sms_select_template && formik.errors.sms_select_template}
                    />
                    )}
                />
                </Grid>
              </Grid>
              </>
            )
            : 'false'
          }
        </Grid>
      </Grid>
      <Grid container style={{ justifyContent: 'end' }}>
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" variant="outlined">
            Close
          </Button>
          <Button type="submit" variant="contained">
            Add Endpoint
          </Button>
        </Stack>
      </Grid>
    </form>
  );
};
