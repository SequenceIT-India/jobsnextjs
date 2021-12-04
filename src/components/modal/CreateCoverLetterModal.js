import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { Button, FormHelperText, IconButton } from "@mui/material";
import { FormControl, OutlinedInput } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useOutlinedInputStyles } from "../../util/CustomInputField";
import CustomEditor from "../Editor/CustomEditor";
import { JsLogin as CoverLetter } from "../../util/helper";
import { INFO, PLACEHOLDERS } from "../../util/Labels";

import colors from "../../vars.module.scss";
import styles from "./CreateCoverLetter.module.scss";

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
    color: colors.whiteColor,
    "&:hover": {
      backgroundColor: colors.primaryColor,
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
            <span className={styles.title}>
              {INFO.CREATE_NEW_COVER_LETTER_INFO}
            </span>
            <IconButton onClick={props.handleClose} size="large">
              <CloseIcon />
            </IconButton>
          </div>
          <div className={styles["cover-letter-name"]}>
            <label className={styles["label"]}>Cover letter name</label>
            <FormControl
              variant="outlined"
              className={styles["input-form-control"]}
            >
              <OutlinedInput
                id="coverletter"
                placeholder={PLACEHOLDERS.COVER_LETTER_NAME_PLACEHOLDER}
                required
                value={props.coverLetterName}
                type="text"
                name={CoverLetter.coverLetterName}
                onChange={props.onChange("coverLetterName")}
                classes={outlinedInputClasses}
              />
              <FormHelperText error className={styles["helper-text"]}>
                {props.errors.coverLetterName}
              </FormHelperText>
            </FormControl>
          </div>
          <div className={styles["editor"]}>
            <CustomEditor
              editorState={props.editorState}
              onEditorStateChange={props.onEditorStateChange}
              editorClassName={styles.editorClass}
            />
          </div>
          <div className={styles["btns-div"]}>
            <Button
              size="small"
              onClick={props.onClearClickHandler}
              variant={
                props.coverLetterName === "" ||
                props.editorState.getCurrentContent().getPlainText() !== ""
                  ? "outlined"
                  : "contained"
              }
              className={
                props.coverLetterName !== "" ||
                props.editorState.getCurrentContent().getPlainText() !== ""
                  ? styles.btn
                  : ""
              }
              disabled={
                props.coverLetterName === "" &&
                props.editorState.getCurrentContent().getPlainText() === ""
              }
            >
              Clear
            </Button>
            <Button
              size="small"
              onClick={props.saveBtnOnClickHandler}
              variant={
                props.coverLetterName === "" ||
                props.editorState.getCurrentContent().getPlainText() === "" ||
                props.errors.coverLetterName !== ""
                  ? "outlined"
                  : "contained"
              }
              className={
                props.coverLetterName !== "" &&
                props.editorState.getCurrentContent().getPlainText() !== "" &&
                props.errors.coverLetterName === ""
                  ? styles.btn
                  : ""
              }
              disabled={
                props.coverLetterName === "" ||
                props.editorState.getCurrentContent().getPlainText() === "" ||
                props.errors.coverLetterName !== ""
              }
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
