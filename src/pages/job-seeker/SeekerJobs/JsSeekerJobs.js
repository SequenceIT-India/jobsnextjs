import React from "react";
import { Link } from "react-router-dom";

import JsCustomTabs from "../../../components/tabs/JsCustomTabs";
import { Divider, Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import colors from "../../../vars.module.scss";

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    minHeight: "100vh",
  },
  jobsTitleDiv: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.25rem",
    justifyContent: "space-between",
    [theme.breakpoints.between("xs", "md")]: {
      paddingRight: "0.75rem",
    },
  },
  titleDiv: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    color: colors.primaryDarkColor,
    marginLeft: "1rem",
    fontWeight: 500,
    [theme.breakpoints.between("xs", "md")]: {
      fontSize: "small",
      padding: "0px 0.75rem",
      marginLeft: 0,
    },
  },
  subtitle: {
    color: colors.disableColor,
    marginTop: "0.75rem",
    fontSize: 16,
    fontWeight: 400,
    marginBottom: "1rem",
    [theme.breakpoints.between("xs", "md")]: {
      fontSize: "small",
      padding: "0px 0.75rem",
    },
  },
  profileLink: {
    marginRight: "1rem",
    fontWeight: 400,
    [theme.breakpoints.between("xs", "md")]: {
      fontSize: "small",
      padding: "0px 0.75rem",
      marginRight: 0,
    },
  },
  link: {
    color: colors.textLightColor,
    textDecoration: "none",
  },
  leftArrowIcon: {
    width: 15,
    color: colors.textLightColor,
    [theme.breakpoints.between("xs", "md")]: {
      width: 10,
    },
  },
  divider: {
    [theme.breakpoints.between("xs", "md")]: {
      width: "85%",
      padding: "0px 0.75rem",
      margin: "auto",
    },
  },
}));

const JsSeekerJobs = () => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.gridRoot} container justifyContent="center">
        <Grid item lg={6} md={8} xs={12}>
          <div className={classes.jobsTitleDiv}>
            <div className={classes.titleDiv}>
              <Typography className={classes.profileLink} variant="body1">
                <Link className={classes.link} to="/jobseeker/homepage">
                  Home
                </Link>
              </Typography>
              <ArrowForwardIosIcon className={classes.leftArrowIcon} />
              <Typography className={classes.title} variant="h6">
                Jobs
              </Typography>
            </div>
          </div>
          <Divider className={classes.divider} />
          <Typography className={classes.subtitle} variant="subtitle1">
            Manage your job listing
          </Typography>
          <JsCustomTabs />
        </Grid>
      </Grid>
    </>
  );
};

export default JsSeekerJobs;
