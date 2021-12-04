import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { Button, Divider } from "@mui/material";
import { FormControl, OutlinedInput } from "@mui/material";

import deleteIcon from "../../assets/images/deleteIcon.svg";

import colors from "../../vars.module.scss";
import styles from "./DeleteAccountModal.module.scss";
import { useOutlinedInputStyles } from "../../util/CustomInputField";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "27rem",
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

function DeleteAccountModal(props) {
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
          <div className={styles["delete-modal"]}>
            <div className={styles["modal-icon-and-title"]}>
              <img src={deleteIcon} alt="delete account" />
              <span className={styles["modal-title"]}>{props.title}</span>
            </div>
            <Divider />
            <div className={styles["modal-subtitle-div"]}>
              <span className={styles["modal-subtitle"]}>{props.message}</span>
            </div>
            <div className={styles["confirm-password-div"]}>
              <label className={styles["label"]}>
                To confim this, type your password
              </label>
              <FormControl
                variant="outlined"
                className={classes["input-form-control"]}
              >
                <OutlinedInput
                  id="password"
                  placeholder="Password"
                  required
                  type="password"
                  onChange={props.passwordOnChangeHandler}
                  classes={outlinedInputClasses}
                />
              </FormControl>
            </div>
            <div className={classes.btnsDiv}>
              <Button
                variant={props.password === "" ? "outlined" : "contained"}
                onClick={props.cancelBtnClick}
                className={
                  props.password === "" ? classes.outlinedBtn : classes.btn
                }
                size="small"
                disabled={props.password === ""}
              >
                Cancel
              </Button>
              <Button
                variant={props.password === "" ? "outlined" : "contained"}
                className={
                  props.password === "" ? classes.outlinedBtn : classes.btn
                }
                size="small"
                disabled={props.password === ""}
                onClick={props.submitBtnClick}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteAccountModal;
