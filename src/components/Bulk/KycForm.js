import { Autocomplete, Box, Button, Card, Grid, Stack, TextField } from '@mui/material'
import React from 'react'
import { LoadingButton } from '@mui/lab';

import { getPerticulerKeyFromSelectedValue } from '../../utils/autocompleteUtils';
import AnqAutocomplete from '../comman/FormImputs/AnqAutocomplete';
import { useSelector } from 'react-redux';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
];



const KycForm = (props) => {
  const { formik } = props;
  const isSubmitting = false;
  console.log(formik.values,';formik.values');

  const {user_kyc_data} = useSelector((state)=> state.kyc)
  console.log(user_kyc_data?.kyc_details.kyc_documents[0].File1url,'user_kyc_data?.kyc_details?.name');
  
  const downloadUrl = `${user_kyc_data?.kyc_details.kyc_documents[0].File1url}`;

  const handleDownload = (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'file.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack style={{ display: "flex" }} spacing={3} alignItems="flex-end">
                {/* <div>
                  Status:
                </div> */}
                <LoadingButton variant="contained" loading={isSubmitting}>
                  APPROVED
                </LoadingButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Name  */}
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={user_kyc_data?.kyc_details?.name}
                onChange={(e) => {
                  formik.setFieldValue("name", e.target.value)
                }}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                InputLabelProps={{ shrink: true,readOnly:true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Email  */}
              <TextField
                fullWidth
                name="Email"
                label="Email"
                value={user_kyc_data?.kyc_details?.email || ""}
                onChange={(e) => {
                  formik.setFieldValue("Email", e.target.value)
                }}
                error={formik.touched.Email && Boolean(formik.errors.Email)}
                helperText={formik.touched.Email && formik.errors.Email}
                InputLabelProps={{ shrink: true,readOnly:true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Phone No  */}
              <TextField
                fullWidth
                name="phoneNo"
                label="Phone No"
                value={user_kyc_data?.kyc_details?.phone_no || ""}
                onChange={(e) => {
                  formik.setFieldValue("phoneNo", e.target.value)
                }}
                error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
                helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                InputLabelProps={{ shrink: true,readOnly:true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Alternate No  */}
              <TextField
                fullWidth
                name="alternateNo"
                label="Alternate No"
                value={user_kyc_data?.kyc_details?.alternate_number || ""}
                onChange={(e) => {
                  formik.setFieldValue("alternateNo", e.target.value)
                }}
                error={formik.touched.alternateNo && Boolean(formik.errors.alternateNo)}
                helperText={formik.touched.alternateNo && formik.errors.alternateNo}
                InputLabelProps={{ shrink: true,readOnly:true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Address1  */}
              <TextField
                fullWidth
                name="address1"
                label="Address1"
                value={user_kyc_data?.kyc_details?.address1 || ""}
                onChange={(e) => {
                  formik.setFieldValue("address1", e.target.value)
                }}
                error={formik.touched.address1 && Boolean(formik.errors.address1)}
                helperText={formik.touched.address1 && formik.errors.address1}
                InputLabelProps={{ shrink: true,readOnly:true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Address2  */}
              <TextField
                fullWidth
                name="address2"
                label="Address2"
                value={user_kyc_data?.kyc_details?.address2 || ""}
                onChange={(e) => {
                  formik.setFieldValue("address2", e.target.value)
                }}
                error={formik.touched.address2 && Boolean(formik.errors.address2)}
                helperText={formik.touched.address2 && formik.errors.address2}
                InputLabelProps={{ shrink: true,readOnly:true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* City  */}
              <TextField
                fullWidth
                name="city"
                label="City"
                value={user_kyc_data?.kyc_details?.city || ""}
                onChange={(e) => {
                  formik.setFieldValue("city", e.target.value)
                }}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                InputLabelProps={{ shrink: true,readOnly:true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* State  */}
              <TextField
                fullWidth
                name="state"
                label="State"
                value={user_kyc_data?.kyc_details?.state || ""}
                onChange={(e) => {
                  formik.setFieldValue("state", e.target.value)
                }}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                InputLabelProps={{ shrink: true,readOnly:true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* NID- National ID card */}
              <AnqAutocomplete
                label="NID- National ID card"
                name="scheduled"
                disablePortal
                options={[{
                  label:user_kyc_data?.address_proof_type?.document_name,
                  value:user_kyc_data?.address_proof_type?.document_name
                }]}
                value={
                  {label:user_kyc_data?.address_proof_type?.document_name,
                  value:user_kyc_data?.address_proof_type?.document_name}
                }
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("scheduled", valueTmp)
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="scheduled"
                    label="NID- National ID card"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.scheduled && Boolean(formik.errors.scheduled)}
                    helperText={formik.touched.scheduled && formik.errors.scheduled}
                    InputLabelProps={{ shrink: true,readOnly:true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* File Type */}
              <AnqAutocomplete
                label="File Type"
                name="scheduled"
                disablePortal
                options={top100Films}
                value={{
                  label:user_kyc_data?.pan_card?.address_proof_type,
                  value:user_kyc_data?.pan_card?.address_proof_type
                }}
                onChange={((e, value) => {
                  let valueTmp = getPerticulerKeyFromSelectedValue(e, value, "label")
                  formik.setFieldValue("scheduled", valueTmp)
                })}
                required={true}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="scheduled"
                    label="File Type"
                    variant="outlined"
                    fullWidth
                    error={formik.touched.scheduled && Boolean(formik.errors.scheduled)}
                    helperText={formik.touched.scheduled && formik.errors.scheduled}
                    InputLabelProps={{ shrink: true,readOnly:true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* documentId  */}
              <TextField
                fullWidth
                name="documentId"
                label="documentId"
                value={user_kyc_data?.address_proof_type?.document_id || ""}
                onChange={(e) => {
                  formik.setFieldValue("documentId", e.target.value)
                }}
                error={formik.touched.documentId && Boolean(formik.errors.documentId)}
                helperText={formik.touched.documentId && formik.errors.documentId}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Front End File  */}
              Front End File
              <div>Download</div>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Back End File  */}
              Back End File
              <div>Download</div>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* National Tax Identification Number  */}
              <TextField
                fullWidth
                name="nationalTaxIdentificationNumber"
                label="National Tax Identification Number"
                value={user_kyc_data?.pan_card?.document_id || ""}
                onChange={(e) => {
                  formik.setFieldValue("nationalTaxIdentificationNumber", e.target.value)
                }}
                error={formik.touched.nationalTaxIdentificationNumber && Boolean(formik.errors.nationalTaxIdentificationNumber)}
                helperText={formik.touched.nationalTaxIdentificationNumber && formik.errors.nationalTaxIdentificationNumber}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Front End File  */}
              Front End File
              <div>
              <a href={downloadUrl} onClick={handleDownload}>
                Download File
               </a>
                  1
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* Vat/GST  */}
              <TextField
                fullWidth
                name="vatGST"
                label="Vat/GST"
                value={formik.values.vatGST || ""}
                onChange={(e) => {
                  formik.setFieldValue("vatGST", e.target.value)
                }}
                error={formik.touched.vatGST && Boolean(formik.errors.vatGST)}
                helperText={formik.touched.vatGST && formik.errors.vatGST}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </form>
  )
}

export default KycForm