import React from "react";

import { Button, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import classes from "./Settings.module.scss";

import { showSnackbar } from "../../../redux/actions";

import {
  verifyEmail,
} from "../../../service/profile";

const VerifyEmail = () => {
  
  const dispatch = useDispatch();
  const submitBtnClickHandler = async () => {
    const updateResponse = await verifyEmail({});
    if (updateResponse.token === null) {
      dispatch(showSnackbar(updateResponse?.message, "warning"));
    }
    else {
      dispatch(showSnackbar(updateResponse?.message, "success"));
    }
  };
  return (
    <div className={classes["verifyEmail"]}>
      <div className={classes["section-title"]}>
        <span>Email Verification</span>
      </div>
      <div className={classes["user-details"]}>
        <div>
          <span>Hi Maria John,</span>
        </div>
        <div>
          <span>
            click the button below to verify your email and start enjoying Jobs
            Horn
          </span>
        </div>
      </div>
      <div className={classes["verify-email-btn-div"]}>
        <Button
          className={classes["verify-email-btn"]}
          size="small"
          variant="contained"
          onClick={submitBtnClickHandler}
        >
          Verify Email
        </Button>
      </div>
      <Divider className={classes["divider"]} />
    </div>
  );
};

export default VerifyEmail;
