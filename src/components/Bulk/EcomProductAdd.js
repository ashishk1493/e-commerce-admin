import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { LoadingButton } from '@mui/lab';

import { getPerticulerKeyFromSelectedValue } from '../../utils/autocompleteUtils';
import AnqAutocomplete from '../comman/FormImputs/AnqAutocomplete';
import AnqCounterTextArea from './AnqCounterTextArea';
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
import { PAnotifyError, PAnotifySuccess } from 'src/utils/tostMessage';
import PreviewImage from './PreviewImage';

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

const SIZE_OPTION = ['6', '7', '8', '9', '10'];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const UplodedLabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
}));

// image uploading
const EcomProductAdd = (props) => {
  // const { loading, formik } = props
  const { loading, formik } = props;
  const [fileList, setFileList] = useState([]);
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
  console.log(fileList, 'fileList-');

  const onImageChnageEvent = async (event) => {
    let lstFiles = event.target.files;
    let lstTmpFile = [...lstFiles];
    setFileList(lstTmpFile);
    const data = new FormData();
    for (let i = 0; i < lstFiles.length; i++) {
      const file = lstFiles[i];
      data.append('files', file);
    }
    let res = await upload_image_service(data);
    if (res?.data?.success) {
      PAnotifySuccess(res.data.message);
      formik.setFieldValue('images', [...formik.values.images, ...res.data.imageUrl]);
    } else {
      PAnotifyError("Something went wrong");
    }
  };

  const handleRemoveAll = () => {
    // setValue('images', []);
    formik.setFieldValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = formik.values.images?.filter((_file) => _file !== file);
    formik.setFieldValue('images', filteredItems);
  };

  console.log(category_list_autocomplete, 'category_list_autocomplete');
  console.log(formik.errors, 'formik.errors');
  return (
    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="name"
                label="Product Name"
                value={formik.values.name || ''}
                onChange={(e) => {
                  formik.setFieldValue('name', e.target.value);
                }}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <div>
                {/* <LabelStyle>Description</LabelStyle> */}
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  rows={6}
                  multiline
                  value={formik.values.description || ''}
                  onChange={(e) => {
                    formik.setFieldValue('description', e.target.value);
                  }}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </div>

              <div>
                <LabelStyle>Images</LabelStyle>
                <input
                  type="file"
                  name="files"
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={onImageChnageEvent}
                />
                <label htmlFor="contained-button-file" style={{ cursor: 'pointer' }}>
                  <BlockContent />
                </label>
                {/* <UplodedLabelStyle>
                  {fileList && fileList.map((objFile) => <div>{objFile?.name}</div>)}
                </UplodedLabelStyle> */}
              </div>
            </Stack>
            <PreviewImage files={formik.values.images} showPreview={true} onRemove={handleRemove} onRemoveAll={handleRemoveAll} />
            {/* <div style={{ gap: "5px", display: "grid", gridColumn: "auto" }}>
              {formik.values.images.map((value) => {
                console.log(value, 'value-=-=');
                return (
                  <div style={{ width: "80px", height: "80px", borderRadius: "5px" }}>
                    <img
                      src={'http://localhost:8080' + value}
                      alt="Product Image"
                      style={{ width: "100%", height: "100%", borderRadius: "5px" }}
                    />
                  </div>
                )
              })}
            </div> */}
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              {/* <RHFSwitch name="inStock" label="In stock" /> */}

              <Stack spacing={3} mt={2} style={{ zIndex: 1 }}>
                {/* category */}
                <AnqAutocomplete
                  label="Category"
                  name="category_id"
                  // disablePortal
                  options={category_list_autocomplete}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => {
                    let valueTmp = getPerticulerKeyFromSelectedValue(e, value, 'name');
                    formik.setFieldValue('category_id', valueTmp);
                  }}
                  required={true}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="category_id"
                      label="Category"
                      variant="outlined"
                      fullWidth
                      error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                      helperText={formik.touched.category_id && formik.errors.category_id}
                    />
                  )}
                />

                <TextField
                  fullWidth
                  name="sku"
                  label="Product SKU"
                  value={formik.values.sku || ''}
                  onChange={(e) => {
                    formik.setFieldValue('sku', e.target.value);
                  }}
                  error={formik.touched.sku && Boolean(formik.errors.sku)}
                  helperText={formik.touched.sku && formik.errors.sku}
                />
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <TextField
                  fullWidth
                  name="price"
                  label="Price"
                  value={formik.values.price || ''}
                  onChange={(e) => {
                    formik.setFieldValue('price', e.target.value);
                  }}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
                <TextField
                  fullWidth
                  name="mrp"
                  label="Mrp"
                  value={formik.values.mrp || ''}
                  onChange={(e) => {
                    formik.setFieldValue('mrp', e.target.value);
                  }}
                  error={formik.touched.mrp && Boolean(formik.errors.mrp)}
                  helperText={formik.touched.mrp && formik.errors.mrp}
                />
                <TextField
                  fullWidth
                  name="qty"
                  label="Quntity"
                  value={formik.values.qty || ''}
                  onChange={(e) => {
                    formik.setFieldValue('qty', e.target.value);
                  }}
                  error={formik.touched.qty && Boolean(formik.errors.qty)}
                  helperText={formik.touched.qty && formik.errors.qty}
                />
                {/* <AnqAutocomplete
                  label="Sizes"
                  name="sizes"
                  disablePortal
                  options={SIZE_OPTION}
                  onChange={((e, value) => {
                    formik.setFieldValue("sizes", value)
                  })}
                  required={true}
                  renderInput={params => (
                    <TextField
                      {...params}
                      name="sizes"
                      label="Sizes"
                      variant="outlined"
                      fullWidth
                      error={formik.touched.sizes && Boolean(formik.errors.sizes)}
                      helperText={formik.touched.sizes && formik.errors.sizes}
                    />
                  )}
                /> */}
              </Stack>

              {/* <RHFSwitch name="taxes" label="Price includes taxes" /> */}
            </Card>
            <LoadingButton type="submit" variant="contained" loading={loading} style={{ zIndex: '1' }}>
              Add Product
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default EcomProductAdd;
