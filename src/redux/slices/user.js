import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// import Cookies from "universal-cookie";
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import { login_user_service } from '../../../services/user.service.js'
import { setAuth } from 'services/identity.service';
// next
import Router, { useRouter } from 'next/router';
// import { notifyError } from 'src/utils/bulkComman';
// import 'react-toastify/dist/ReactToastify.css';

// const { pathname, query } = useRouter();

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  objUserDetails: {},
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // HAS ERROR
    setuserDetails(state, action) {
      state.isLoading = false;
      state.objUserDetails = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setuserDetails, setCountryList } = slice.actions;

// // ----------------------------------------------------------------------

export function login_user_slice({ email, password }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await login_user_service(email, password)
      console.log(response.data, "response-");
      if (response.data.success == 'true') {
        dispatch(slice.actions.setuserDetails(response.data));
      } else {
        dispatch(slice.actions.setuserDetails(response.data));
      }
      setAuth({ token: response.data.data.accessToken })
      return response.data
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}