import { Autocomplete, Box, Button, Card, Grid, Stack, TextField } from '@mui/material'
import React from 'react'
import { LoadingButton } from '@mui/lab';

import { getPerticulerKeyFromSelectedValue } from '../../utils/autocompleteUtils';
import AnqAutocomplete from '../comman/FormImputs/AnqAutocomplete';
import AnqCounterTextArea from "./AnqCounterTextArea";
import { useSelector } from 'react-redux';
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
];

const BulkSchedulingSMSForm = (props) => {
  const { formik } = props
  const isSubmitting = false

  const { isLoading, sms_bulk_scheduling_list } = useSelector((state) => state.sms_bulk_scheduling_sms);
  console.log(sms_bulk_scheduling_list, "sms_bulk_scheduling_list");
  let lst_sms_type = sms_bulk_scheduling_list ? sms_bulk_scheduling_list.sms_type : []
  let lst_senders = sms_bulk_scheduling_list ? sms_bulk_scheduling_list.senders_list : []
  let lst_sms_encoding = sms_bulk_scheduling_list ? sms_bulk_scheduling_list.sms_encoding : []
  let contacts_list = sms_bulk_scheduling_list ? sms_bulk_scheduling_list.contacts_list : []
  console.log(contacts_list,'valueTmp***');
  let template_list = sms_bulk_scheduling_list ? sms_bulk_scheduling_list.template_list : []
  
  let lst_urlshortner = sms_bulk_scheduling_list ? sms_bulk_scheduling_list.urlshortner : []
  let lst_formmanager = sms_bulk_scheduling_list ? sms_bulk_scheduling_list.formmanager : []
  let yes_no_list = sms_bulk_scheduling_list ? sms_bulk_scheduling_list.yes_no_list : []
  let timezone_list = sms_bulk_scheduling_list ? sms_bulk_scheduling_list.timezone_list : []
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              {/* SMS Type */}
              <AnqAutocomplete
                label="SMS Type"
                name="sms_type"
                options={lst_sms_type}
                onChange={((e, value) => {
                  // let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  // console.log(e, value,"e, value");
                  formik.setFieldValue("sms_type", value ? value : '')
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

            <Grid item xs={12} md={4}>
              {/* Select Sender ID */}
              <AnqAutocomplete
                label="Select Sender ID"
                name="sender_id"
                disablePortal
                options={lst_senders}
                onChange={((e, value) => {
                  // let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("sender_id", value ? value : '')
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

            <Grid item xs={12} md={4}>
              {/* Select SMS Encoding */}
              <AnqAutocomplete
                label="Select SMS Encoding"
                name="sms_encoding"
                disablePortal
                options={lst_sms_encoding}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "value")
                  // formik.setFieldValue("sms_encoding", value ? value : '')
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="sms_encoding"
                    label="Select SMS Encoding"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.sms_encoding && Boolean(formik.errors.sms_encoding)}
                    helperText={formik.touched.sms_encoding && formik.errors.sms_encoding}
                  />
                )}
              />
            </Grid>


            <Grid item xs={12} md={6}>
              {/* Enter Phone Number Prefix(Optional) */}
              <TextField
                fullWidth
                name="phoneNumberPrefix"
                label="Enter Phone Number Prefix(Optional)"
                value={formik.values.phoneNumberPrefix || ""}
                onChange={(e) => {
                  formik.setFieldValue("phoneNumberPrefix", e.target.value)
                }}
                error={formik.touched.phoneNumberPrefix && Boolean(formik.errors.phoneNumberPrefix)}
                helperText={formik.touched.phoneNumberPrefix && formik.errors.phoneNumberPrefix}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Upload */}
              <Button variant="contained" component="label">
                Upload
                <input hidden accept="image/*" multiple type="file" />
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Select Template */}
              <AnqAutocomplete
                label="Select Template"
                name="template_id"
                disablePortal
                options={template_list}
                getOptionLabel={(option) => option.name}
                onChange={((e, value) => {
                  // let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("template_id", value ? value : '')
                })}
                // options={top100Films}
                // onChange={((e, value) => {
                //   let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                //   formik.setFieldValue("template_id", valueTmp)
                // })}
                required={true}
                renderInput={params => (
                  <TextField
                      {...params}
                    name="template_id"
                    label="Select Template"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.template_id && Boolean(formik.errors.template_id)}
                    helperText={formik.touched.template_id && formik.errors.template_id}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Insert Excel Columns */}
              <TextField
                fullWidth
                name="excelColumns"
                label="Insert Excel Columns"
                value={formik.values.excelColumns || ""}
                onChange={(e) => {
                  formik.setFieldValue("excelColumns", e.target.value)
                }}
                error={formik.touched.excelColumns && Boolean(formik.errors.excelColumns)}
                helperText={formik.touched.excelColumns && formik.errors.excelColumns}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Select Link */}
              <AnqAutocomplete
                label="Select Link"
                name="selectLink"
                disablePortal
                // options={top100Films}
                // onChange={((e, value) => {
                //   let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                //   formik.setFieldValue("selectLink", valueTmp)
                // })}
                getOptionLabel={(option) => option.name}
                options={lst_urlshortner}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("selectLink", valueTmp)
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="selectLink"
                    label="Select Link"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.selectLink && Boolean(formik.errors.selectLink)}
                    helperText={formik.touched.selectLink && formik.errors.selectLink}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Select Form */}
              <AnqAutocomplete
                label="Select Form"
                name="selectForm"
                disablePortal
                options={lst_formmanager}
                getOptionLabel={(option) => option.name}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("selectForm", valueTmp)
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="selectForm"
                    label="Select Form"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.selectForm && Boolean(formik.errors.selectForm)}
                    helperText={formik.touched.selectForm && formik.errors.selectForm}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              {/* Enter Phone Numbers */}
              <AnqCounterTextArea
                fullWidth
                multiline
                rows={5}
                name="message"
                label="Enter Message Text"
                value={formik.values.message || ""}
                onChange={(e) => {
                  formik.setFieldValue("message", e.target.value)
                }}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Select Time Zone */}
              <AnqAutocomplete
                label="Select Time Zone"
                name="selectTimeZone"
                disablePortal
                getOptionLabel={(option) => option.name}
                options={timezone_list}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "name")
                  formik.setFieldValue("selectTimeZone", valueTmp)
                })}
                // onChange={((e, value) => {
                //   let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                //   // console.log(valueTmp,'valueTmp--=-=-timezone');
                // formik.setFieldValue("selectTimeZone", valueTmp)
                // })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="selectTimeZone"
                    label="Select Time Zone"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.selectTimeZone && Boolean(formik.errors.selectTimeZone)}
                    helperText={formik.touched.selectTimeZone && formik.errors.selectTimeZone}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Send SMS
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </form>
  )
}

export default BulkSchedulingSMSForm