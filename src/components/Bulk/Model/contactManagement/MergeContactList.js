import { LoadingButton } from '@mui/lab'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import AnqAutocomplete from 'src/components/comman/FormImputs/AnqAutocomplete';

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

const MergeContactList = (props) => {
  const { open, handleClose } = props
  return (
    <Box sx={style}>
      <Stack spacing={3}>
        <Typography variant="subtitle1">Merge Contact List</Typography>
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

        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <LoadingButton type="submit" variant="contained" onClick={handleClose}>
            Merge Contact List
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>)
}

export default MergeContactList