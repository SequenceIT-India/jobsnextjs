import {
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import "./apply-job-detail.module.scss";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  btnsDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ReportJobDetail = (props) => {
  const classes = useStyles();
  const [reportData, setReportData] = useState({});

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={`${classes.modal} apply-job-detail`}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="content">
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className="field-row-container"
          >
            <Grid item xs={12} md={12} className="field">
              <h2
                style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}
                id="modal-title"
              >
                Report a job listing
              </h2>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className="field-row-container"
          >
            <Grid item xs={12} md={12} className="field">
              <RadioGroup
                aria-label="reason"
                name="reason"
                value={reportData.reason}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="This job content has offensive, discriminatory"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="This is a fake job, no real hiring present"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="This job looks like spam or advertisement"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="This job is inaccurate information"
                />
                <FormControlLabel value="5" control={<Radio />} label="Other" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className="field-row-container"
          >
            <Grid item xs={12} md={12} className="field">
              <InputLabel className="field-label">Report detail</InputLabel>
              <TextField
                name="notes"
                id="notes"
                variant="outlined"
                required
                multiline
                maxRows={6}
                rows={4}
                placeholder="Enter details"
                size="medium"
                value={reportData.notes}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className="field-row-container"
          >
            <Grid item xs={12} md={3} className="field">
              <Button className="cancel-btn" onClick={props.handleClose}>
                Cancel
              </Button>
              &nbsp; &nbsp;
              <Button className="apply-btn">Report</Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

ReportJobDetail.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ReportJobDetail;
