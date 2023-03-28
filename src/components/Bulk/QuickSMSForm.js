import { Autocomplete, Box, Button, Card, Grid, Stack, TextField } from '@mui/material'
import React,{useState} from 'react'
import { DatePicker, LoadingButton } from '@mui/lab';

import { getPerticulerKeyFromSelectedValue } from '../../utils/autocompleteUtils';
import AnqAutocomplete from '../comman/FormImputs/AnqAutocomplete';
import BasicModal from "./Model/BasicModal";
import {SaveMessageTemplateForm} from "./SMS/SaveMessageTemplateForm";
import AnqCounterTextArea from "./AnqCounterTextArea";
import {handleRemoveDuplicateText} from "../../utils/bulkComman";
import { useSelector } from 'react-redux';
// import SmsCounter from 'sms-counter'

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
];


const QuickSMSForm = (props) => {
  const { formik } = props
  const isSubmitting = false
  
  
const [time, setTime] = useState('')

const [openSave,setOpneSave] = useState(false)

const [user,setUser] = useState(null)


const { isLoading, compose_sms_lits } = useSelector((state) => state.compose_sms);
  console.log(compose_sms_lits, "compose_sms_lits");
  let lst_sms_type_list =  compose_sms_lits?.sms_type_list
  let lst_senders =  compose_sms_lits?.senders_list
  let lst_sms_encoding =  compose_sms_lits?.sms_encoding_list
  let contacts_list =  compose_sms_lits?.contacts_list
  console.log(contacts_list,'valueTmp***');
  let template_list =  compose_sms_lits?.template_list
  
  let lst_form_list =  compose_sms_lits?.form_list
  let lts_link_list = compose_sms_lits?.link_list
  let lst_formmanager =  compose_sms_lits?.formmanager
  let yes_no_list =  compose_sms_lits?.yes_no_list
  let country_list =  compose_sms_lits?.country


const changeTime = (e) => {
  // let d = new Date()
  // const lts = d.toLocaleTimeString()
  // const ltsTime = lts 

  // const currenTime = d.getTime()

  setTime(e.target.value || "08:00")
}

  const handleDuplicateRemove = () => {
    const userNumbers = formik.values ? formik.values.phone_numbers : '';
    var removeDuplicate = userNumbers;

     removeDuplicate = Array.from(new Set(removeDuplicate.split('\n'))).toString();
    // var result = removeDuplicate.split(/\s/g).filter((word, i, arr) => arr.indexOf(word) === i);
    // console.log(result,'result')

    console.log(removeDuplicate,'removeDuplicate')
    formik.setFieldValue("phone_numbers", removeDuplicate)
  };

  const handleOpneSaveMessage = (user) => {
    setOpneSave(true)
    setUser(user)
  }
  const handleCloseSaveMessage = () => setOpneSave(false)
  const msgLength = formik.values.message.length


  //   const messageCounter = SmsCounter.count(counter)
  // console.log(messageCounter,"messageCounter")

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
                onChange={((e, value) => {
                  // let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "value")
                  // formik.setFieldValue("sms_type", valueTmp)
                  formik.setFieldValue("sms_type", value ? value : "")
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
                  // formik.setFieldValue("sender_id", valueTmp)
                  formik.setFieldValue("sender_id", value ? value : "")
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
                  // let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  // formik.setFieldValue("sms_encoding", valueTmp)
                  formik.setFieldValue("sms_encoding", value ? value : "")
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

            <Grid item xs={12} >
              {/* Enter Phone Numbers */}
              <TextField
                type={"text"}
                fullWidth
                multiline
                rows={5}
                name="phone_numbers"
                label="Enter Phone Numbers (Enter One Number Per Line. Max 5000 Numbers)"
                value={formik.values.phone_numbers || ""}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  formik.setFieldValue("phone_numbers", e.target.value)
                }}
                error={formik.touched.phone_numbers && Boolean(formik.errors.phone_numbers)}
                helperText={formik.touched.phone_numbers && formik.errors.phone_numbers}
                // inputProps={{ maxLength: 10 }}
              />
              <LoadingButton
                  type="button"
                  variant="contained"
                  color={'error'}
                  className={'my-4'}
                  onClick={()=> {
                      let orignalValue = handleRemoveDuplicateText(formik.values.phone_numbers && formik.values.phone_numbers)
                      formik.setFieldValue("phone_numbers", orignalValue)
                  }}
                  sx={{ my: 3 }}
              >
                Remove Duplicate
              </LoadingButton>
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Select Template */}
              <AnqAutocomplete
                label="Select Template"
                name="template_id"
                disablePortal
                options={template_list}
                getOptionLabel={(option) => option.name}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "id")
                  formik.setFieldValue("template_id", valueTmp)
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

            <Grid item xs={12} md={4}>
              {/* Select Link */}
              <AnqAutocomplete
                label="Select Link"
                name="selectLink"
                disablePortal
                options={lts_link_list}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "value")
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

            <Grid item xs={12} md={4}>
              {/* Select Form */}
              <AnqAutocomplete
                label="Select Form"
                name="selectForm"
                disablePortal
                options={lst_form_list}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "value")
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
              {/* Enter Message Text  */}
              <AnqCounterTextArea
                fullWidth
                multiline
                rows={5}
                name="message"
                label="Enter Message Text"
                value={formik.values.message || ""}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  formik.setFieldValue("message", e.target.value)
                }}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
              />
              <LoadingButton
                  type="button"
                  variant="contained"
                  color={'info'}
                  className={'my-4'}
                  onClick={()=> {
                    handleOpneSaveMessage(formik.values)
                  }}
                  sx={{ my: 3 }}
              >
                Save Message Templates
              </LoadingButton>
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Schedule Message */}
              <AnqAutocomplete
                label="Schedule Message"
                name="scheduled"
                disablePortal
                options={top100Films}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("scheduled", valueTmp)
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
              {/* Select Weekly start day */}
              <AnqAutocomplete
                label="Select Weekly start day"
                name="weekly_start_day"
                disablePortal
                options={top100Films}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("weekly_start_day", valueTmp)
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="weekly_start_day"
                    label="Select Weekly start day"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.weekly_start_day && Boolean(formik.errors.weekly_start_day)}
                    helperText={formik.touched.weekly_start_day && formik.errors.weekly_start_day}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              {/* Select Monthly Date */}
              <AnqAutocomplete
                label="Select Date"
                name="monthly_date"
                disablePortal
                options={top100Films}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("monthly_date", valueTmp)
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="monthly_date"
                    label="Schedule Message"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.monthly_date && Boolean(formik.errors.monthly_date)}
                    helperText={formik.touched.monthly_date && formik.errors.monthly_date}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              {/* <DatePicker 
                label="Basic date picker" 
              /> */}
              <DatePicker
                // label="Date"
                label="Select a date"
                value={formik.values.custom_date}
                onChange={(newValue) => formik.setFieldValue("custom_date", newValue)}
                InputLabelProps={{
                  style: { color: '#919eab !important' } 
                }}
                inputProps={{
                  label:"Select a date",
                  style: { color: '#919eab' } 
                }}
                renderInput={(params) => 
                  <TextField 
                   name='custom_date' 
                   fullWidth
                   {...params} 
                   variant="outlined"
                   sx={{
                    '& fieldset': {
                      borderColor: '#dce0e4 !important',
                    },
                  }}
                  />}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Select Time Zone */}
              <AnqAutocomplete
                label="Select Time Zone"
                name="selectTimeZone"
                disablePortal
                options={top100Films}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("selectTimeZone", valueTmp)
                })}
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
            <Grid item xs={12} md={4}>
            <TextField
                type="date"
                defaultValue="2023-03-17"
                label="Select Date"
                inputProps={{ min: "2023-03-17", max: "2025-03-17" }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              {/* Recurring Job */}
              <AnqAutocomplete
                label="Recurring Job"
                name="is_recurring_job"
                disablePortal
                options={top100Films}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("is_recurring_job", valueTmp)
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
            <Grid item xs={12} md={4}>
                <span onClick={changeTime}>
                  <TextField
                    defaultValue={time}
                    value={time}
                    InputLabelProps={{ shrink: true }}
                    type="time"
                    label={"Select Time"}
                    placeholder='Select Time'
                    onChange={changeTime}/>
                </span>
            </Grid>
          </Grid>

          <BasicModal
              open={openSave}
              handleClose={handleCloseSaveMessage}
          >
              <SaveMessageTemplateForm user={user} handleClose={handleCloseSaveMessage} />
          </BasicModal>

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

export default QuickSMSForm