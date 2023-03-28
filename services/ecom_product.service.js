import * as HttpService from "./http.service";
import {
  ADD_PRODUCT_URL,
  GET_PRODUCT_LIST_URL
} from "./url.bulkservice";

export const get_product_list_service = (size, page, search) => {
  return HttpService.getWithAuthWithToken(GET_PRODUCT_LIST_URL(size, page, search), {});
};

export const add_product_service = (data) => {
  return HttpService.postWithAuth(ADD_PRODUCT_URL(), { ...data });
};