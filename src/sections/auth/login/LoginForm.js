import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { useRouter } from 'next/router';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { login_user_slice } from 'src/redux/slices/user';
import { dispatch } from 'src/redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import first
import { useSelector } from 'react-redux';
import { PAnotifyError } from 'src/utils/tostMessage';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();
  const { pathname, push } = useRouter();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);
  const { objUserDetails } = useSelector((state) => state.user);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  // const onSubmit = async (data) => {
  //   try {
  //     let res = await dispatch(login_user_slice({ email: data.email, password: data.password }))
  //   } catch (error) {
  //     console.error(error);
  //     reset();
  //     if (isMountedRef.current) {
  //       setError('afterSubmit', { ...error, message: error.message });
  //     }
  //   }
  // };

  useEffect(() => {
    if (objUserDetails) {
      if (objUserDetails.success == "true") {
        push('/product/productList/');
      } else if (objUserDetails.success == "false") {
        console.log("objUserDetails.success");
        PAnotifyError(objUserDetails.message)
      }
    }
  }, [objUserDetails])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="subtitle2">Forgot password?</Link>
        </NextLink>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        autoClose={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </FormProvider>
  );
}
