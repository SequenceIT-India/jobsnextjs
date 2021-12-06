import React from "react";

import { Grid } from "@mui/material";

import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import VerifyEmail from "./VerifyEmail";

import classes from "./Settings.module.scss";

const Settings = () => {
  return (
    <>
      <Grid container className={classes["main-container"]}>
        <Grid item lg={6} md={8} sm={10} xs={12}>
          <span className={classes["page-title"]}>Settings</span>
          <div className={classes["email-details-div"]}>
            <span>Your email id on file</span>
            <span className={classes["email-id"]}>hello@gmail.com</span>
          </div>
          <VerifyEmail />
          <ChangeEmail />
          <ChangePassword />
          <DeleteAccount />
        </Grid>
      </Grid>
    </>
  );
};

export default Settings;
