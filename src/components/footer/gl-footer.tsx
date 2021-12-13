
import { default as React, useEffect, useRef, useState, Fragment } from "react";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CopyRightFooter from "./gl-copy-right-footer";
import "./gl-footer.module.scss";
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Grid } from "@mui/material";

import withStyles from "@mui/styles/withStyles";

import colors from "../../vars.module.scss";

const styles = makeStyles((theme: any) => ({
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

function Footer() {

  const classes = styles();
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className={classes.footer}>
          <Toolbar variant="dense">
            <Grid container className={classes.footerItems}>
              <Grid item xs={6} md={"auto"} className="jobseeker-section">
                <Typography className={classes.sectionHeading} variant="h6">
                  Jobseeker
                </Typography>
                <div className={classes.sectionItems}>
                  <Link href={"#"}>
                    <a className={classes.link}>Search Jobs</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>Upload Resume</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>Company Profile</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>Help</a>
                  </Link>
                </div>
              </Grid>
              <Grid item xs={6} md={"auto"} className="employer-section">
                <Typography className={classes.sectionHeading} variant="h6">
                  Employers
                </Typography>
                <div className={classes.sectionItems}>
                  <Link href={"#"}>
                    <a className={classes.link}>Solutions</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>Pricing</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>Contacts Management</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>Search Talent</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>Help</a>
                  </Link>
                </div>
              </Grid>
              <Grid item xs={6} md={"auto"} className="resources-section">
                <Typography className={classes.sectionHeading} variant="h6">
                  Resources
                </Typography>
                <div className={classes.sectionItems}>
                  <Link href={"#"}>
                    <a className={classes.link}>Site Map</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>Contact Us</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>Contact Sales</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>Schedule Demo</a>
                  </Link>
                </div>
              </Grid>
              <Grid item xs={6} md={"auto"} className="aboutjh-section">
                <Typography className={classes.sectionHeading} variant="h6">
                  About Jh
                </Typography>
                <div className={classes.sectionItems}>
                  <Link href={"/about-us"}>
                    <a className={classes.link}>About Us</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>Partner with Us</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>VMS Integration</a>
                  </Link>
                  <Link href={"#"}>
                    <a className={classes.link}>API Integration</a>
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
    </>
  );
}

export default Footer;