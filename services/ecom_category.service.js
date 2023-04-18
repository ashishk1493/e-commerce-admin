import * as HttpService from './http.service';
import {
  GET_CATEGORY_LIST_AUTOCOMPLETE_URL,
  GET_CATEGORY_LIST_URL,
  UPLOAD_IMAGE_URL,
  UPLOAD_SINGLE_IMAGE_URL,
} from './url.bulkservice';

export const get_category_list_service = (size, page, search) => {
  return HttpService.getWithAuthWithToken(GET_CATEGORY_LIST_URL(size, page, search), {});
};

export const add_category_service = (data) => {
  return HttpService.postWithAuth(ADD_CATEGORY_URL(), { ...data });
};

export const edit_category_service = (data, categoryId) => {
  return HttpService.putWithAuth(EDIT_CATEGORY_URL(categoryId), { ...data });
};

export const getbyid_category_service = (categoryId) => {
  return HttpService.getWithAuthWithToken(GETBYID_CATEGORY_URL(categoryId));
};

export const get_category_list_autocomplete_service = () => {
  return HttpService.getWithAuthWithToken(GET_CATEGORY_LIST_AUTOCOMPLETE_URL(), {});
};

export const upload_image_service = (files) => {
  return HttpService.postWithAuth(UPLOAD_IMAGE_URL(), files);
};

export const upload_single_image_service = (file) => {
  return HttpService.postWithAuth(UPLOAD_SINGLE_IMAGE_URL(), file);
};
