
import { default as React, useEffect, useState } from "react";
import HomeListItem from "../../components/home-page/home-job-list.js";

import { API_URL } from '../../service/urls';
import { getDefaultJobs } from '../../service/jobs'

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

  const res = await getDefaultJobs(API_URL.JOBS.DEFAULT_LIST);
  const jd = res.data?.jobs?.find((job) => job.jobID == id);
  return { props: { jd: jd || {}, jobs: res.data?.jobs || [] } }

}
export default DetailPage
