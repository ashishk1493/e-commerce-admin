import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import Cookies from 'universal-cookie';
import { dispatch } from '../store';
import {
  get_category_list_autocomplete_service,
  get_category_list_service,
} from '../../../services/ecom_category.service';
import { setAuth } from 'services/identity.service';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  category_list: [],
  category_list_autocomplete: [],
};

const slice = createSlice({
  name: 'ecom_category',
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
      state.category_list = action.payload;
    },
    setListDataAUtocomleteList(state, action) {
      state.isLoading = false;
      state.category_list_autocomplete = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setListData, setListDataAUtocomleteList } = slice.actions;

// // ----------------------------------------------------------------------

export function get_category_list_slice({ size, page, search }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await get_category_list_service(size, page, search);
      console.log(response.data.data.category, 'response.data.data');
      dispatch(slice.actions.setListData(response.data.data.category));
      return response.data.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function get_category_list_autocomplete_slice() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await get_category_list_autocomplete_service();
      console.log(response.data.data.category, 'response.data.data');
      dispatch(slice.actions.setListDataAUtocomleteList(response.data.data.category));
      return response.data.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
