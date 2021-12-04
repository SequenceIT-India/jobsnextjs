import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  CardHeader,
  IconButton,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

import check from "../../assets/images/check.svg";

import {
  locationDetails,
  locationIcon,
  jobtypeDetails,
  jobTypeIcon,
  actionButtonsGrid,
  deleteIcon,
  appliedJobsDetails,
  jobStatusDetails,
  checkImage,
  savedJobIcon,
  jobStatusDetailsGrid,
  cardHeaderTitleGrid,
  cardContent,
  dateGrid,
  deleteJobIcon,
  unsavedJobIcon,
} from "./JsJobsCard.module.scss";
import colors from "../../vars.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "&:hover": {
      boxShadow: "-1px 5px 10px 1px rgba(0,0,0,0.2);",
    },
    color: colors.disableColor,
    marginBottom: "0.5rem",
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "white",
    },
    paddingTop: 0,
    paddingBottom: 0,
  },
  jobTitle: {
    fontWeight: "500",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "#222222",
    [theme.breakpoints.only("xs")]: {
      fontSize: "small",
    },
  },
  jobDate: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    [theme.breakpoints.only("xs")]: {
      fontSize: "small",
    },
  },
  jobCardHeader: {
    paddingBottom: 4,
    paddingTop: 8,
  },
  jobCardContent: {
    paddingTop: 0,
    paddingBottom: 8,
    "&:last-child": {
      paddingBottom: 12,
    },
  },
  applyBtn: {
    color: "white",
    backgroundColor: colors.primaryColor,
    "&:hover": {
      backgroundColor: colors.primaryColorShade,
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "x-small",
    },
  },
  pagination: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    "& .MuiToolbar-gutters": {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  cardHeaderContent: {
    minWidth: "100%",
  },
}));

export default function JsJobsCard({
  jobs,
  page,
  rowsPerPage,
  isSavedJobs,
  isMatchingJobs,
  isAppliedJobs,
  isExpiredJobs,
  isHomePage,
}) {
  const classes = useStyles();
  const [savedJobs, setSavedJobs] = useState([]);

  const saveIconClickHandler = (job) => {
    let savedJobsArray = [];
    if (savedJobs.length === 0) {
      savedJobsArray.push(job);
      setSavedJobs(savedJobsArray);
    }
    if (savedJobs.length > 0) {
      let unsaveJobindex = -1;
      savedJobs.forEach((jobs, index) => {
        jobs.id === job.id
          ? (unsaveJobindex = index)
          : savedJobsArray.push(jobs);
      });
      if (unsaveJobindex !== -1) {
        savedJobs.splice(unsaveJobindex, 1);
      } else {
        savedJobsArray.push(job);
      }
      setSavedJobs(savedJobsArray);
    }
  };
  return (
    <>
      {(rowsPerPage > 0
        ? jobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : jobs
      ).map((job) => (
        <Card key={job.id} className={classes.root}>
          <CardHeader
            className={classes.jobCardHeader}
            disableTypography
            classes={{ content: classes.cardHeaderContent }}
            title={
              <Grid className={cardHeaderTitleGrid}>
                <Grid item lg={isMatchingJobs ? 6 : 7} xs={6} md={6} sm={6}>
                  <Typography className={classes.jobTitle} variant="subtitle1">
                    {job.jobTitle}
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={4}
                  xs={isExpiredJobs ? 6 : isMatchingJobs ? 4 : 5}
                  md={isMatchingJobs ? 4 : 5}
                  className={dateGrid}
                >
                  <Typography variant="body2" className={classes.jobDate}>
                    {isSavedJobs
                      ? "Saved on: "
                      : isExpiredJobs
                      ? "Expired On: "
                      : isAppliedJobs
                      ? "Applied On: "
                      : ""}
                    {job.postedTime}
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg={isMatchingJobs ? 2 : 1}
                  xs={isMatchingJobs ? 2 : 1}
                  md={isMatchingJobs ? 2 : 1}
                  className={actionButtonsGrid}
                >
                  <>
                    {isMatchingJobs && (
                      <IconButton
                        className={classes.iconButton}
                        disableFocusRipple
                        aria-label="save"
                        onClick={() => saveIconClickHandler(job)}
                        size="large"
                      >
                        {savedJobs.some((jobs) => jobs.id === job.id) ? (
                          <StarIcon className={savedJobIcon} />
                        ) : (
                          <StarOutlineIcon className={unsavedJobIcon} />
                        )}
                      </IconButton>
                    )}
                    {!isExpiredJobs && !isHomePage && (
                      <IconButton
                        disableTouchRipple
                        className={`${classes.iconButton} ${deleteIcon}`}
                        aria-label="delete"
                        size="large"
                      >
                        <DeleteIcon className={deleteJobIcon} />
                      </IconButton>
                    )}
                  </>
                </Grid>
              </Grid>
            }
          />
          <CardContent className={classes.jobCardContent}>
            <Grid className={cardContent}>
              <Grid item lg={4} xs={4} sm={isAppliedJobs ? 3 : 4}>
                <Typography variant="body2" className={locationDetails}>
                  <LocationOnIcon className={locationIcon} />
                  {job.location}
                </Typography>
              </Grid>
              <Grid item lg={4} xs={4} sm={isAppliedJobs ? 3 : 4}>
                <Typography variant="body2" className={jobtypeDetails}>
                  <WorkOutlineIcon className={jobTypeIcon} />
                  {job.jobType}
                </Typography>
              </Grid>
              <Grid
                item
                lg={4}
                xs={isExpiredJobs ? false : 4}
                sm={isAppliedJobs ? 5 : 4}
                className={
                  isAppliedJobs ? appliedJobsDetails : jobStatusDetailsGrid
                }
              >
                {isAppliedJobs ? (
                  <Typography variant="body2" className={jobStatusDetails}>
                    <img className={checkImage} src={check} alt="" />
                    Application Status: {job.status}
                  </Typography>
                ) : (
                  ""
                )}
                {isSavedJobs || isMatchingJobs ? (
                  <Button size="small" className={classes.applyBtn}>
                    Apply
                  </Button>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
