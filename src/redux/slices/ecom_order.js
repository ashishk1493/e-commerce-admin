import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import Cookies from 'universal-cookie';
import { dispatch } from '../store';
import { get_order_list_service } from '../../../services/ecom_order.service';
import { setAuth } from 'services/identity.service';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  order_list: [],
};

const slice = createSlice({
  name: 'ecom_order',
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

    // for Listing order Data
    setListData(state, action) {
      state.isLoading = false;
      state.order_list = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setListData } = slice.actions;

// // ----------------------------------------------------------------------

export function get_order_list_slice(size, page, search) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await get_order_list_service(size, page, search);
      console.log(response.data.data.orders, 'response.data.data');
      dispatch(slice.actions.setListData(response.data.data.orders));
      return response.data.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
