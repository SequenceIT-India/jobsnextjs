import { Card, CardContent, Drawer, Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { getJobLocation, getJobType } from "../../util/helper";
import "./gl-job-card.module.scss";
import JobDetailComponent from "./gl-job-detail-component";
import {
  Book,
  CalendarMonth,
  Location,
  Money,
  OfficeBuilding,
  Time,
  WorkOutline,
} from "./icons";

const paperStyle = makeStyles((theme) => ({
  paper: {
    height: "calc(100% - 60px)",
  },
}));

const JobCard = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const classes = paperStyle();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      <Card
        className={`job-card ${
          props.selectedJob && props.selectedJob.jobId === props.job.jobId
            ? "selected"
            : ""
        }`}
        onClick={() => {
          if (props.showDrawer) {
            toggleDrawer();
          } else {
            props.selectJob(props.job);
          }
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography className="job-title">
                    {props.job.jobTitle}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <img src={props.job.logo} className="company-logo" alt="" />
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={1}>
                <Grid item xs={12} className="job-card-inline-content-item">
                  <OfficeBuilding fontSize="small" className="job-icon" />
                  <Typography variant="subtitle1" className="text">
                    {props.job.companyName}
                  </Typography>
                </Grid>
                <Grid item xs={12} className="job-card-inline-content-item">
                  <Location fontSize="small" className="job-icon" />
                  <Typography variant="subtitle1" className="text job-location">
                    {getJobLocation(props.job)}
                  </Typography>
                </Grid>
                <Grid item xs={12} className="job-card-inline-content-item">
                  <WorkOutline fontSize="small" className="job-icon" />
                  <Typography variant="subtitle1" className="text job-type">
                    {getJobType(props.job)}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className="job-card-inline-content-item last"
                >
                  <Money fontSize="small" className="job-icon" />
                  <Typography variant="subtitle1" className="text">
                    {props.job.maxCompensation}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={10}>
              <Grid container spacing={1}>
                <Grid item xs={6} className="job-card-inline-content-item">
                  <CalendarMonth fontSize="small" className="job-icon" />
                  <Typography variant="subtitle1" className="text job-type">
                    {props.job.postedOn}
                  </Typography>
                </Grid>
                <Grid item xs={6} className="job-card-inline-content-item last">
                  <Time fontSize="small" className="job-icon secondary" />
                  <Typography variant="subtitle1" className="text secondary">
                    {props.job.notice}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} className="job-card-inline-content-item center">
              <Book fontSize="small" className="job-icon" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {props.showDrawer && (
        <Drawer
          anchor="bottom"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          classes={{
            paper: classes.paper,
          }}
        >
          <div className="job-detail-drawer">
            <JobDetailComponent
              job={props.job}
              setSelectedJob={props.setSelectedJob}
            />
          </div>
        </Drawer>
      )}
    </>
  );
};

JobCard.propTypes = {
  selectedJob: PropTypes.any,
  job: PropTypes.any.isRequired,
  selectJob: PropTypes.func,
  showDrawer: PropTypes.bool,
};

export default JobCard;
