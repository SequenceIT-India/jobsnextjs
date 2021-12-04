import React from "react";
import { Link } from "react-router-dom";

import { Divider, IconButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";

import ProfileBadge from "./ProfileBadge";
import CustomSwitch from "../switch/CustomSwitch";

import clsx from "clsx";

import jobsIcon from "../../assets/images/jobsIcon.svg";
import profileIcon from "../../assets/images/profileIcon.svg";
import additionalInfoIcon from "../../assets/images/additionalInfoIcon.svg";

import useMediaQuery from "@mui/material/useMediaQuery";

import classes from "./JsHomePageProfile.module.scss";

const JsHomePageProfile = (props) => {
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <>
      <div className={classes["heading-div"]}>
        <span className={classes.heading}>Your's JobsHorn</span>
      </div>
      <div
        className={
          props.expandedProfile
            ? classes["expanded-home-page-profile-container"]
            : classes["home-page-profile-container"]
        }
      >
        <ProfileBadge />
        <div className={classes["user-details"]}>
          <span className={classes.fullname}>Maria John</span>
          <span className={classes.designation}>Devops Engineer</span>
          <span className={classes.location}>Omaha, NE</span>
        </div>
        <div className={classes["icon-button-div"]}>
          <span className={classes["info"]}>Your information</span>
          <IconButton
            size="small"
            className={clsx(props.classes.expand, {
              [props.classes.expandOpen]: props.expandedProfile,
            })}
            onClick={props.handleProfileExpandClick}
            aria-expanded={props.expandedProfile}
            aria-label="show more profile"
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <Collapse
          in={props.expandedProfile || matches}
          timeout="auto"
          unmountOnExit
        >
          <Divider className={classes.divider} />
          <div className={classes["profile-visibility-div"]}>
            <span>Profile visibility</span>
            <CustomSwitch />
          </div>
          <Divider className={classes.divider} />
          <div className={classes["jobs-div"]}>
            <img className={classes.image} src={jobsIcon} alt="jobs" />
            <Link className={classes.link} to="/jobseeker/jobs">
              <span className={classes["jobs-link"]}>Jobs</span>
            </Link>
          </div>
          <Divider className={classes.divider} />
          <div className={classes["alerts-div"]}>
            <AnnouncementIcon className={classes["alerts-icon"]} />
            <Link className={classes.link} to="/jobseeker/alerts">
              <span className={classes["jobs-link"]}>Job Alerts</span>
            </Link>
          </div>
          <Divider className={classes.divider} />
          <div className={classes["resume-coverletter-div"]}>
            <DescriptionIcon className={classes["description-icon"]} />
            <Link className={classes.link} to="/#">
              <span className={classes["jobs-link"]}>
                Manage Resume/Cover Letter
              </span>
            </Link>
          </div>
          <Divider className={classes.divider} />
          <div className={classes["profile-div"]}>
            <img className={classes.image} src={profileIcon} alt="Profile" />
            <Link className={classes.link} to="/jobseeker/create-profile">
              <span className={classes["jobs-link"]}>Profile</span>
            </Link>
          </div>
          <Divider className={classes.divider} />
          <div className={classes["additional-info-div"]}>
            <img
              className={classes.image}
              src={additionalInfoIcon}
              alt="additional info"
            />
            <Link className={classes.link} to="/jobseeker/additional-info">
              <span className={classes["jobs-link"]}>
                Additional information
              </span>
            </Link>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default JsHomePageProfile;
