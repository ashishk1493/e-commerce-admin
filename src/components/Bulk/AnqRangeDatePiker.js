import React, { useState } from "react";
import PropTypes from "prop-types";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";
import { Grid, Grow, TextField } from "@mui/material";
import moment from 'moment';

const AnqRangeDatePiker = ({ onChange }) => {
    const [checked, setChecked] = React.useState(false);
    const [startDateEndDate, setStartDateEndDate] = useState("")
    const [state, setState] = useState([
        {
            startDate: subDays(new Date(), 7),
            endDate: addDays(new Date(), 1),
            key: "selection"
        }
    ]);

    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        let startDate = moment(selection.startDate).format('l')
        let endDate = moment(selection.endDate).format('l')

        onChange(selection);
        console.log(startDate + "-" + endDate, "selectionselection")
        setState([selection]);
        setStartDateEndDate(startDate + "-" + endDate)
    };

    return (
        <div>
            <TextField
                fullWidth
                name="StartDateEndDate"
                label="Start Date - End Date"
                value={startDateEndDate || ""}
                onClick={() => { setChecked(!checked) }}
            />
            <Grow in={checked}>
                <div style={{ position: "absolute", zIndex: "11111" }}>
                    <DateRangePicker
                        onChange={handleOnChange}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={state}
                        direction="horizontal"
                        showMonthAndYearPickers={false}
                    />
                </div>
            </Grow>
        </div>

    );
};

AnqRangeDatePiker.propTypes = {
    onChange: PropTypes.func
};
export default AnqRangeDatePiker;
