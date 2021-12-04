import React, { useState, useEffect } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider, IconButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import useMediaQuery from "@mui/material/useMediaQuery";

import clsx from "clsx";

import ProgressBar from "./ProgressBar";
import classes from "./JsHomePageProfileProgress.module.scss";
import { Link } from "react-router-dom";

const JsHomePageProfileProgress = (props) => {
  const [progressPercent] = useState({
    email: "",
    empType: "NOT_APPLICABLE",
    workAuth: "NOT_APPLICABLE",
    skills: "NOT_APPLICABLE",
    workExp: "NOT_APPLICABLE",
    education: "NOT_APPLICABLE",
    certifications: "false",
    prefLocations: "NOT_APPLICABLE",
  });
  const [progressValue, setProgressValue] = useState(100);
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    let progress = progressValue;
    Object.entries(progressPercent).forEach(([key, value]) => {
      if (!value) {
        progress = progress - 12.5;
      }
    });
    setProgressValue(progress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={classes["progress-container"]}>
        <div
          className={
            props.expanded
              ? classes["expand-progress-details"]
              : classes["progress-details"]
          }
        >
          <span className={classes.title}>Profile completion status</span>
          <div className={classes["progress-bar-div"]}>
            <span className={classes["progress-percentage"]}>
              {progressValue}
            </span>
            <ProgressBar value={progressValue} />
            <IconButton
              size="small"
              className={clsx(props.classes.expand, {
                [props.classes.expandOpen]: props.expanded,
              })}
              onClick={props.handleExpandClick}
              aria-expanded={props.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
          <Collapse in={props.expanded || matches} timeout="auto" unmountOnExit>
            <Divider className={classes.divider} />
            <div className={classes["progress-status-div"]}>
              {progressPercent.email &&
              progressPercent.email !== "NOT_APPLICABLE" ? (
                <CheckIcon className={classes.checkIcon} />
              ) : progressPercent.email === "NOT_APPLICABLE" ? (
                <RadioButtonUncheckedIcon className={classes.radioIcon} />
              ) : (
                <CloseIcon className={classes.closeIcon} />
              )}
              <Link className={classes["link"]} to="/jobseeker/settings">
                <span className={classes["email-status"]}>
                  {progressPercent.email
                    ? "Email Verified"
                    : "Email Not Verified"}
                </span>
              </Link>
            </div>
            <Divider className={classes.divider} />
            <div className={classes["progress-status-div"]}>
              {progressPercent.empType &&
              progressPercent.empType !== "NOT_APPLICABLE" ? (
                <CheckIcon className={classes.checkIcon} />
              ) : progressPercent.empType === "NOT_APPLICABLE" ? (
                <RadioButtonUncheckedIcon className={classes.radioIcon} />
              ) : (
                <CloseIcon className={classes.closeIcon} />
              )}
              <Link className={classes["link"]} to="/jobseeker/create-profile">
                <span className={classes["employment-type-status"]}>
                  Employment Type
                </span>
              </Link>
            </div>
            <Divider className={classes.divider} />
            <div className={classes["progress-status-div"]}>
              {progressPercent.workAuth &&
              progressPercent.workAuth !== "NOT_APPLICABLE" ? (
                <CheckIcon className={classes.checkIcon} />
              ) : progressPercent.workAuth === "NOT_APPLICABLE" ? (
                <RadioButtonUncheckedIcon className={classes.radioIcon} />
              ) : (
                <CloseIcon className={classes.closeIcon} />
              )}
              <Link className={classes["link"]} to="/jobseeker/create-profile">
                <span className={classes["work-auth-status"]}>
                  Work Authorization
                </span>
              </Link>
            </div>
            <Divider className={classes.divider} />
            <div className={classes["progress-status-div"]}>
              {progressPercent.skills &&
              progressPercent.sills !== "NOT_APPLICABLE" ? (
                <CheckIcon className={classes.checkIcon} />
              ) : progressPercent.skills === "NOT_APPLICABLE" ? (
                <RadioButtonUncheckedIcon className={classes.radioIcon} />
              ) : (
                <CloseIcon className={classes.closeIcon} />
              )}
              <Link className={classes["link"]} to="/jobseeker/create-profile">
                <span className={classes["skills-status"]}>Skills</span>
              </Link>
            </div>
            <Divider className={classes.divider} />
            <div className={classes["progress-status-div"]}>
              {progressPercent.workExp &&
              progressPercent.workExp !== "NOT_APPLICABLE" ? (
                <CheckIcon className={classes.checkIcon} />
              ) : progressPercent.workExp === "NOT_APPLICABLE" ? (
                <RadioButtonUncheckedIcon className={classes.radioIcon} />
              ) : (
                <CloseIcon className={classes.closeIcon} />
              )}
              <Link className={classes["link"]} to="/jobseeker/create-profile">
                <span className={classes["work-exp-status"]}>
                  Work Experiance
                </span>
              </Link>
            </div>
            <Divider className={classes.divider} />
            <div className={classes["progress-status-div"]}>
              {progressPercent.education &&
              progressPercent.education !== "NOT_APPLICABLE" ? (
                <CheckIcon className={classes.checkIcon} />
              ) : progressPercent.education === "NOT_APPLICABLE" ? (
                <RadioButtonUncheckedIcon className={classes.radioIcon} />
              ) : (
                <CloseIcon className={classes.closeIcon} />
              )}
              <Link className={classes["link"]} to="/jobseeker/create-profile">
                <span className={classes["education-status"]}>Education</span>
              </Link>
            </div>
            <Divider className={classes.divider} />
            <div className={classes["progress-status-div"]}>
              {progressPercent.certifications &&
              progressPercent.certifications !== "NOT_APPLICABLE" ? (
                <CheckIcon className={classes.checkIcon} />
              ) : progressPercent.certifications === "NOT_APPLICABLE" ? (
                <RadioButtonUncheckedIcon className={classes.radioIcon} />
              ) : (
                <CloseIcon className={classes.closeIcon} />
              )}
              <Link className={classes["link"]} to="#">
                <span className={classes["certifications-status"]}>
                  Certifications
                </span>
              </Link>
            </div>
            <Divider className={classes.divider} />
            <div className={classes["progress-status-div"]}>
              {progressPercent.prefLocations &&
              progressPercent.prefLocations !== "NOT_APPLICABLE" ? (
                <CheckIcon className={classes.checkIcon} />
              ) : progressPercent.prefLocations === "NOT_APPLICABLE" ? (
                <RadioButtonUncheckedIcon className={classes.radioIcon} />
              ) : (
                <CloseIcon className={classes.closeIcon} />
              )}
              <Link className={classes["link"]} to="#">
                <span className={classes["preferred-location-status"]}>
                  Preferred Locations
                </span>
              </Link>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default JsHomePageProfileProgress;
