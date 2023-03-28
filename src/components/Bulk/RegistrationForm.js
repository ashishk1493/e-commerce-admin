import { Autocomplete, Box, Button, Card, CircularProgress, Grid, Stack, TextField } from '@mui/material'
import React from 'react'
import { LoadingButton } from '@mui/lab';

import { getPerticulerKeyFromSelectedValue } from '../../utils/autocompleteUtils';
import AnqAutocomplete from '../comman/FormImputs/AnqAutocomplete';
import AnqCounterTextArea from "./AnqCounterTextArea";
import { useSelector } from 'react-redux';
import FormDisabledOnLoading from '../comman/FormDisabledOnLoading';
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
];

const RegistrationForm = (props) => {
  const { loading, formik } = props
  const isSubmitting = false
  const { countries_list } = useSelector((state) => state.user);

  return (
    <form>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          {loading &&
            <FormDisabledOnLoading />
          }
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              {/* SMS Type */}
              <AnqAutocomplete
                label="Country"
                name="country_id"
                disablePortal
                options={countries_list}
                getOptionLabel={(option) => option.name}
                onChange={((e, value) => {
                  formik.setFieldValue("country_id", value)
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="country_id"
                    label="Country"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.country_id && Boolean(formik.errors.country_id)}
                    helperText={formik.touched.country_id && formik.errors.country_id}
                  />
                )}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="name"
                value={formik.values.name || ""}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  formik.setFieldValue("name", e.target.value)
                }}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="email"
                value={formik.values.email || ""}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value)
                }}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phone"
                label="Phone"
                value={formik.values.phone || ""}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  formik.setFieldValue("phone", e.target.value)
                }}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>


          </Grid>

          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={loading} style={{ zIndex: "1" }}>
              Send SMS
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
      {/* <TextField
        fullWidth
        // id="email"
        name="email"
        label="Email"
        value={formik.values.email || ""}
        // onChange={formik.handleChange}
        onChange={(e) => {
          formik.setFieldValue("email", e.target.value)
        }}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />*/}
    </form>
  )
}

export default RegistrationForm