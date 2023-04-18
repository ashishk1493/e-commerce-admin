import * as HttpService from './http.service';
import { ADD_PRODUCT_URL, DELETE_PRODUCT_URL, EDIT_PRODUCT_URL, GETBYID_PRODUCT_URL, GET_PRODUCT_LIST_URL } from './url.bulkservice';

export const get_product_list_service = (size, page, search) => {
  return HttpService.getWithAuthWithToken(GET_PRODUCT_LIST_URL(size, page, search), {});
};

export const add_product_service = (data) => {
  return HttpService.postWithAuth(ADD_PRODUCT_URL(), { ...data });
};

export const edit_product_service = (data, productId) => {
  return HttpService.putWithAuth(EDIT_PRODUCT_URL(productId), { ...data });
};

export const getbyid_product_service = (productId) => {
  return HttpService.getWithAuthWithToken(GETBYID_PRODUCT_URL(productId));
};

export const delete_product_service = (productId) => {
  return HttpService.deleteWithAuth(DELETE_PRODUCT_URL(productId));
};
