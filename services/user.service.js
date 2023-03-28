import * as HttpService from "./http.service";
import {
  USER_LOGIN
} from "./url.bulkservice";

export const login_user_service = (email, password) => {
  return HttpService.postWithOutAuth(USER_LOGIN(), { email, password });
};