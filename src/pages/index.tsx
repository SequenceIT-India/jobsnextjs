import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../components/Link';
import ProTip from '../components/ProTip';
import Copyright from '../components/Copyright';
import HomeListItem from "../components/home-page/home-job-list.js";

const HomeList: NextPage = () => {
  return (
    <HomeListItem />
  );
};

export default HomeList;
