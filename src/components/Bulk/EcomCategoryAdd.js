import { Autocomplete, Box, Button, Card, CircularProgress, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { LoadingButton } from '@mui/lab';

import { getPerticulerKeyFromSelectedValue } from '../../utils/autocompleteUtils';
import AnqAutocomplete from '../comman/FormImputs/AnqAutocomplete';
import AnqCounterTextArea from "./AnqCounterTextArea";
import { useSelector } from 'react-redux';
import FormDisabledOnLoading from '../comman/FormDisabledOnLoading';
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../hook-form';
import styled from '@emotion/styled';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import BlockContent from '../upload/BlockContent';
import Compressor from 'compressorjs';
import { upload_image_service } from 'services/ecom_category.service';

// import { RHFEditor, RHFRadioGroup, RHFSwitch, TextField, RHFUploadMultiFile } from '../hook-form';

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
];

const GENDER_OPTION = ['Men', 'Women', 'Kids'];

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const SIZE_OPTION = [
  '6',
  '7',
  '8',
  '9',
  '10',
];


const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));


// image uploading
const EcomCategoryAdd = (props) => {
  // const { loading, formik } = props
  const { loading, formik } = props
  const { isLoading, category_list_autocomplete } = useSelector((state) => state.ecom_category);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      formik.setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [formik.setValue]
  );
  const handleRemoveAll = () => {
    formik.setValue('images', []);
  };
  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    formik.setValue('images', filteredItems);
  };
  // const onImageChnage = (e) => {
  //   let files = e.target.files
  //   console.log(files, "files");
  // }

  const onImageChnage = async (event) => {
    const lengthUploadFile = event.target.files.length;
    const data = new FormData();
    for (let i = 0; i < lengthUploadFile; i++) {
      const file = event.target.files[i];
      data.append('files', file);
    }
    let res = await upload_image_service(data)
  }

  console.log(category_list_autocomplete, "category_list_autocomplete");
  console.log(formik.errors, "formik.errors");
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="name"
                label="Product Name"
                value={formik.values.name || ""}
                onChange={(e) => {
                  formik.setFieldValue("name", e.target.value)
                }}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <div>
                <LabelStyle>Images</LabelStyle>
                <input
                  type="file"
                  accept='image/png, image/gif, image/jpeg'
                  id="contained-button-file"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => onImageChnage(e)}
                />
                <label htmlFor="contained-button-file" style={{ cursor: "pointer" }}>
                  <BlockContent />
                </label>
              </div>
            </Stack>
            <LoadingButton type="submit" variant="contained" loading={loading} style={{ zIndex: "1" }}>
              Add category
            </LoadingButton>
          </Card>
        </Grid>
      </Grid>
    </form>
  )
}

export default EcomCategoryAdd