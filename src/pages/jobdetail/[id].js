
import { default as React, useEffect, useState } from "react";
import HomeListItem from "../../components/home-page/home-job-list.js";
import axios from "axios";

const DetailPage = (props) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const selectJob = (job) => {
    debugger
    setSelectedJob(job);
  };
  console.log('props', props)
  return (
    <HomeListItem {...props} selectedJob={selectedJob} selectJob={selectJob} />
  );
}
export async function getServerSideProps(context) {
  const { id = 0 } = context.query;
  // Fetch data from external API
  const options = {
    headers: {
      "Content-Type": "application/json",
      token: 'jiuiuiiiiiiiiiiiiiiiiiiiiiii',
    },
    crossdomain: true
  };
  const res = await axios.post('http://104.131.121.145:8080/employer-service/jobs', {
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
  console.log('context', res.data?.jobs)

  const jd = res.data?.jobs?.find((job) => job.jobID == id);

  return { props: { jd: jd || {}, jobs: res.data?.jobs } }

}
export default DetailPage
