import {Box, Button, TextField, Typography} from "@mui/material";
import {Stack} from "@mui/system";
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


const EditContactListManage = (props)=> {
    const { open, handleClose,user,formik } = props;
    return (
        <Box sx={style}>
            <Stack spacing={3}>
                <Typography variant="subtitle1">Edit New Contact List</Typography>
                <TextField
                    label={"Contact List Name"}
                    fullWidth
                    value={user.name}
                />
                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                    <Button color="inherit" variant="outlined" onClick={handleClose}>
                        Close
                    </Button>
                    <LoadingButton type="submit" variant="contained" onClick={handleClose}>
                        Edit New Contact List
                    </LoadingButton>
                </Stack>
            </Stack>
        </Box>
    )
}
export default EditContactListManage;