// eslint-disable-next-line no-undef
// const ApiUrl = process.env.NEXT_PUBLIC_API_URL_BULK;
const ApiUrl = 'http://localhost:8080/api/';

const UrlParamsReplace = (url, params = {}) => {
  let urlWithPrefix = `${ApiUrl}${url}`;
  if (params) {
    Object.keys(params).forEach((key) => (urlWithPrefix = urlWithPrefix.replace(`:${key}`, params[key])));
  }
  return urlWithPrefix;
};

// User Auth login
export const USER_LOGIN = () => UrlParamsReplace('auth/signin/admin', {});

// ############################################################# Product ##########################################################

// product list
export const GET_PRODUCT_LIST_URL = (size, page, search) =>
  UrlParamsReplace('admin/all-new-products?size=:size&page=:page&search=:search', { size, page, search });

// product add
export const ADD_PRODUCT_URL = () => UrlParamsReplace('admin/add-new-product', {});

// product edit
export const EDIT_PRODUCT_URL = (productId) => UrlParamsReplace('admin/edit-new-product/:productId', { productId });

// product delete
export const DELETE_PRODUCT_URL = (productId) => UrlParamsReplace('admin/delete-new-product/:productId', { productId });

// product get by id
export const GETBYID_PRODUCT_URL = (productId) => UrlParamsReplace('admin/new-product/:productId', { productId });

// #############################################################################################################################

// ############################################################# Categories ##########################################################

// Categories list
export const GET_CATEGORY_LIST_URL = (size, page, search) =>
  UrlParamsReplace('admin/all-categories?size=:size&page=:page&search=:search', { size, page, search });

// category add
export const ADD_CATEGORY_URL = () => UrlParamsReplace('admin/add-category', {});

// category edit
export const EDIT_CATEGORY_URL = (categoryId) => UrlParamsReplace('admin/edit-category/:categoryId', { categoryId });

// category delete
export const DELETE_category_URL = (categoryId) =>
  UrlParamsReplace('admin/delete-category/:categoryId', { categoryId });

// category get by id
export const GETBYID_CATEGORY_URL = (categoryId) => UrlParamsReplace('admin/category/:categoryId', { categoryId });

// Autocomplete Categories list
export const GET_CATEGORY_LIST_AUTOCOMPLETE_URL = () => UrlParamsReplace('admin/all-categories', {});

// Upload image
export const UPLOAD_IMAGE_URL = () => UrlParamsReplace('admin/upload-multi-files', {});

// Upload single file
export const UPLOAD_SINGLE_IMAGE_URL = () => UrlParamsReplace('admin/upload-file', {});

// #############################################################################################################################
