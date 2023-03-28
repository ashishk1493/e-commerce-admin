import { TextField } from "@mui/material";
import React, { useState } from "react";

const AnqCounterTextArea = (props) => {
    const [message, setMessage] = useState("")
    return (
        <div>
            <TextField
                {...props}
                onChange={(e) => {
                    props.onChange(e)
                    setMessage(e.target.value)
                }}
            />

            <ul className={'m-3'} >
                <li>Encoding: GSM_7BIT</li>
                <li>Length:{message ? message.length : 0}</li>
                <li>Messages:{Math.ceil(message.length / 160)}</li>
                <li>Per Message: 160</li>
                <li>Remaining:{(message.length - ((Math.floor(message.length / 160) * 160))) ?
                    (160 - (message.length - ((Math.floor(message.length / 160) * 160))))
                    :
                    0}</li>
            </ul>
        </div>
    );
};

export default AnqCounterTextArea;
