import * as HttpService from './http.service';
import { GET_CATEGORY_LIST_AUTOCOMPLETE_URL, GET_CATEGORY_LIST_URL, UPLOAD_IMAGE_URL } from './url.bulkservice';

export const get_category_list_service = (size, page, search) => {
  return HttpService.getWithAuthWithToken(GET_CATEGORY_LIST_URL(size, page, search), {});
};

export const get_category_list_autocomplete_service = () => {
  return HttpService.getWithAuthWithToken(GET_CATEGORY_LIST_AUTOCOMPLETE_URL(), {});
};

export const upload_image_service = (files) => {
  return HttpService.postWithAuth(UPLOAD_IMAGE_URL(), files);
};
