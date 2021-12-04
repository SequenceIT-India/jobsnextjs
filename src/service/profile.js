import api from "../util/api";
import { API_URL } from "./urls";

export const createJobProfile = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };

  const result = await api.post(API_URL.PROFILE.CREATE_PROFILE, data, options);

  return result;
};

export const getJobProfile = async (email) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      email,
    },
  };
  const result = await api.get(API_URL.PROFILE.GET_PROFILE, options);

  return result && result.data && result.httpStatus !== 500
    ? result.data
    : null;
};

export const updateJobProfile = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };

  const result = await api.put(API_URL.PROFILE.UPDATE_PROFILE, data, options);

  return result.data;
};

export const uploadUserResume = async (emailId, file) => {
  let formData = new FormData();

  const resumeObj = {
    emailId : sessionStorage.getItem("email"),
    resumeName: file.fileName,
    status: true
  }

  formData.append("resume", file);
  formData.append("resumeObj", JSON.stringify(resumeObj));

  const result = await api.post(API_URL.PROFILE.UPLOAD_RESUME, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    params: {
      emailId,
    },
  });

  return result.data;
};

export const getUserProfilePhoto = async (emailId) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      emailId,
    },
    responseType: "arraybuffer",
  };
  const result = await api
    .get(API_URL.PROFILE.GET_PROFILE_PHOTO, options)
    .then((response) => {
      return response && response.httpStatus === 200
        ? Buffer.from(response.data, "binary").toString("base64")
        : null;
    });
  return result;
};

export const getUserResume = async (emailId) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      emailId,
    },
    responseType: "arraybuffer",
  };

  const result = await api
    .get(API_URL.PROFILE.GET_RESUME, options)
    .then((response) => {
      return response.httpStatus === 200
        ? {
          fileData: Buffer.from(response.data, "binary").toString("base64"),
          fileName: response.headers["content-disposition"]
            ?.split(";")[1]
            ?.split("=")[1]
            ?.split('"')[1],
        }
        : null;
    });

  return result;
};

export const getAdditionalInfo = async (email) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
    params: {
      email,
    },
  };

  const result = await api.get("/addlinfo/getAddlInfo", options);

  return (result.httpStatus === 200 || result.httpStatus === 404) && result.data
    ? result.data
    : null;
};

export const setAdditionalInfo = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.post("/addlinfo/insert-addlinfo", data, options);
  return result ? result.data : null;
};

export const updateAdditionalInfo = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.put("/addlinfo/update-addlinfo", data, options);
  return result ? result.data : null;
};


export const changeEmailAPI = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.post("/user/change-email", data, options);
  return result ? result.data : null;
};

export const changePasswordAPI = async (data, url = "user") => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.post(`/${url}/change-password`, data, options);
  return result ? result.data : null;
};

export const deleteUserAccountAPI = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };

  const result = await api.delete("/user/delete", { data: data }, options);
  return result
};

export const getJobDetails = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };

  const result = await api.get("employer/get-job-details?jobID=20", options);
  return result
};

export const verifyEmail = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.post("/user/verify-email", data, options);
  return result ? result.data : null;
};

export const updateAdditionalInfoLocation = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.post("/addlinfo/update-joblocations", data, options);
  return result ? result.data : null;
};


export const updateAdditionalInfoCertification = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.post("/addlinfo/update-certifications", data, options);
  return result ? result.data : null;
};

export const updateAdditionalInfoAwards= async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.post("/addlinfo/update-awards", data, options);
  return result ? result.data : null;
};

export const updateAdditionalInfoGrpsMember= async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.post("/addlinfo/update-groupsmem", data, options);
  return result ? result.data : null;
};

export const updateAdditionalInfoPublications = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.post("/addlinfo/update-publications", data, options);
  return result ? result.data : null;
};

export const updateAdditionalInfoPatents = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.post("/addlinfo/update-patents", data, options);
  return result ? result.data : null;
};

export const updateAdditionalInfoPersonalInfo = async (data) => {
  const options = {
    headers: {
      "Content-Type": "application/json"
    },
  };
  const result = await api.put("/addlinfo/update-personalInfo", data, options);
  return result ? result.data : null;
};

