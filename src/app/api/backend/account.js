import {
  URL_BACK_AUTHENTICATE,
  URL_BACK_FORGOT_PASSWORD,
} from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";

export function authenticate(values) {
  return apiBackEnd.post(URL_BACK_AUTHENTICATE, values);
}

export function resetPassword(values) {
  return apiBackEnd.post(URL_BACK_FORGOT_PASSWORD, values);
}
