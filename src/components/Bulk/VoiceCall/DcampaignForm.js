import { Autocomplete, Box, Button, Card, Grid, Stack, TextField } from '@mui/material'
import React from 'react'
import { LoadingButton } from '@mui/lab';

import { getPerticulerKeyFromSelectedValue } from '../../../utils/autocompleteUtils';
import AnqAutocomplete from '../../comman/FormImputs/AnqAutocomplete';
import { useSelector } from 'react-redux';
import { 
  get_db_campaign_list_using_country,
  get_db_campaign_voice_call,
  get_db_campaign_count_using_country,
 } from 'src/redux/slices/voice/db_campaign_voice';
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

const DcampaignForm = (props) => {
  const { formik } = props
  const isSubmitting = false

  const { 
    isLoading,
    db_campaign_voice_list,
    db_campaign_voice_note_list,
    upload_file_path,
    db_campaign_list,
    db_campaign_count,
  } = useSelector((state) => state.db_campaign_voice);

  console.log(db_campaign_count,'db_campaign_count');
  console.log(db_campaign_list,'db_campaign_list');

  let country_list = db_campaign_voice_list?.country
  let timezone_list = db_campaign_voice_list?.timezone_list;
  let lts_voice_type_list = db_campaign_voice_list?.type_list
  // console.log(lts_voice_type_list,'lts_voice_type_list');
  // let voice_note =  db_campaign_voice_list && (db_campaign_voice_list.type_list || []).map((el)=>{
  //   const tpmObjNote = {
  //     label:`${el?.voice_types}`,
  //     value: el?.vendor_account_id
  //   }
  //   lts_voice_type_list.push(tpmObjNote)
  // })
  let lts_voice_note = [];
  let voice_type =  db_campaign_voice_note_list && (db_campaign_voice_note_list).map((el)=>{
    const tpmObj = {
      label: `${el.title} (${el?.file_seconds} seconds)`,
      value: el.vendor_account_id
    }
    lts_voice_note.push(tpmObj)
  })
  let scheduleVoiceNoteOption =[];
  scheduleVoiceNoteOption = db_campaign_voice_list.yes_no_list;

  const getDBCampingVoiceList = async(id)=>{
      if(id){
        let res = await dispatch(get_db_campaign_voice_call(id))
      }
  }

  const getDBCampingListUsingCountry = async(id)=>{
    if(id){
      let res = await dispatch(get_db_campaign_list_using_country(id))
    }
  }

  const getCampaingCount = async(id)=>{
    if(id){
      let res = await dispatch(get_db_campaign_count_using_country(id))
    }
  }
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              {/* Select Country */}
              <AnqAutocomplete
                label="Select Country"
                name="country"
                disablePortal
                options={country_list}
                getOptionLabel={(option) => option.name}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "id")
                  formik.setFieldValue("country", valueTmp)
                  console.log(valueTmp,'valueTmp=========country');
                  if(valueTmp){
                    getDBCampingListUsingCountry(valueTmp)
                  }
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

            <Grid item xs={6} md={6}>
              {/* DB Campaign */}
              <AnqAutocomplete
                label="DB Campaign"
                name="db_campaign"
                disablePortal
                options={db_campaign_list}
                getOptionLabel={(option) => option.name}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "id")
                  formik.setFieldValue("db_campaign", valueTmp)
                  if(valueTmp){
                    getCampaingCount(valueTmp)
                  }
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="db_campaign"
                    label="DB Campaign"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.db_campaign && Boolean(formik.errors.db_campaign)}
                    helperText={formik.touched.db_campaign && formik.errors.db_campaign}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={6}>
              {/* Start Campaign Count */}
              <TextField
                fullWidth
                name="start_no"
                label="Start Campaign Count"
                value={formik.values.start_no || ""}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  formik.setFieldValue("start_no", e.target.value)
                }}
                error={formik.touched.start_no && Boolean(formik.errors.start_no)}
                helperText={formik.touched.start_no && formik.errors.start_no}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              {/* End Campaign Count (Total Records : 0) */}
              <TextField
                fullWidth
                name="end_no"
                label={`End Campaign Count (Total Records : ${db_campaign_count ? db_campaign_count : 0})`}
                value={formik.values.end_no || ""}
                // onChange={formik.handleChange}
                onChange={(e) => {
                  formik.setFieldValue("end_no", e.target.value)
                }}
                error={formik.touched.end_no && Boolean(formik.errors.end_no)}
                helperText={formik.touched.end_no && formik.errors.end_no}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              {/* Voice Type */}
              <AnqAutocomplete
                label="Voice Type"
                name="voiceType"
                disablePortal
                options={lts_voice_type_list}
                getOptionLabel={(option) => option.voice_types}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "vendor_account_id")
                  formik.setFieldValue("voiceType", valueTmp)
                  if(valueTmp !== 29){
                    getDBCampingVoiceList(valueTmp)
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
          </Grid>

          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Send voice
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

export default DcampaignForm