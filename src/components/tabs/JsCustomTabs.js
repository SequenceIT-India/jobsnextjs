import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { latestJobs } from "../../data/seekerJobs";
import JsJobsCard from "../jobscard/JsJobsCard";
import { TablePagination } from "@mui/material";
import TablePaginationActions from "../home-page/gl-table-pagination";

import { tabpanels, box } from "./JsCustomTabs.module.scss";
import colors from "../../vars.module.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className={tabpanels}
      hidden={value !== index}
      id={`jobs-tabpanel-${index}`}
      aria-labelledby={`jobs-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={box} p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `jobs-tab-${index}`,
    "aria-controls": `jobs-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    color: colors.textLightColor,
    backgroundColor: "white",
    boxShadow: "none",
    [theme.breakpoints.between("xs", "md")]: {
      padding: "0px 0.75rem",
    },
  },
  indicator: {
    backgroundColor: colors.primaryColor,
  },
  selectedTab: {
    color: colors.primaryColor,
    fontSize: 16,
    [theme.breakpoints.only("xs")]: {
      fontSize: "x-small",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "x-small",
    },
  },
  tabs: {
    borderBottom: `1px solid ${colors.textLightColor}`,
  },
  tab: {
    fontSize: 16,
    [theme.breakpoints.only("xs")]: {
      fontSize: "x-small",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "x-small",
    },
  },
  paginationDiv: {
    display: "flex",
    justifyContent: "flex-start",
    padding: 16,
    marginLeft: 10,
  },
}));

export default function JsCustomTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [savedJobs, setSavedJobs] = useState([]);
  const [matchingJobs, setMatchingJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [expiredJobs, setExpiredJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    let savedJobsArray = [];
    let matchingJobsArray = [];
    let appliedJobsArray = [];
    let expiredJobsArray = [];
    latestJobs.forEach((job) => {
      if (job.status === "saved") {
        savedJobsArray.push(job);
      }
      if (job.status === "matching") {
        matchingJobsArray.push(job);
      }
      if (job.status === "applied") {
        appliedJobsArray.push(job);
      }
      if (job.status === "expired") {
        expiredJobsArray.push(job);
      }
    });
    setSavedJobs(savedJobsArray);
    setMatchingJobs(matchingJobsArray);
    setAppliedJobs(appliedJobsArray);
    setExpiredJobs(expiredJobsArray);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="jobs tabs example"
          variant="fullWidth"
          className={classes.tabs}
          classes={{
            indicator: classes.indicator,
          }}
        >
          <Tab
            className={value === 0 ? classes.selectedTab : classes.tab}
            label="Saved Jobs"
            {...a11yProps(0)}
          />
          <Tab
            className={value === 1 ? classes.selectedTab : classes.tab}
            label="Matching Jobs"
            {...a11yProps(1)}
          />
          <Tab
            className={value === 2 ? classes.selectedTab : classes.tab}
            label="Applied Jobs"
            {...a11yProps(2)}
          />
          <Tab
            className={value === 3 ? classes.selectedTab : classes.tab}
            label="Expired Jobs"
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <JsJobsCard
          isSavedJobs={true}
          jobs={savedJobs}
          rowsPerPage={rowsPerPage}
          page={page}
        />
        <div className={classes.paginationDiv}>
          <TablePagination
            className={classes.pagination}
            component="div"
            count={savedJobs.length}
            page={page}
            rowsPerPageOptions={[10, 25, 50, 100]}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <JsJobsCard
          isMatchingJobs={true}
          jobs={matchingJobs}
          rowsPerPage={rowsPerPage}
          page={page}
        />
        <div className={classes.paginationDiv}>
          <TablePagination
            className={classes.pagination}
            component="div"
            count={matchingJobs.length}
            page={page}
            rowsPerPageOptions={[10, 25, 50, 100]}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <JsJobsCard
          isAppliedJobs={true}
          jobs={appliedJobs}
          rowsPerPage={rowsPerPage}
          page={page}
        />
        <div className={classes.paginationDiv}>
          <TablePagination
            className={classes.pagination}
            component="div"
            count={appliedJobs.length}
            page={page}
            rowsPerPageOptions={[10, 25, 50, 100]}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <JsJobsCard
          isExpiredJobs={true}
          jobs={expiredJobs}
          rowsPerPage={rowsPerPage}
          page={page}
        />
        <div className={classes.paginationDiv}>
          <TablePagination
            className={classes.pagination}
            component="div"
            count={expiredJobs.length}
            page={page}
            rowsPerPageOptions={[10, 25, 50, 100]}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </div>
      </TabPanel>
    </div>
  );
}
