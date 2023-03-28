import {Box, Button, TextField, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import AnqAutocomplete from "../../comman/FormImputs/AnqAutocomplete";
import {LoadingButton} from "@mui/lab";
import React, {useState} from "react";

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
export default function CustomPaymentModel(props){

    const [amount,setamount] = useState('')
    const { open, handleClose } = props

    return (
        <>
            <Box sx={style}>
                <Stack spacing={3}>
                    <Typography variant="subtitle1">Add Personal Details</Typography>
                    <TextField
                        fullWidth
                        name="amount"
                        label="Amount"
                        value={amount}
                        onChange={(e) => {
                            setamount(e.target.value)
                        }}
                        error={true}
                        helperText={'Custom payment will not auto credit to your wallet contact us after making the payment contact us.'}
                    />

                    <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                        <Button color="inherit" variant="outlined" onClick={handleClose}>
                            Close
                        </Button>
                        <LoadingButton type="submit" variant="contained" onClick={handleClose}>
                            Save
                        </LoadingButton>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}