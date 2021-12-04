import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { Button, FormHelperText, IconButton } from "@mui/material";
import { FormControl, OutlinedInput, Typography, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Hidden } from "@mui/material";
import { Delete, Publish } from "@mui/icons-material";
import "date-fns";
import { DropzoneArea } from "material-ui-dropzone";
import { defaultStyles, FileIcon } from "react-file-icon";
import { uploadUserResume } from "../../service/profile";

import { useOutlinedInputStyles } from "../../util/CustomInputField";
import { JsLogin as Resume } from "../../util/helper";

import colors from "../../vars.module.scss";
import styles from "./CreateCoverLetter.module.scss";
import "./UploadResume.scss";
import { INFO, PLACEHOLDERS } from "../../util/Labels";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${colors.blackColor}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "45rem",
    [theme.breakpoints.only("xs")]: {
      padding: "0px 1rem",
    },
  },
  btnsDiv: {
    display: "flex",
  },
  btn: {
    fontWeight: 500,
    margin: "1rem",
    marginLeft: "0px",
    backgroundColor: colors.primaryColor,
    color: "white",
    "&:hover": {
      backgroundColor: colors.primaryColor,
      color: "white",
    },
  },
  outlinedBtn: {
    margin: "1rem",
    marginLeft: "0px",
  },
}));

function CreateCoverLetterModal(props) {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();

  const getIconStyle = (filename) => {
    const extension = filename.split(".").pop().toLowerCase();
    return defaultStyles[extension] || defaultStyles.txt;
  };

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <div className={styles["title-div"]}>
            <span className={styles.title}>{INFO.UPLOAD_NEW_RESUME_INFO}</span>
            <IconButton onClick={props.handleClose} size="large">
              <CloseIcon />
            </IconButton>
          </div>
          <div className={styles["cover-letter-name"]}>
            <label className={styles["label"]}>{INFO.RESUME_NAME_INFO}</label>
            <FormControl
              variant="outlined"
              className={styles["input-form-control"]}
            >
              <OutlinedInput
                id="resume"
                placeholder={PLACEHOLDERS.RESUME_NAME_PLACEHOLDER}
                required
                value={props.resumeName}
                type="text"
                name={Resume.resumeName}
                onChange={props.onChange("resumeName")}
                classes={outlinedInputClasses}
              />
              <FormHelperText error className={styles["helper-text"]}>
                {props.errors.resumeName}
              </FormHelperText>
            </FormControl>
          </div>
          <Grid item xs={12} className="upload-resume">
            {props.resume && props.resume.fileData ? (
              <div className="uploaded">
                <div className="upload-area-container">
                  <div className="upload-text">
                    <Typography className="upload-text-header" display="block">
                      Resume uploaded successfully
                    </Typography>
                    <span className="attached-file-icon">
                      <FileIcon
                        extension={props.resume.fileName
                          .split(".")
                          .pop()
                          .toLowerCase()}
                        {...getIconStyle(props.resume.fileName)}
                      />{" "}
                      &nbsp;
                    </span>
                    <a
                      className="uploaded-file"
                      href={`data:application/octet-stream;base64,${props.resume.fileData}`}
                      target="_blank"
                      download={props.resume.fileName}
                      rel="noreferrer"
                    >
                      {props.resume.fileName}
                    </a>
                  </div>
                  <Hidden only={["xs", "sm"]}>
                    <Button className="upload-btn">
                      <Delete /> Remove
                    </Button>
                  </Hidden>
                  <Hidden only={["md", "lg", "xl"]}>
                    <div className="upload-btn-wrapper">
                      <Button className="upload-btn">
                        <Delete />
                      </Button>
                    </div>
                  </Hidden>
                </div>
              </div>
            ) : (
              <DropzoneArea
                dropzoneText=""
                Icon={() => (
                  <div className="upload-area-container">
                    <div className="upload-text">
                      <Hidden only={["xs", "sm"]}>
                        <Typography
                          className="upload-text-header"
                          display="block"
                        >
                          {INFO.DROP_RESUME}
                        </Typography>
                      </Hidden>
                      <Hidden only={["md", "lg", "xl"]}>
                        <Typography
                          className="upload-text-header"
                          display="block"
                        >
                          Upload resume
                        </Typography>
                      </Hidden>
                      <Typography
                        className="upload-text-subtitle"
                        display="block"
                      >
                        {INFO.RESUME_SUPPORTED_FORMATS}
                      </Typography>
                    </div>
                    <Hidden only={["xs", "sm"]}>
                      <Button className="upload-btn">Upload File</Button>
                    </Hidden>
                    <Hidden only={["md", "lg", "xl"]}>
                      <div className="upload-btn-wrapper">
                        <Button className="upload-btn">
                          <Publish />
                        </Button>
                      </div>
                    </Hidden>
                  </div>
                )}
                onChange={async (files) => {
                  if (files.length) {
                    await uploadUserResume(
                      sessionStorage.getItem("email"),
                      files[0]
                    );
                    await props.getResume();
                  }
                }}
                showPreviewsInDropzone={false}
                showPreviews={false}
              />
            )}
          </Grid>
          <div className={styles["btns-div"]}>
            <Button
              disabled={props.resumeName === "" || props.errors.resume === ""}
              size="small"
              variant={
                props.resumeName === "" || props.errors.resume === ""
                  ? "outlined"
                  : "contained"
              }
              className={
                props.resumeName === "" || props.errors.resume === ""
                  ? ""
                  : styles.btn
              }
              onClick={props.saveResumeHandler}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateCoverLetterModal;
