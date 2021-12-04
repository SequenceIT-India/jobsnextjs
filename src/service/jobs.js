import api from "../util/api";
import { API_URL } from "./urls";
import axios from "axios";

export const getDefaultJobs = async () => {
  
  const options = {
    headers: {
      "Content-Type": "application/json",
      token: 'jiuiuiiiiiiiiiiiiiiiiiiiiiii',
    },
    crossdomain: true
  };
  const res = await axios.post('/employer-service/jobs', {
    "pageNo": 1,
    "pageSize": 5,
    "searchTerm": "java",
    "city": "Hyd",
    "state": "Telangana",
    "zipCode": 1234,
    "jobStatus": [
      0
    ]
  }, options);
  return res;
};
