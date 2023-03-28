import { Autocomplete, Box, Button, Card, Checkbox, FormControl, Grid, InputLabel, MenuItem, Stack, TextField ,Select} from '@mui/material'
import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab';

import { getPerticulerKeyFromSelectedValue } from '../../../utils/autocompleteUtils';
import AnqAutocomplete from '../../comman/FormImputs/AnqAutocomplete';
import { useSelector } from 'react-redux';
import AnqCounterTextArea from '../AnqCounterTextArea';
import { get_voice_note_bulk_voice_call } from 'src/redux/slices/voice/bulk_voice_call';
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

const BulkVoiceNoteForm = (props) => {
  const { formik } = props;
  const isSubmitting = false;

  const { isLoading,bulk_voice_call_field_list,bulk_voice_note_list } = useSelector((state) => state.voice_bulk_voice_call);
  console.log(bulk_voice_note_list,'bulk_voice_note_list');
  let timezone_list = bulk_voice_call_field_list?.timezone_list;
  let lts_voice_type_list = [];
  let voice_note =  bulk_voice_call_field_list && (bulk_voice_call_field_list.type_list || []).map((el)=>{
    const tpmObjNote = {
      label:`${el?.voice_types}`,
      value: el?.vendor_account_id
    }
    lts_voice_type_list.push(tpmObjNote)
  })
  let lts_voice_note = [];
  let voice_type =  bulk_voice_note_list && (bulk_voice_note_list).map((el)=>{
    const tpmObj = {
      label: `${el.title} (${el?.file_seconds} seconds)`,
      value: el.vendor_account_id
    }
    lts_voice_note.push(tpmObj)
  })
  let scheduleVoiceNoteOption =[];
  scheduleVoiceNoteOption = bulk_voice_call_field_list.yes_no_list;

  // let voiceNoteTime = bulk_voice_note_list && bulk_voice_note_list.filter.((el)=>{
  //   let value = formik.values.voiceNote;
  //   console.log(value,'value;;;;;;;;;;;;;;;;');
  //   if(value){
  //     return el.
  //   }
  // })

  const getBulkVoiceCallList = async(id)=>{
      console.log('calll---------');
      if(id){
        let res = await dispatch(get_voice_note_bulk_voice_call(id))
      }
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* Contact List */}
            <AnqAutocomplete
                label="Contact List"
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
                    label="Contact List"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.contactList && Boolean(formik.errors.contactList)}
                    helperText={formik.touched.contactList && formik.errors.contactList}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Voice Type */}
              <AnqAutocomplete
                label="Voice Type"
                name="voiceType"
                disablePortal
                options={lts_voice_type_list}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "value")
                  formik.setFieldValue("voiceType", valueTmp)
                  if(valueTmp !== 29){
                    getBulkVoiceCallList(valueTmp)
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
                      name="scheduled_datetime"
                      label="Select Schedule Time"
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
                    <li><b>Per Voice Clip:</b> 0 Seconds</li>
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

export default BulkVoiceNoteForm