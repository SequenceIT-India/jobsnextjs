import axios from "axios";
import {
  browserName,
  deviceType,
  isDesktop,
  osName,
  osVersion,
  fullBrowserVersion,
} from "react-device-detect";
const baseURL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

const apiToUseLocalData = ["/getAvailableSlots", "/getJobs", "/getJobDetails"];

const securityUrls = [
  "/user/login",
  "/user/register",
  "/user/delete",
  "/user/change-email",
  "/user/change-password",
  "/user/verify-email",
  "/employer/login",
  "/employer/register",
  "/employer/change-password"
];

const employerServiceUrls = [
  "/employer/update-recruiter",
  "/employer/post-a-job",
  "/employer/default-job-listing",
  "/jobs",
  'employer/get-job-details'
];

const api = axios.create({
  baseURL: `${baseURL}`,
  timeout: 30000,
});

api.interceptors.request.use(async (config) => {
  const localApi = apiToUseLocalData.indexOf(config.url) !== -1;
  const securityApi = securityUrls.indexOf(config.url) !== -1;
  const employerApi = employerServiceUrls.indexOf(config.url) !== -1;
  config.crossdomain = true;
  if (config) {
    config.headers["BrowserName"] = browserName;
    config.headers["DeviceType"] = isDesktop ? "desktop" : deviceType;
    config.headers["BrowserVersion"] = fullBrowserVersion;
    config.headers["OS"] = `${osName} ${osVersion}`;
    config.headers["Location"] = sessionStorage.getItem("country_code");
    config.headers["IPAddress"] = sessionStorage.getItem("ip");
  }
  config.headers["jwtToken"] = null;
  config.headers["AppID"] = process.env.NEXT_PUBLIC_REACT_APP_JOBSEEKER_TOKEN;
  config.headers["token"] = process.env.NEXT_PUBLIC_REACT_APP_JOBSEEKER_TOKEN;
  if (sessionStorage.getItem("token")) {
    const token = sessionStorage.getItem("token");
    config.headers["jwtToken"] = token;
  }
  if (localApi) {
    return { ...config, url: `${config.url}.json`, baseURL: "/data" };
  } else if (securityApi) {
    return {
      ...config,
      baseURL: `http://104.248.9.38:8080${process.env.NEXT_PUBLIC_REACT_APP_SECURITY_API_URL}`,
    };
  } else if (employerApi) {
    config.headers["AppID"] = process.env.NEXT_PUBLIC_REACT_API_EMPLOYER_TOKEN;
    config.headers["token"] = process.env.NEXT_PUBLIC_REACT_API_EMPLOYER_TOKEN;
    return { ...config, baseURL: process.env.NEXT_PUBLIC_REACT_APP_EMPLOYER_API_URL };
  } else {
    return { ...config };
  }
});

api.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: response.data,
      httpStatus: response.status,
    };
  },
  (err) => {
    if (err.response) {
      if (
        (err.response.status === 404 || err.response.status === 400) &&
        err.response.data
      ) {
        if (err.response.data.code === "1015") {
          const user = JSON.parse(sessionStorage.getItem("user"));
          const redirectURL = user
            ? user.role === "jobseeker"
              ? "/jobseeker/login"
              : "/employer/login"
            : "/home";
          sessionStorage.removeItem("jobseeker");
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("token");
          window.location.href = redirectURL;
        } else {
          return {
            data: {
              ...err.response.data,
            },
            httpStatus: err.response.status,
          };
        }
      } else {
        return {
          data: {
            ...err.response.data,
          },
          httpStatus: err.response.status,
        };
      }
    } else {
      Promise.reject({
        ...err,
        data: {
          ...err,
        },
      });
    }
  }
);

export default api;
