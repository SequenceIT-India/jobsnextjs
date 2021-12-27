
const baseURL = 'https://dev-app.onebigtech.com:8443'
export const API_URL = {
  AUTH: {
    USER_REGISTER: "/user/register",
    USER_LOGIN: "/user/login",
    RECRUITER_LOGIN: "/employer/login",
    RECRUITER_REGISTER: "/employer/register",
  },
  JOBS: {
    DEFAULT_LIST: `${baseURL}/employer-service/jobs`,
  },
  PROFILE: {
    GET_PROFILE: "/profile/getFullProfile",
    CREATE_PROFILE: "/profile/profile-register",
    UPDATE_PROFILE: "/profile/update-profile",
    UPLOAD_RESUME: "/resumeandcover/upload-resume",
    GET_PROFILE_PHOTO: "/profile/get-profilephoto",
    GET_RESUME: "/profile/get-resume",
  },
};
