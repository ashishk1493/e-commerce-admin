import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Autocomplete } from '@mui/material';

import AnqAutocomplete from './FormImputs/AnqAutocomplete';
// import AnqAutocomplete from '../../../src/components/comman/FormImputs/AnqAutocomplete';
// import AnqAutocomplete from 'src/components/comman/FormImputs/AnqAutocomplete';

const FormikCommanNew = (props) => {
  const { loading, schema, initialValuesProps, onSubmitProps, Ch } = props;
  const validationSchema = yup.object(schema);

  const formik = useFormik({
    initialValues: initialValuesProps,
    validationSchema: validationSchema,
    onSubmit: onSubmitProps,
  });

  return (
    Ch({ formik: formik, loading: loading })
  );
};

export default FormikCommanNew