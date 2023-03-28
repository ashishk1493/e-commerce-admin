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

const DBCampaignForm = (props) => {
  const { formik } = props
  const isSubmitting = false

  const { isLoading, sms_db_campaing_list } = useSelector((state) => state.sms_db_campaing_sms);
  console.log(sms_db_campaing_list, "sms_db_campaing_list");
  let lst_sms_type_list =  sms_db_campaing_list?.sms_type
  let lst_senders =  sms_db_campaing_list?.senders_list
  let lst_sms_encoding =  sms_db_campaing_list?.sms_encoding.length >= 0 ? sms_db_campaing_list?.sms_encoding :''
  let contacts_list =  sms_db_campaing_list?.contacts_list
  console.log(contacts_list,'valueTmp***');
  let template_list =  sms_db_campaing_list?.template_list
  
  let lst_urlshortner =  sms_db_campaing_list?.urlshortner
  let lst_formmanager =  sms_db_campaing_list?.formmanager
  let yes_no_list =  sms_db_campaing_list?.yes_no_list
  let country_list =  sms_db_campaing_list?.country
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
                disablePortal
                options={lst_sms_type_list}
                // getOptionLabel={(option) => option.}
                onChange={((e, value) => {
                  // let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  // formik.setFieldValue("sms_type", valueTmp)
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
                onChange={((e,value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("sms_encoding", valueTmp)
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
              {/* Select Country */}
              <AnqAutocomplete
                label="Select Country"
                name="country"
                disablePortal
                options={country_list}
                getOptionLabel={(option) => option.name}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "name")
                  formik.setFieldValue("country", valueTmp)
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="country"
                    label="Select Country"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.country && Boolean(formik.errors.country)}
                    helperText={formik.touched.country && formik.errors.country}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Select DB Campaign */}
              <AnqAutocomplete
                label="Select DB Campaign"
                name="contactList"
                disablePortal
                options={top100Films}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("contactList", valueTmp)
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="contactList"
                    label="Select DB Campaign"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.contactList && Boolean(formik.errors.contactList)}
                    helperText={formik.touched.contactList && formik.errors.contactList}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Start Campaign Count */}
              <TextField
                fullWidth
                name="startNumber"
                label="Start Campaign Count"
                value={formik.values.startNumber || ""}
                onChange={(e) => {
                  formik.setFieldValue("startNumber", e.target.value)
                }}
                error={formik.touched.startNumber && Boolean(formik.errors.startNumber)}
                helperText={formik.touched.startNumber && formik.errors.startNumber}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* End Campaign Count */}
              <TextField
                fullWidth
                name="endNumber"
                label="End Campaign Count"
                value={formik.values.endNumber || ""}
                onChange={(e) => {
                  formik.setFieldValue("endNumber", e.target.value)
                }}
                error={formik.touched.endNumber && Boolean(formik.errors.endNumber)}
                helperText={formik.touched.endNumber && formik.errors.endNumber}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              {/* Select Template */}
              <AnqAutocomplete
                label="Select Template"
                name="template_id"
                disablePortal
                options={template_list}
                getOptionLabel={(option) => option.name}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "name")
                  formik.setFieldValue("template_id", valueTmp ? valueTmp : '')
                })}
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
              {/* Select Link */}
              <AnqAutocomplete
                label="Select Link"
                name="selectLink"
                disablePortal
                // getOptionLabel={(option) => option.name}
                options={lst_urlshortner}
                onChange={((e, value) => {
                  // let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  // formik.setFieldValue("selectLink", valueTmp)
                  formik.setFieldValue("selectLink",value ? value :'')
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
                // getOptionLabel={(option) => option.name}
                onChange={((e, value) => {
                  // let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("selectForm", value ? value : '')
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
              {/* Schedule Message */}
              <AnqAutocomplete
                label="Schedule Message"
                name="scheduled"
                disablePortal
                options={yes_no_list}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("scheduled", valueTmp)
                  // formik.setFieldValue("scheduled",value ? value : '')
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="scheduled"
                    label="Schedule Message"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.scheduled && Boolean(formik.errors.scheduled)}
                    helperText={formik.touched.scheduled && formik.errors.scheduled}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Recurring Job */}
              <AnqAutocomplete
                label="Recurring Job"
                name="is_recurring_job"
                disablePortal
                options={yes_no_list}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("is_recurring_job", valueTmp)
                  // formik.setFieldValue("is_recurring_job",value ? value : '')
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="is_recurring_job"
                    label="Recurring Job"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.is_recurring_job && Boolean(formik.errors.is_recurring_job)}
                    helperText={formik.touched.is_recurring_job && formik.errors.is_recurring_job}
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

export default DBCampaignForm