import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import Cookies from "universal-cookie";
import { dispatch } from '../store';
import { get_product_list_service } from '../../../services/ecom_product.service'
import { setAuth } from 'services/identity.service';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  product_list: []
};

const slice = createSlice({
  name: 'ecom_product',
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

    // for transaction hostory list
    setListData(state, action) {
      state.isLoading = false;
      state.product_list = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setListData } = slice.actions;

// // ----------------------------------------------------------------------

export function get_product_list_slice({ size, page, search }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await get_product_list_service(size, page, search)
      console.log(response.data.data.data, "response.data.data");
      dispatch(slice.actions.setListData(response.data.data.data));
      return response.data.data
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}