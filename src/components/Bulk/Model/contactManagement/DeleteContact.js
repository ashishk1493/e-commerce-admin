import {Box, Button, TextField, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import AnqAutocomplete from "../../../comman/FormImputs/AnqAutocomplete";
import {LoadingButton} from "@mui/lab";
import React from "react";

const style = {
    position: 'absolute',
    borderRadius: "20px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const DeleteContact = (props) => {
    const {handleClose, id} = props;
    console.log(id,'deleted user id ')
    return (
        <Box sx={style}>
            <Stack spacing={3}>
                <Typography variant="subtitle1">Are you sure?</Typography>
                You will not be able to recover this imaginary file!

                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                    <Button color="inherit" variant="outlined" onClick={handleClose}>
                        Close
                    </Button>
                    <LoadingButton type="submit" variant="contained" onClick={handleClose}>
                        Delete
                    </LoadingButton>
                </Stack>
            </Stack>
        </Box>)
}

export default DeleteContact;