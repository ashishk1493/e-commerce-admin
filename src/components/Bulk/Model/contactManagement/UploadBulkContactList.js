import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import AnqAutocomplete from 'src/components/comman/FormImputs/AnqAutocomplete';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const style = {
  position: 'absolute',
  borderRadius: "20px",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
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

const UploadBulkContactList = (props) => {
  const { open, handleClose } = props
  return (
    <Box sx={style}>
      <Stack spacing={3}>
        <Typography variant="subtitle1">Upload Bulk Contact List</Typography>
        <AnqAutocomplete
          label="Contact"
          name="contact"
          disablePortal
          options={top100Films}
          onChange={((e, value) => {
            // let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
            // formik.setFieldValue("sms_type", valueTmp)
          })}
          required={true}
          renderInput={params => (
            <TextField
              {...params}
              name="contact"
              label="Contact"
              variant="outlined"
              fullWidth
            // error={formik.touched.sms_type && Boolean(formik.errors.sms_type)}
            // helperText={formik.touched.sms_type && formik.errors.sms_type}
            />
          )}
        />
        <div>
          Contact List Name
        </div>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <LoadingButton type="submit" variant="contained" onClick={handleClose}>
            Create bulk Contact List
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>)
}

export default UploadBulkContactList