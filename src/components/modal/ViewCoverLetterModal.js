import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { Button, FormHelperText, IconButton } from "@mui/material";
import { FormControl, OutlinedInput } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { useOutlinedInputStyles } from "../../util/CustomInputField";
import CustomEditor from "../Editor/CustomEditor";
import { JsLogin as CoverLetter } from "../../util/helper";

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

function ViewCoverLetterModal(props) {
  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();

  const clearBtnIsEnabled = () => {
    return (
      props.isDisabled ||
      props.cLName === "" ||
      props.editorState.getCurrentContent().getPlainText() === ""
    );
  };

  const updateBtnIsEnabled = () => {
    return (
      props.isDisabled ||
      props.cLName === props.coverLetter ||
      props.cLName === "" ||
      props.editorState.getCurrentContent().getPlainText() === ""
    );
  };

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <div className={styles["title-div"]}>
            <span className={styles.title}>Cover Letter</span>
            <IconButton onClick={props.onClose} size="large">
              <CloseIcon />
            </IconButton>
          </div>
          <div className={styles["cover-letter-div"]}>
            <div className={styles["cover-letter-name"]}>
              <label className={styles["label"]}>Cover letter name</label>
              <FormControl
                variant="outlined"
                className={styles["input-form-control"]}
              >
                <OutlinedInput
                  id="coverletter"
                  disabled={props.isDisabled}
                  placeholder="Cover letter name"
                  required
                  value={props.cLName}
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
            <div className={styles["actions"]}>
              <div
                onClick={props.editClickHandler}
                className={styles["file-edit-icon-div"]}
              >
                <img
                  className={styles["file-edit"]}
                  src={"../../assets/images/fileEdit.svg"}
                  alt=""
                />
              </div>
              <div
                onClick={() => props.deleteCoverLetterHandler(props.id)}
                className={styles["delete-icon-div"]}
              >
                <DeleteIcon className={styles["delete-icon"]} />
              </div>
            </div>
          </div>
          <div className={styles["editor"]}>
            <CustomEditor
              disabled={props.isDisabled}
              editorState={props.editorState}
              onEditorStateChange={props.onEditorStateChange}
              editorClassName={styles.editorClass}
            />
          </div>
          <div className={styles["btns-div"]}>
            <Button
              size="small"
              onClick={props.onClearClickHandler}
              variant={clearBtnIsEnabled() ? "outlined" : "contained"}
              className={clearBtnIsEnabled() ? "" : styles.btn}
              disabled={clearBtnIsEnabled()}
            >
              Clear
            </Button>
            <Button
              size="small"
              onClick={() => props.updateCoverLetter(props.id)}
              disabled={updateBtnIsEnabled()}
              variant={updateBtnIsEnabled() ? "outlined" : "contained"}
              className={updateBtnIsEnabled() ? "" : styles.btn}
            >
              Update
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ViewCoverLetterModal;
