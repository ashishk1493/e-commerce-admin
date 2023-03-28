import { Autocomplete, Box, Button, Card, Grid, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab';

import { getPerticulerKeyFromSelectedValue } from '../../../utils/autocompleteUtils';
import AnqAutocomplete from '../../comman/FormImputs/AnqAutocomplete';
import {handleRemoveDuplicateText} from "../../../utils/bulkComman";
import AnqCounterTextArea from '../AnqCounterTextArea';
import { useSelector } from 'react-redux';
import { get_voice_call_field_list } from 'src/redux/slices/voice/send_voice_call';
import { dispatch } from 'src/redux/store';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
];

const VoiceType =[
  { label: 'Promotional - 30 Sec', value:'1' },
  { label: 'Transactional - 30 Sec', value: "2" },
  { label: 'Text to Speech', value: "3" },
]
const scheduleVoiceNoteOption =[
  {label:"Yes",value:"1"},
  {label:"No",value:"0"}
]

const timezoneOpitons = [
  {label:"(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",value:'(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi'},
  {label:"1 (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",value:'1 (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi'},
  {label:"2 (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",value:'2 (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi'}
]

const SendVoiceNoteForm = (props) => {
  const { formik } = props
  const isSubmitting = false
  const [perVoiceClipe, setPerVoiceClipe] = useState(null)

  const { isLoading, send_voice_call_list,voice_note_field_list } = useSelector((state) => state.send_voice_call);
  let timezone_list = send_voice_call_list?.timezone_list
  let lts_voice_note = []
  let voice_note =  voice_note_field_list && (voice_note_field_list || []).map((el)=>{
    const tpmObjNote = {
      label:`${el?.title} (${el?.file_seconds}seconds)`,
      value: el?.id
    }
    lts_voice_note.push(tpmObjNote)
  })

  let lts_voice_type = [];
  let voice_type =  send_voice_call_list && (send_voice_call_list?.voice_notes || []).map((el)=>{
    const tpmObj = {
      label: el.name,
      value: el.vendor_account_id
    }
    lts_voice_type.push(tpmObj)
  })

  let perVoiceClipeSeconds = send_voice_call_list?.voice_notes && (send_voice_call_list?.voice_notes || []).filter((el)=>{

    if(perVoiceClipe){
      return el.vendor_account_id === perVoiceClipe
    }else {
      return null
    }

  })

  const onDateRange = (ranges) => {
    console.log(ranges, "date male che");
  };

  const getVoiceCallList = async (id) => {
    let res = await dispatch(get_voice_call_field_list(id))
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Enter Phone Numbers */}
              <TextField
                fullWidth
                multiline
                rows={5}
                name="phone_numbers"
                label="Enter Phone Numbers (Enter One Number Per Line. Max 5000 Numbers)"
                value={formik.values.phone_numbers || ""}
                onChange={(e) => {
                  formik.setFieldValue("phone_numbers", e.target.value)
                }}
                error={formik.touched.phone_numbers && Boolean(formik.errors.phone_numbers)}
                helperText={formik.touched.phone_numbers && formik.errors.phone_numbers}
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
            <Grid item xs={12} md={6}>
              {/* Voice Type */}
              <AnqAutocomplete
                label="Voice Type"
                name="voiceType"
                disablePortal
                options={lts_voice_type}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "value")
                  formik.setFieldValue("voiceType", valueTmp)
                  setPerVoiceClipe(valueTmp)
                  if(valueTmp !== 29){
                    getVoiceCallList(valueTmp)
                  }
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="voiceType"
                    label="Voice Type"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.voiceType && Boolean(formik.errors.voiceType)}
                    helperText={formik.touched.voiceType && formik.errors.voiceType}
                  />
                )}
              />
            </Grid>
            {formik.values.voiceType && formik.values.voiceType == 29 ?
              (<Grid item xs={12} md={12}>
                  <AnqCounterTextArea
                    fullWidth
                    multiline
                    rows={5}
                    name="text_to_speech_message"
                    label="Enter Text to speech message"
                    value={formik.values.message || ""}
                    onChange={(e) => {
                      formik.setFieldValue("text_to_speech_message", e.target.value)
                    }}
                    error={formik.touched.text_to_speech_message && Boolean(formik.errors.text_to_speech_message)}
                    helperText={formik.touched.text_to_speech_message && formik.errors.text_to_speech_message}
                  />
              </Grid>)
              : ''
            }
            {formik.values.voiceType !== 29 || formik.values.voiceType === '' ?
              ( <Grid item xs={12} md={6}>
                {/* Select Voice Note */}
                <AnqAutocomplete
                  label="Select Voice Note"
                  name="voiceNote"
                  disablePortal
                  options={lts_voice_note}
                  onChange={((e, value) => {
                    let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "value")
                    formik.setFieldValue("voiceNote", valueTmp)
                  })}
                  required={true}
                  renderInput={params => (
                    <TextField
                      {...params}
                      name="voiceNote"
                      label="Select Voice Note"
                      variant="outlined"
                      fullWidth
                      error={formik.touched.voiceNote && Boolean(formik.errors.voiceNote)}
                      helperText={formik.touched.voiceNote && formik.errors.voiceNote}
                    />
                  )}
                />
              </Grid>):''
            }
            <Grid item xs={12} md={6}>
              {/* Schedule Voice Note */}
              <AnqAutocomplete
                label="Schedule Voice Note"
                name="scheduleVoiceNote"
                disablePortal
                options={scheduleVoiceNoteOption}
                getOptionLabel={(options)=>options.label}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "value")
                  formik.setFieldValue("scheduleVoiceNote", valueTmp)
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="scheduleVoiceNote"
                    label="Schedule Voice Note"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.scheduleVoiceNote && Boolean(formik.errors.scheduleVoiceNote)}
                    helperText={formik.touched.scheduleVoiceNote && formik.errors.scheduleVoiceNote}
                  />
                )}
              />
            </Grid>
            {formik.values.scheduleVoiceNote && formik.values.scheduleVoiceNote === "1"
              ? (
                <>
                <Grid item xs={12} md={6}>
                {/* Schedule Voice Note */}
                <AnqAutocomplete
                  label="Select Time Zone"
                  name="timezone"
                  disablePortal
                  options={timezone_list}
                  getOptionLabel={(option) => option.name}
                  onChange={((e, value) => {
                    let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "id")
                    formik.setFieldValue("timezone", valueTmp)
                  })}
                  required={true}
                  renderInput={params => (
                    <TextField
                      {...params}
                      name="timezone"
                      label="Select Time Zone"
                      variant="outlined"
                      fullWidth
                      error={formik.touched.timezone && Boolean(formik.errors.timezone)}
                      helperText={formik.touched.timezone && formik.errors.timezone}
                    />
                  )}
                />
                </Grid>
                <Grid item xs={6} md={6}>
                    {/* <AnqRangeDatePiker onChange={onDateRange}/> */}
                    <TextField
                      fullWidth
                      name="date"
                      label="Enter Date"
                      value={formik.values.date || ""}
                      onChange={(e) => {
                        formik.setFieldValue("date", e.target.value)
                      }}
                      error={formik.touched.date && Boolean(formik.errors.date)}
                      helperText={formik.touched.date && formik.errors.date}
                    />
                </Grid>
                </>
                )
                : ''
            }

            <Grid item xs={12} md={8}>
                  <ul>
                    <li><b>Length:</b> 0 Seconds</li>
                    <li><b>Voice Calls:</b> 0 </li>
                    <li><b>Per Voice Clip:</b> 
                    {perVoiceClipeSeconds && perVoiceClipeSeconds[0] && perVoiceClipeSeconds[0].time ? perVoiceClipeSeconds[0].time : '0' 
                    } Seconds</li>
                  </ul>
            </Grid>
          </Grid>

          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Send voice
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </form>
  )
}

export default SendVoiceNoteForm