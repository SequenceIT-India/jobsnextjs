import React, { useState } from "react";
import {
  Typography,
  FormControl,
  OutlinedInput,
  Button,
  Grid,
  Divider,
  FormHelperText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import classes from "./Settings.module.scss";
import DeleteAccountModal from "../../../components/modal/DeleteAccountModal";

import { showSnackbar, loginAction } from "../../../redux/actions";

import { ERROR_MESSAGE } from "../../../util/Labels";
import JobsHornEncryptAndDecrypt from "../../../util/jhSecurityBuilder.js";

import { DATETIMEFORMAT } from "../../../util/constants";


import { validateField, JsLogin as JsSettings } from "../../../util/helper";
import { useOutlinedInputStyles } from "../../../util/CustomInputField";

import {
  changeEmailAPI,
} from "../../../service/profile";

const ChangeEmail = () => {
  const outlinedInputClasses = useOutlinedInputStyles();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleOnChange = (e) => {
    setEmailError(
      validateField(
        e.target.name,
        e.target.value,
        e.target.type,
        e.target.required,
        false
      )
    );
    setEmail(e.target.value);
  };

  const isValid = () => {
    return emailError !== "" || email === "";
  };


  const onSubmit = async (evt) => {
    evt.preventDefault();
    if (!isValid() && password) {
      await saveChangeEmail();
    }
    else { dispatch(showSnackbar(ERROR_MESSAGE.EMAIL_CHANGES, "warning")); }
  };

  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const deleteAccountOnClickHandler = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPassword("");
    setOpen(false);
  };

  const saveChangeEmail = async () => {
    let aesJobsHorn = new JobsHornEncryptAndDecrypt();
    const output = aesJobsHorn.getFinalOutput({ newEmail: email, password: password }, DATETIMEFORMAT, "CAND", true);
    const { timeStamp, saltRandom20Char, cipherText } = output;
    const updateResponse = await changeEmailAPI({
      timeStamp: timeStamp.toString(),
      systemId: saltRandom20Char,
      dataSet: cipherText,
    });
    if (updateResponse.token === null) {
      dispatch(showSnackbar(updateResponse?.message, "warning"));
    }
    else {
      handleClose();
      dispatch(loginAction(updateResponse));
      dispatch(showSnackbar(updateResponse?.message, "success"));
    }
  };
  return (
    <>
      <Typography className={classes["section-title"]}>
        Change your email id on file to new email
      </Typography>
      <Grid container>
        <Grid item lg={8} xs={12} md={8}>
          <label className={classes.label}>New email</label>
          <FormControl
            variant="outlined"
            className={classes["input-form-control"]}
          >
            <OutlinedInput
              id="new-email"
              placeholder="Eg: maria@gmail.com"
              required
              name={JsSettings.email}
              type="email"
              value={email}
              onChange={handleOnChange}
              classes={outlinedInputClasses}
            />
            <FormHelperText error className={classes["helper-text"]}>
              {emailError}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item lg={4} xs={2} md={4} className={classes["btn-grid"]}>
          <Button
            onClick={deleteAccountOnClickHandler}
            size={
              window.innerWidth <= 599
                ? "large"
                : window.innerWidth >= 600 && window.innerWidth <= 767
                  ? "large"
                  : "large"
            }
            variant={isValid() ? "outlined" : "contained"}
            disabled={isValid()}
            className={
              isValid()
                ? classes["submit-btn-outlined"]
                : classes["submit-btn-contained"]
            }
          >
            CHANGE EMAIL
          </Button>
        </Grid>
      </Grid>
      <DeleteAccountModal
        title={"Update Email"}
        message={''}
        open={open}
        password={password}
        passwordOnChangeHandler={passwordOnChangeHandler}
        handleClose={handleClose}
        submitBtnClick={onSubmit}
        cancelBtnClick={handleClose}
      />
      <Divider className={classes["divider"]} />
    </>
  );
};

export default ChangeEmail;
