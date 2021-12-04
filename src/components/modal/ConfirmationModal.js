import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { Button } from "@mui/material";

import colors from "../../vars.module.scss";

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
  },
  btnsDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 0,
    marginBottom: "0.75rem",
    color: colors.primaryDarkColor,
  },
  subTitle: {
    marginTop: 0,
    marginBottom: "1.25rem",
  },
  btn: {
    color: "white",
    backgroundColor: colors.primaryColor,
    "&:hover": {
      backgroundColor: colors.primaryColor,
    },
  },
}));

function ConfirmationModal(props) {
  const classes = useStyles();

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
          <h2 className={classes.title} id="modal-title">
            {props.title}
          </h2>
          <p className={classes.subTitle} id="modal-subtitle">
            {props.message}
          </p>
          <div className={classes.btnsDiv}>
            <Button
              className={classes.btn}
              variant="contained"
              onClick={props.yesBtnClick}
            >
              Yes
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              onClick={props.noBtnClick}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ConfirmationModal;
