import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import React from "react";
import Modal from "@mui/material/Modal";
import * as yup from "yup";
import FormikCommanNew from "../../../comman/FormikCommanNew";

const style = {
    position: 'absolute',
    borderRadius: "10px",
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const modelStyle = {
    opacity: 0.3
};
const numberRegex = /^\d*(\.\d+)?$/

const EditSender = (props) => {
    const { open, handleClose, user } = props;
    console.log(user, "useruser");
    return (
        <div style={modelStyle}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack spacing={3}>
                        <Typography variant="subtitle1">Edit Sender ID Request</Typography>
                        <FormikCommanNew
                            schema={{
                                header_id: yup.number().min(10, 'Please enter at least 10 characters').required('This field is required.'),
                                entity_id: yup.string().matches(numberRegex, "Enter only number").min(10, 'Please enter at least 10 characters').required('This field is required.'),
                                entity_name: yup.string().matches(numberRegex, "Enter only number").min(10, 'Please enter at least 10 characters').required('This field is required.'),
                            }}
                            initialValuesProps={{
                                header_id: user?.header_id,
                                entity_id: "",
                                entity_name: "",
                            }}
                            onSubmitProps={values => {
                                console.log("VALUE MALIE GAY", values);
                            }}
                            Ch={editSenderForm}
                        />
                    </Stack>
                </Box>
            </Modal>
        </div>

    )
}
export default EditSender;

let editSenderForm = (props) => {
    const { formik, handleClose } = props
    const isSubmitting = false
    return (
        <form
            style={{
                padding: "15px 0"
            }}
            onSubmit={formik.handleSubmit}
        >
            <Grid container spacing={2}
                style={{
                    marginBottom: '20px',
                    alignItems: "center"
                }}
            >
                <Grid item xs={12}>
                    <TextField
                        type={"text"}
                        fullWidth
                        name="header_id"
                        label="Enter Header ID"
                        value={formik.values.header_id || ""}
                        onChange={(e) => {
                            formik.setFieldValue("header_id", e.target.value)
                        }}
                        error={formik.touched.header_id && Boolean(formik.errors.header_id)}
                        helperText={formik.touched.header_id && formik.errors.header_id}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type={"text"}
                        fullWidth
                        name="entity_id"
                        label="Enter Entity ID"
                        value={formik.values.entity_id || ""}
                        onChange={(e) => {
                            formik.setFieldValue("entity_id", e.target.value)
                        }}
                        error={formik.touched.entity_id && Boolean(formik.errors.entity_id)}
                        helperText={formik.touched.entity_id && formik.errors.entity_id}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type={"text"}
                        fullWidth
                        name="entity_name"
                        label="Enter Entity Name"
                        value={formik.values.entity_name || ""}
                        onChange={(e) => {
                            formik.setFieldValue("entity_name", e.target.value)
                        }}
                        error={formik.touched.entity_name && Boolean(formik.errors.entity_name)}
                        helperText={formik.touched.entity_name && formik.errors.entity_name}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{ mt: 3 }}
                    style={{
                        textAlign: "end"
                    }}>
                    <div>
                        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                            <Button color="inherit" variant="outlined" onClick={handleClose}>
                                Close
                            </Button>
                            <LoadingButton type="submit" variant="contained" onClick={handleClose}>
                                Edit Sender Id Request
                            </LoadingButton>
                        </Stack>
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}