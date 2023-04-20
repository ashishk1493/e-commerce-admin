import * as HttpService from './http.service';
import { ADD_ORDER_URL, DELETE_ORDER_URL, EDIT_ORDER_URL, GETBYID_ORDER_URL, GET_ORDER_LIST_URL } from './url.bulkservice';

export const get_order_list_service = (size, page, search) => {
  return HttpService.getWithAuthWithToken(GET_ORDER_LIST_URL(size, page, search), {});
};

export const add_order_service = (data) => {
  return HttpService.postWithAuth(ADD_ORDER_URL(), { ...data });
};

export const getbyid_order_service = (orderId) => {
  return HttpService.getWithAuthWithToken(GETBYID_ORDER_URL(orderId));
};