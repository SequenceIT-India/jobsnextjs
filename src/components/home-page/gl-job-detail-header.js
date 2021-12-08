import { Close, NavigateNext, OpenInNew } from "@mui/icons-material";
import { Breadcrumbs, Button, Grid, Snackbar, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./gl-job-detail-header.module.scss";

const JobDetailHeader = (props) => {
  const router = useRouter();
  const [copiedMessageIsOpen, setCopiedMessageIsOpen] = useState(false);

  const goToDetailPage = () => {
    router.push(`/jobdetail/${props.job.jobID}`);
  };
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        className="job-detail-header"
      >
        <Grid item xs={"auto"} className="breadcrumb-wrapper">
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            className="page-header"
          >
            <Typography
              className="breadcrumb-item non-active"
              onClick={props.onCloseClickHandler}
            >
              {props.basePage || "Home"}
            </Typography>
            <Typography color="textPrimary" className="breadcrumb-item active">
              {props?.job?.jobTitle}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={"auto"}>
          <Grid container spacing={2} className="top-actions">
            <Grid item>
              {props.isDetailPage ? (
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (props.onCloseClickHandler) {
                      props.onCloseClickHandler(true);
                    }
                  }}
                >
                  <OpenInNew fontSize="small" />
                </Button>
              ) : (
                <Button variant="outlined" onClick={goToDetailPage}>
                  <OpenInNew fontSize="small" />
                </Button>
              )}
            </Grid>
            {/* <Grid item>
                          <Button variant="outlined" onClick={() => {
                              setShowSocialShare(true)
                          }}><ShareOutlined fontSize="small" /></Button>
                      </Grid> */}
            {/* <Grid item>
                          <Button variant="outlined"><StarBorderOutlined fontSize="small" /></Button>
                      </Grid> */}
            <Grid item>
              <Button
                variant="outlined"
                onClick={() => {
                  if (props.onCloseClickHandler) {
                    props.onCloseClickHandler();
                  }
                }}
              >
                <Close fontSize="small" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
    </>
  );
};

JobDetailHeader.propTypes = {
  job: PropTypes.any.isRequired,
  isDetailPage: PropTypes.bool,
  onCloseClickHandler: PropTypes.func.isRequired,
};

export default JobDetailHeader;
