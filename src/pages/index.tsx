import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import HomeListItem from "../components/home-page/home-job-list.js";
import axios from "axios";

const HomeList: NextPage = (props) => {
  const [selectedJob, setSelectedJob] = useState(null);
  
  
  const selectJob = (job: any) => {
    setSelectedJob(job);
  };
  return (
    <HomeListItem {...props} selectedJob={null} selectJob={selectJob} />
  );
};


export async function getServerSideProps(context: any) {
  const { id = 0 } = context.query;
  // Fetch data from external API
  const options = {
    headers: {
      "Content-Type": "application/json",
      token: 'jiuiuiiiiiiiiiiiiiiiiiiiiiii',
      jwtToken: 'ffsrewrw'
    },
    crossdomain: true
  };
  const res = await axios.post('http://104.131.121.145:8080/employer-service/jobs', {
    "pageNo": 1,
    "pageSize": 5,
    "jobStatus": [
      0
    ]
  }, options);
  console.log('context', res.data?.jobs)
  return { props: { jd: {}, jobs: res.data?.jobs } }
}
export default HomeList;
