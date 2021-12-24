import React, { useState } from 'react';
import type { NextPage } from 'next';
import HomeListItem from "../components/home-page/home-job-list.js";
import { API_URL } from '../service/urls';
import { getDefaultJobs } from '../service/jobs'
const HomeList: NextPage = (props) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const propsItem = props

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

  const res = await getDefaultJobs(API_URL.JOBS.DEFAULT_LIST);

  console.log('context', res.data?.jobs)
  return { props: { jd: {}, jobs: res.data?.jobs || [] } }
}
export default HomeList;
