import { FileCopyOutlined, MoreVert } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Snackbar,
  SvgIcon,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useRouter } from "next/router";
import { getJobLocation, getJobType, validateField } from "../../util/helper";
import ApplyJobDetail from "../job-detail/apply-job-detail";
import ReportJobDetail from "../job-detail/report-job-detail";
import GetRemainderModal from "../modal/GetRemainderModal";
import styles from "./gl-job-detail-component.module.scss";
import {
  AccountCowBoyOutline,
  AccountInjuryOutline,
  Blocks,
  Book,
  CalendarClock,
  CalendarMonth,
  DragHandleLine,
  Flag,
  Location,
  OfficeBuilding,
  Share,
  SheildAccountOutline,
  WorkAuthorization,
  WorkOutline,
  WorkType,
} from "./icons";

const JobDetailComponent = (props: any) => {
  const description =
    "Cloud engineer, Devops, Cloud specialist, High Availability, MEAN, Shell Scription, Big Data, Windows Administration, Jenkins, Linux, Docker, AppEngine, terraform, AWS, Vitualization, AMI";
  const routes = useRouter();
  const [showApplyJob, setShowApplyJob] = useState(false);
  const [showReportJob, setShowReportJob] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSocialShare, setShowSocialShare] = useState(false);
  const [copiedMessageIsOpen, setCopiedMessageIsOpen] = useState(false);

  const onApplyJobClose = () => {
    setShowApplyJob(false);
  };

  const onReportJobClose = () => {
    setShowReportJob(false);
  };

  const getRemainderOnClickHanlder = () => {
    setOpen(true);
  };

  const [values, setValues] = useState({
    emailId: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (prop: any) => (event: any) => {
    const type = prop === "password" ? prop : event.target.type;
    setErrors({
      ...errors,
      [prop]: validateField(
        event.target.name,
        event.target.value,
        type,
        event.target.required,
        true
      ),
    });
    setValues({ ...values, [prop]: event.target.value });
  };

  const onCloseHandler = () => {
    setOpen(false);
  };

  const cancelBtnClickHandler = () => {
    setValues({ emailId: "", notes: "" });
    setErrors({});
    setOpen(false);
  };

  const submitBtnClickHandler = () => { };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const copy = () => {
    const el = document.createElement("input");
    el.value = `/job-detail/${props?.job?.jobID}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopiedMessageIsOpen(true);
  };

  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
        <div className="mobile-header">
          <Grid container justifyContent="space-between" className="container">
            <Grid item xs={12} className="handle">
              <Button variant="text">
                <DragHandleLine />
              </Button>
              <Button
                aria-controls="job-detail-mobileheader"
                aria-haspopup="true"
                variant="text"
                className="more"
                onClick={handleOpen}
              >
                <MoreVert />
              </Button>
              <Menu
                anchorEl={anchorEl}
                id="job-detail-mobileheader"
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>Item 1</MenuItem>
                <MenuItem>Item 1</MenuItem>
                <MenuItem>Item 1</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </div>
      </Hidden>
      <div className="job-detail">
        <Grid container className="container">
          <Grid item xs={9}>
            <Typography className="job-title">{props?.job?.jobTitle}</Typography>
          </Grid>
          <Grid item xs={3}>
            <img src={props?.job?.logo} className="company-logo" alt="" />
          </Grid>
          <Grid item xs={12} className="job-inline-content-item ">
            <OfficeBuilding />{" "}
            <Typography variant="subtitle1" className="text">
              {props?.job?.companyName}
            </Typography>
          </Grid>
          <Grid item xs={12} className="job-inline-content-item ">
            <Location fontSize="small" className="job-icon" />
            <Typography variant="subtitle1" className="text job-location">
              {getJobLocation(props.job)}
            </Typography>
          </Grid>
          <Grid item xs={12} className="job-inline-content-item ">
            <Blocks fontSize="small" className="job-icon" />
            <Typography variant="subtitle1" className="text description">
              {props?.job?.jobSkills || description}
            </Typography>
          </Grid>
          {/* <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid
                xs={4}
                md={"auto"}
                item
                className="job-inline-content-item "
              > 
                <Money  width="18" height="14" fontSize="small" className="job-icon" />
                <Typography variant="subtitle1" className="text">
                  {props?.job?.maxCompensation}
                </Typography>
              </Grid>
              <Grid xs={4} md={"auto"} item className="job-inline-content-item">
                <CalendarMonth fontSize="small" className="job-icon" />
                <Typography variant="subtitle1" className="text">
                  {moment(props?.job?.postedOn).format("DD MMM, YYYY")}
                </Typography>
              </Grid>
              <Grid
                xs={4}
                md={"auto"}
                item
                className="job-inline-content-item "
              >
                <Time fontSize="small" className="job-icon secondary" />
                <Typography variant="subtitle1" className="text secondary">
                  {props?.job?.notice}
                </Typography>
              </Grid>
            </Grid>
          </Grid> */}
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid
                item
                xs={12}
                md={"auto"}
                className="job-inline-content-item "
              >
                <WorkOutline fontSize="small" className="job-icon" />
                <Typography
                  variant="subtitle1"
                  className="text circular-border job-type"
                >
                  {getJobType(props.job)}
                </Typography>
              </Grid>
              <Grid
                xs={12}
                md={"auto"}
                item
                className="job-inline-content-item "
              >
                <SvgIcon
                  component={CalendarMonth}
                  fontSize="small"
                  className="job-icon"
                />
                <Typography variant="subtitle1" className="text">
                  Posted on : {props?.job?.postedOn}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider component="div" className="divider" />
        <Grid container className="container info-container">
          <Grid xs={12} item className="job-inline-content-item ">
            <WorkType fontSize="small" className="job-icon" />
            <Typography variant="subtitle1" className="text">
              Work type: {props?.job?.workType}
            </Typography>
          </Grid>
          <Grid xs={12} item className="job-inline-content-item ">
            <WorkAuthorization fontSize="small" className="job-icon" />
            <Typography variant="subtitle1" className="text">
              Work authorization: {props?.job?.workAuthorizaton}
            </Typography>
          </Grid>
          <Grid xs={6} item className="job-inline-content-item ">
            <CalendarClock fontSize="small" className="job-icon" />
            <Typography variant="subtitle1" className="text">
              Duration: {props?.job?.duration}
            </Typography>
          </Grid>
          <Grid xs={6} item className="job-inline-content-item ">
            <AccountCowBoyOutline fontSize="small" className="job-icon" />
            <Typography variant="subtitle1" className="text">
              Veteran Service: {props?.job?.veteranService}
            </Typography>
          </Grid>
          <Grid xs={12} item className="job-inline-content-item ">
            <SheildAccountOutline fontSize="small" className="job-icon" />
            <Typography variant="subtitle1" className="text">
              Security clearance : Yes
            </Typography>
          </Grid>

          <Grid xs={12} item className="job-inline-content-item ">
            <AccountInjuryOutline fontSize="small" className="job-icon" />
            <Typography variant="subtitle1" className="text">
              Disability: {props?.job?.disability}
            </Typography>
          </Grid>
        </Grid>
        <Divider component="div" className="divider" />
        <Grid container className="container">
          <Grid xs={12} md={3} item className="job-inline-content-item ">
            <Button
              onClick={() => {
                setShowReportJob(true);
              }}
              fullWidth
              variant="outlined"
              className="report-btn"
            >
              <Flag fontSize="small" /> Report job listing
            </Button>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container className="container">
              <Grid xs={12} md={5} item className="job-inline-content-item ">
                <Button
                  onClick={getRemainderOnClickHanlder}
                  fullWidth
                  variant="text"
                  className="report-btn"
                >
                  Get reminder in your inbox
                </Button>
              </Grid>
              <Grid xs item className="job-inline-content-item ">
                <Button
                  variant="text"
                  className="text link"
                  onClick={() => {
                    setShowSocialShare(true);
                  }}
                >
                  <Share fontSize="small" className="job-icon" />
                </Button>
              </Grid>
              <Grid xs item className="job-inline-content-item ">
                <Button
                  variant="text"
                  className="text link"
                  onClick={() => {
                    setShowReportJob(true);
                  }}
                >
                  <Book fontSize="small" className="job-icon" />
                </Button>
              </Grid>
              <Grid xs={5} md item className="job-inline-content-item ">
                <Button
                  onClick={() => {
                    setShowApplyJob(true);
                  }}
                  fullWidth
                  className="apply-btn"
                >
                  Apply now
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider component="div" className="divider" />
        <div className="container job-description-container">
          <Grid container className="job-description">
            <Grid xs={12} item className="job-inline-content-item main-header">
              <div className="header">Job Description</div>
            </Grid>
            <Grid xs={12} item className="job-inline-content-item">
              <div className="container text description">
                {props.job?.jobDesc}
              </div>
            </Grid>
            <Grid xs={12} item className="job-inline-content-item main-header">
              <div className="header">More Information</div>
            </Grid>
            <Grid xs={4} item className="job-inline-content-item ">
              <div className="more-info-item">
                <div className="label">Interview type</div>
                <div className="value">Lipsum ipsum</div>
              </div>
            </Grid>
            <Grid xs={4} item className="job-inline-content-item ">
              <div className="more-info-item">
                <div className="label">Experience years required</div>
                <div className="value">4</div>
              </div>
            </Grid>
            <Grid xs={4} item className="job-inline-content-item ">
              <div className="more-info-item">
                <div className="label">Work hours</div>
                <div className="value">8</div>
              </div>
            </Grid>
            <Grid xs={8} item>
              <Grid container className="container">
                <Grid xs={6} item className="job-inline-content-item ">
                  <div className="more-info-item">
                    <div className="label">Company job ID</div>
                    <div className="value">123456789</div>
                  </div>
                </Grid>
                <Grid xs={6} item className="job-inline-content-item ">
                  <div className="more-info-item">
                    <div className="label">Number of hirings</div>
                    <div className="value">6</div>
                  </div>
                </Grid>

                <Grid xs={6} item className="job-inline-content-item ">
                  <div className="more-info-item">
                    <div className="label">Education</div>
                    <div className="value">Sapien praesent pretium</div>
                  </div>
                </Grid>
                <Grid xs={6} item className="job-inline-content-item ">
                  <div className="more-info-item">
                    <div className="label">Education (field of study)</div>
                    <div className="value">praesent pretium</div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={4} item className="job-inline-content-item ">
              <div className="more-info-item">
                <div className="label">Professional certification</div>
                <div className="value">
                  Egestas sagittis elementum Nibh facilisi viverra Habitant ut
                  lacus Nibh lacus{" "}
                </div>
              </div>
            </Grid>
            <Grid xs={12} item className="job-inline-content-item main-header">
              <div className="header">Compensation</div>
            </Grid>
            <Grid xs={12} item className="job-inline-content-item ">
              <div className="comp-info-item">
                <div className="label">Salary/rate</div>
                <div className="value">$2000/ comptype</div>
              </div>
            </Grid>
            <Grid xs={12} item className="job-inline-content-item ">
              <div className="comp-info-item">
                <div className="header">Additional payment info</div>
              </div>
            </Grid>
            <Grid xs={12} item>
              <Grid
                container
                className="container"
                justifyContent="space-between"
              >
                <Grid
                  xs={6}
                  md={"auto"}
                  item
                  className="job-inline-content-item"
                >
                  <div className="comp-info-item">
                    <div className="label">Signing bonus</div>
                    <div className="value">Yes</div>
                  </div>
                </Grid>
                <Grid
                  xs={6}
                  md={"auto"}
                  item
                  className="job-inline-content-item"
                >
                  <div className="comp-info-item">
                    <div className="label">Comission on sales</div>
                    <div className="value">Yes</div>
                  </div>
                </Grid>
                <Grid
                  xs={6}
                  md={"auto"}
                  item
                  className="job-inline-content-item"
                >
                  <div className="comp-info-item">
                    <div className="label">Quarterly bonus</div>
                    <div className="value">Lipsum ipsum</div>
                  </div>
                </Grid>
                <Grid
                  xs={6}
                  md={"auto"}
                  item
                  className="job-inline-content-item"
                >
                  <div className="comp-info-item">
                    <div className="label">Yearly bonus</div>
                    <div className="value">Yes</div>
                  </div>
                </Grid>
                <Grid
                  xs={6}
                  md={"auto"}
                  item
                  className="job-inline-content-item"
                >
                  <div className="comp-info-item">
                    <div className="label">Tips</div>
                    <div className="value">Yes</div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item className="job-inline-content-item ">
              <div className="comp-info-item">
                <div className="header">Additional payment detail</div>
                <div>
                  {" "}
                  lipsum ipsim lipsum payment detaillipsum ipsim lipsum payment
                  detail lipsum ipsim lipsum payment detail lipsum ipsim lipsum
                  payment detail lipsum ipsim lipsum payment detail lipsum ipsim
                  lipsum payment detail
                </div>
              </div>
            </Grid>
            <Grid xs={12} item className="job-inline-content-item main-header">
              <div className="header">Recruiter details</div>
            </Grid>
            <Grid xs={12} item>
              <Grid
                container
                className="container"
                justifyContent="space-between"
              >
                <Grid
                  xs={6}
                  md={"auto"}
                  item
                  className="job-inline-content-item "
                >
                  <div className="cons-info-item">
                    <div className="label">Name</div>
                    <div className="value">Man Power Consultant</div>
                  </div>
                </Grid>
                <Grid
                  xs={6}
                  md={"auto"}
                  item
                  className="job-inline-content-item "
                >
                  <div className="cons-info-item">
                    <div className="label">Email</div>
                    <div className="value">john.doe@email.com</div>
                  </div>
                </Grid>
                <Grid
                  xs={6}
                  md={"auto"}
                  item
                  className="job-inline-content-item "
                >
                  <div className="cons-info-item">
                    <div className="label">Phone</div>
                    <div className="value">(704) 555-0127</div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              className="container"
              justifyContent="space-between"
            >
              <Grid xs={6} md={4} item className="job-inline-content-item ">
                <div className="cons-info-item">
                  <div className="label">Address</div>
                  <div className="value">
                    Man Power Consultant 3517 W. Gray St. Utica, Pennysylvania
                    57867{" "}
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Grid
          container
          className="container"
          justifyContent="space-between"
        ></Grid>
      </div>
      <Dialog
        onClose={() => {
          setShowSocialShare(false);
        }}
        aria-labelledby="simple-dialog-title"
        open={showSocialShare}
      >
        <DialogTitle id="simple-dialog-title">Share</DialogTitle>
        <List className="social-share-list">
          <ListItem>
            <IconButton
              onClick={copy}
              color="primary"
              component="span"
              size="large"
            >
              <FileCopyOutlined
              // round={true}
              // size={50}
              />
            </IconButton>
          </ListItem>
          <ListItem>
            <FacebookShareButton
              url={`/job-detail/${props?.job?.jobID}`}
            >
              <FacebookIcon round={true} size={50} />
            </FacebookShareButton>
          </ListItem>
          <ListItem>
            <LinkedinShareButton
              url={`/job-detail/${props?.job?.jobID}`}
              source={`/job-detail/${props?.job?.jobID}`}
            >
              <LinkedinIcon round={true} size={50} />
            </LinkedinShareButton>
          </ListItem>
          <ListItem>
            <WhatsappShareButton
              url={`/job-detail/${props?.job?.jobID}`}
            >
              <WhatsappIcon round={true} size={50} />
            </WhatsappShareButton>
          </ListItem>
          <ListItem>
            <TwitterShareButton
              url={`/job-detail/${props?.job?.jobID}`}
            >
              <TwitterIcon round={true} size={50} />
            </TwitterShareButton>
          </ListItem>
          <ListItem>
            <EmailShareButton
              body={`/job-detail/${props?.job?.jobID}`}
              url={`/job-detail/${props?.job?.jobID}`}
            >
              <EmailIcon round={true} size={50} />
            </EmailShareButton>
          </ListItem>
        </List>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={copiedMessageIsOpen}
        autoHideDuration={2000}
        message="Copied"
        onClose={() => {
          setCopiedMessageIsOpen(false);
        }}
      />
      <ReportJobDetail open={showReportJob} handleClose={onReportJobClose} />
      <ApplyJobDetail open={showApplyJob} handleClose={onApplyJobClose} />
      <GetRemainderModal
        cancelBtnClickHandler={cancelBtnClickHandler}
        values={values}
        submitBtnClickHandler={submitBtnClickHandler}
        errors={errors}
        open={open}
        handleChange={handleChange}
        onClose={onCloseHandler}
      />
    </>
  );
};

JobDetailComponent.propTypes = {
  job: PropTypes.any.isRequired,
  setSelectedJob: PropTypes.any,
};

export default JobDetailComponent;
