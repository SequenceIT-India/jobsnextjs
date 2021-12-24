
import axios from "axios";

export const getDefaultJobs = async (url) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      appID: process.env.NEXT_PUBLIC_REACT_APP_JOBSEEKER_TOKEN,
      token: process.env.NEXT_PUBLIC_REACT_APP_JOBSEEKER_TOKEN,
    },
    crossdomain: true
  };
  const res = await axios.post(url, {
    "pageNo": 1,
    "pageSize": 5,
    "jobStatus": [
      "active"
    ]
  }, options);
  return res;
};
