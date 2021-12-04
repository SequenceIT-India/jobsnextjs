import api from "../util/api";
import { API_URL } from "./urls";
const { REACT_APP_TOKEN_URL } = process.env;

export const register = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      token: REACT_APP_TOKEN_URL,
    },
  };

  const requestData = {
    userPrivacyPolicyVersion:
      process.env.REACT_APP_JOBSEEKER_REGISTER_PRIVACY_POL_VERSION,
    userTermsVersion: process.env.REACT_APP_JOBSEEKER_REGISTER_TERMS_VERSION,
    ...data,
  };

  const result = await api.post(
    API_URL.AUTH.USER_REGISTER,
    requestData,
    options
  );

  return result;
};
export const login = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      token: REACT_APP_TOKEN_URL,
    },
  };
  const result = await api.post(API_URL.AUTH.USER_LOGIN, data, options);
  return result;
};

export const employerLogin = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      token: REACT_APP_TOKEN_URL,
    },
  };
  const result = await api.post(API_URL.AUTH.RECRUITER_LOGIN, data, options);
  return result;
};

export const employerRegister = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      token: REACT_APP_TOKEN_URL,
    },
  };

  const result = await api.post(API_URL.AUTH.RECRUITER_REGISTER, data, options);

  return result;
};
