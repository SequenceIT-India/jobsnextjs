import React, { useState, useEffect } from "react";

import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import { latestJobs } from "../../../data/seekerJobs";
import JsJobsCard from "../../../components/jobscard/JsJobsCard";
import JsHomePageProfile from "../../../components/jshomepageprofile/JsHomePageProfile";
import JsHomePageProfileProgress from "../../../components/jshomepageprofileprogress/JsHomePageProfileProgress";

import colors from "../../../vars.module.scss";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    minHeight: "100vh",
  },
  subtitle: {
    color: colors.disableColor,
    marginTop: "3rem",
    fontSize: 16,
    fontWeight: 600,
    marginBottom: "1rem",
    [theme.breakpoints.between("xs", "md")]: {
      fontSize: "small",
      padding: "0px",
    },
  },
  jobsGrid: {
    [theme.breakpoints.only("xs")]: {
      position: "relative",
      top: "26rem",
    },
  },
  expandedJobsGrid: {
    [theme.breakpoints.only("xs")]: {
      position: "relative",
      top: "5.5rem",
    },
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    display: "none",
    [theme.breakpoints.only("xs")]: {
      display: "block",
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const JsHomePage = () => {
  const classes = useStyles();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [expandedProfile, setExpandedProfile] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  const handleChange = (event) => {
    setIsProfileVisible(!isProfileVisible);
  };

  useEffect(() => {
    let appliedJobsArray = [];
    latestJobs.forEach((job) => {
      if (job.status === "applied") {
        appliedJobsArray.push(job);
      }
    });
    setAppliedJobs(appliedJobsArray);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleProfileExpandClick = () => {
    setExpandedProfile(!expandedProfile);
  };

  return (
    <>
      <Grid className={classes.gridRoot} container justifyContent="center">
        <Grid item lg={3} xs={12}>
          <JsHomePageProfile
            handleProfileExpandClick={handleProfileExpandClick}
            classes={classes}
            expandedProfile={expandedProfile}
          />
        </Grid>
        <Grid
          item
          lg={6}
          md={8}
          xs={11}
          className={!expanded ? classes.expandedJobsGrid : classes.jobsGrid}
        >
          <Typography className={classes.subtitle} variant="subtitle1">
            Jobs Applied and status
          </Typography>
          <JsJobsCard
            isAppliedJobs={true}
            jobs={appliedJobs}
            rowsPerPage={10}
            page={0}
            isHomePage={true}
          />
        </Grid>
        <Grid item lg={3} xs={12}>
          <JsHomePageProfileProgress
            expanded={expanded}
            classes={classes}
            handleExpandClick={handleExpandClick}
            isActive={isProfileVisible}
            handleChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JsHomePage;
