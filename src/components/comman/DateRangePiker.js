import React, { useState } from "react";
import PropTypes from "prop-types";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {addDays, isBefore, subDays} from "date-fns";
import {useDispatch, useSelector} from "../../redux/store";
import * as Yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {createEvent, selectRange, updateEvent,setDate} from "../../redux/slices/calendar";
import {Box, Button, DialogActions, IconButton, Stack, TextField, Tooltip} from "@mui/material";
import {FormProvider, RHFSwitch, RHFTextField} from "../hook-form";
import {LoadingButton, MobileDateTimePicker} from "@mui/lab";
import CalendarForm from "../../sections/@dashboard/calendar/CalendarForm";



const getInitialValues = (range) => {
  const _event = {
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
  };
  console.log(_event,'_event-------')

  return _event;
};
CalendarForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func,
};

const DateRangePiker = ({ range, onCancel }) => {

  const dispatch = useDispatch();
  const EventSchema = Yup.object().shape({
  });


  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(range),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const isDateError = isBefore(new Date(values.end), new Date(values.start));
  const onSubmit = async (data) => {
    try {
      if(!isDateError){
        dispatch(setDate(data.start,data.end));
        reset();
        onCancel()
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Controller
              name="start"
              control={control}
              render={({ field }) => (
                  <MobileDateTimePicker
                      {...field}
                      label="Start date"
                      inputFormat="dd/MM/yyyy hh:mm a"
                      renderInput={(params) => <TextField {...params} fullWidth />}
                  />
              )}
          />
          <Controller
              name="end"
              control={control}
              render={({ field }) => {
                console.log(field,'field----')
                return <MobileDateTimePicker
                    {...field}
                    label="End date"
                    inputFormat="dd/MM/yyyy hh:mm a"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            error={!!isDateError}
                            helperText={isDateError && 'End date must be later than start date'}
                        />
                    )}
                />
              }}
          />

        </Stack>

        <DialogActions>
          <Box sx={{ flexGrow: 1 }} />

          <Button variant="outlined" color="inherit" onClick={onCancel}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Add
          </LoadingButton>
        </DialogActions>
      </FormProvider>
};

export default DateRangePiker;
