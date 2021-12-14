import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import {
  Button,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import colors from "../../vars.module.scss";
import styles from "./GetRemainderModal.module.scss";

import { JsLogin as modal } from "../../util/helper";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  helperText: {
    marginLeft: 0,
    color: "red",
    marginRight: 0,
  },
  textFieldDiv: {
    "& > *": {
      width: "320px",
    },
    display: "flex",
    flexDirection: "column",
    margin: "1rem 0px 0.5rem",
    [theme.breakpoints.only("xs")]: {
      "& > *": {
        width: "85vw",
      },
    },
  },
  notesDiv: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
    color: colors.textLightColor,
    fontSize: 15,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${colors.blackColor}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "35%",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.only("sm")]: {
      width: "60%",
    },
  },
  btnsDiv: {
    display: "flex",
    justifyContent: "space-between",
    width: "30%",
  },
  btn: {
    fontWeight: 500,
    backgroundColor: colors.primaryColor,
    color: "white",
    "&:hover": {
      backgroundColor: colors.primaryColor,
      color: "white",
    },
  },
}));

function GetRemainderModal(props) {
  const classes = useStyles();

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
          <div className={classes.textFieldDiv}>
            <label className={styles.required}>Email</label>
            <FormControl variant="outlined">
              <OutlinedInput
                id="employer-login-email"
                placeholder="Eg: maria@gmail.com"
                type="email"
                onChange={props.handleChange("emailId")}
                required
                name={modal.email}
                startAdornment={
                  <InputAdornment position="start">
                    <MailOutlineIcon className={classes.iconColor} />
                  </InputAdornment>
                }
              />
              {props.errors.emailId && (
                <FormHelperText error className={classes.helperText}>
                  {props.errors.emailId}
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div className={classes.notesDiv}>
            <label className={styles.label}>Notes (optional)</label>
            <TextareaAutosize
              type="text"
              name={modal.notes}
              onChange={props.handleChange("notes")}
              aria-label="notes textarea"
              minRows={5}
            />
          </div>
          <div className={classes.btnsDiv}>
            <Button
              variant={props.values.emailId === "" ? "outlined" : "contained"}
              disabled={props.values.emailId === ""}
              size="small"
              className={props.values.emailId !== "" ? classes.btn : ""}
              onClick={props.cancelBtnClickHandler}
            >
              Cancel
            </Button>
            <Button
              variant={
                props.values.emailId === "" || props.errors.emailId !== ""
                  ? "outlined"
                  : "contained"
              }
              disabled={
                props.values.emailId === "" || props.errors.emailId !== ""
              }
              size="small"
              className={
                props.values.emailId !== "" && props.errors.emailId === ""
                  ? classes.btn
                  : ""
              }
              onClick={props.submitBtnClickHandler}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default GetRemainderModal;
