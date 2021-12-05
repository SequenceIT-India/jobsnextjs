import React, { Fragment } from "react";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CopyRightFooter from "./gl-copy-right-footer";
import styles from "./gl-footer.module.scss";
import Link from 'next/link'
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Grid } from "@mui/material";

import colors from "../../vars.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  footer: {
    [theme.breakpoints.up("md")]: {
      height: "209px",
    },
    width: "100%",
    left: "0px",
    background: colors.primaryDarkColor,
  },
  footerItems: {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: 40,
    [theme.breakpoints.down("lg")]: {
      paddingBottom: 40,
    },
    width: "100%",
  },
  sectionHeading: {
    fontWeight: 700,
    fontSize: 16,
  },
  sectionItems: {
    marginTop: 12,
    fontWeight: 600,
    marginBottom: 43,
    fontSize: 12,
    display: "flex",
    flexDirection: "column",
    lineHeight: "25px",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static" className={classes.footer}>
          <Toolbar variant="dense">
            <Grid container className={classes.footerItems}>
              <Grid item xs={6} md={"auto"} className="jobseeker-section">
                <Typography className={classes.sectionHeading} variant="h6">
                  Jobseeker
                </Typography>
                <div className={classes.sectionItems}>
                  <Link className={classes.link} href={"#"}>
                    Search Jobs
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    Upload Resume
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    Company Profile
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    Help
                  </Link>
                </div>
              </Grid>
              <Grid item xs={6} md={"auto"} className="employer-section">
                <Typography className={classes.sectionHeading} variant="h6">
                  Employers
                </Typography>
                <div className={classes.sectionItems}>
                  <Link className={classes.link} href={"#"}>
                    Solutions
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    Pricing
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    Contacts Management
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    Search Talent
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    Help
                  </Link>
                </div>
              </Grid>
              <Grid item xs={6} md={"auto"} className="resources-section">
                <Typography className={classes.sectionHeading} variant="h6">
                  Resources
                </Typography>
                <div className={classes.sectionItems}>
                  <Link className={classes.link} href={"#"}>
                    Site Map
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    Contact Us
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    Contact Sales
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    Schedule Demo
                  </Link>
                </div>
              </Grid>
              <Grid item xs={6} md={"auto"} className="aboutjh-section">
                <Typography className={classes.sectionHeading} variant="h6">
                  About Jh
                </Typography>
                <div className={classes.sectionItems}>
                  <Link className={classes.link} href={"#"}>
                    About Us
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    Partner with Us
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    VMS Integration
                  </Link>
                  <Link className={classes.link} href={"#"}>
                    API Integration
                  </Link>
                </div>
              </Grid>
              <Grid item xs={12} md={"auto"} className="followus-section">
                <Typography className={classes.sectionHeading} variant="h6">
                  Follow us
                </Typography>
                <div className="follow-us-icons-div">
                  <span>
                    <FacebookIcon />
                  </span>
                  <span>
                    <TwitterIcon />
                  </span>
                  <span>
                    <LinkedInIcon />
                  </span>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
      <CopyRightFooter />
    </Fragment>
  );
}
