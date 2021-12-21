import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import HomeListItem from "../components/home-page/home-job-list.js";
import axios from "axios";
import { API_URL } from '../service/urls';

const HomeList: NextPage = (props) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const propsItem = props || { jd: {}, jobs: [] };

  const selectJob = (job: any) => {
    setSelectedJob(job);
  };
  return (
    <HomeListItem {...propsItem} selectedJob={null} selectJob={selectJob} />
  );
};


export async function getServerSideProps(context: any) {
  const { id = 0 } = context.query;
  // Fetch data from external API
  const res = await axios.post(API_URL.JOBS.DEFAULT_LIST, {
    "pageNo": 1,
    "pageSize": 5,
    "jobStatus": [
      0
    ]
  }, {});
  console.log('context', res.data?.jobs)
  return { props: { jd: {}, jobs: res.data?.jobs || [] } }
}
export default HomeList;
