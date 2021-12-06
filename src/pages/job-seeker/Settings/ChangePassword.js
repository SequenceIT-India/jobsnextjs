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

import { ERROR_MESSAGE } from "../../../util/Labels";

import { useDispatch } from "react-redux";

import JobsHornEncryptAndDecrypt from "../../../util/jhSecurityBuilder.js";
import { showSnackbar } from "../../../redux/actions";


import { DATETIMEFORMAT, RESPONSE_CODE } from "../../../util/constants";
import classes from "./Settings.module.scss";
import { useOutlinedInputStyles } from "../../../util/CustomInputField";
import {
  validateField,
  JsLogin as JsChangePassword,
} from "../../../util/helper";

import {
  changePasswordAPI,
} from "../../../service/profile";


const ChangePassword = () => {
  const outlinedInputClasses = useOutlinedInputStyles();

  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const dispatch = useDispatch();
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleOnChange = (prop) => (e) => {
    setErrors({
      ...errors,
      [prop]: validateField(
        e.target.name,
        e.target.value,
        e.target.type,
        e.target.required,
        false
      ),
    });
    setValues({ ...values, [prop]: e.target.value });
  };

  const isValid = () => {
    let isEqual = false;
    let isValidChk = true;
    Object.keys(errors).forEach((element) => {
      isValidChk = isValidChk && !Boolean(errors[element]);
    });

    Object.keys(values).forEach((element) => {
      isValidChk = isValidChk && Boolean(values[element]);
    });
    return isValidChk || isEqual;
  };

  const confirmPasswordOnChangeHandler = (e) => {
    setConfirmNewPassword(e.target.value);
  };
  const onSubmit = async (evt) => {
    evt.preventDefault();
    if (isValid()) {
      await saveChangePassword();
    }
    else { dispatch(showSnackbar(ERROR_MESSAGE.CHANGE_PASSWORD, "warning")); }
  };

  const saveChangePassword = async () => {
    let aesJobsHorn = new JobsHornEncryptAndDecrypt();
    const output = aesJobsHorn.getFinalOutput(values, DATETIMEFORMAT, "CAND", true);
    const { timeStamp, saltRandom20Char, cipherText } = output;
    // changes password - dataset:{oldpassword:, newPassword}, jwtToken:
    const updateResponse = await changePasswordAPI({
      timeStamp: timeStamp.toString(),
      systemId: saltRandom20Char,
      dataSet: cipherText,
    }, sessionStorage.getItem('isEmployee') ? 'employer' : 'user');
    if (updateResponse?.message !== 'UPDATE_SUCCESS') {
      dispatch(showSnackbar(updateResponse?.error || updateResponse?.message, "warning"));
    }
    else {
      setValues({
        oldPassword: "",
        newPassword: "",
      })
      setConfirmNewPassword("")
      dispatch(showSnackbar(updateResponse?.message, 'success'));
    }
  };
  return (
    <>
      <Typography className={classes["section-title"]}>
        Change Password
      </Typography>
      <Grid container>
        <div className={classes["password-validation-info"]}>
          <span>Old Password and New Password cannot be same.</span>
        </div>
        <Grid item lg={5} xs={12} md={5} className={classes["input-grid"]}>
          <label className={classes.label}>Old Password</label>
          <FormControl
            variant="outlined"
            className={classes["input-form-control"]}
          >
            <OutlinedInput
              id="old-password"
              placeholder="Old Password"
              required
              name={JsChangePassword.oldPassword}
              type="password"
              value={values.oldPassword}
              classes={outlinedInputClasses}
              onChange={handleOnChange("oldPassword")}
            />
            <FormHelperText error className={classes["helper-text"]}>
              {errors.oldPassword}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes["new-password-grid"]}>
        <Grid item lg={5} xs={12} md={5} className={classes["input-grid"]}>
          <label className={classes.label}>New Password</label>
          <FormControl
            variant="outlined"
            className={classes["input-form-control"]}
          >
            <OutlinedInput
              id="new-password"
              placeholder="New Password"
              name={JsChangePassword.newPassword}
              required
              value={values.newPassword}
              type="password"
              classes={outlinedInputClasses}
              onChange={handleOnChange("newPassword")}
            />
            <FormHelperText error className={classes["helper-text"]}>
              {values.oldPassword !== values.newPassword
                ? errors.newPassword
                : values.oldPassword !== "" && values.newPassword !== ""
                ? "Old Password And New Password Must be different"
                : ""}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item lg={5} xs={12} md={5}>
          <label className={classes.label}>Confirm New Password</label>
          <FormControl
            variant="outlined"
            className={classes["input-form-control"]}
          >
            <OutlinedInput
              id="confirm-new-password"
              placeholder="Confirm New Password"
              required
              value={confirmNewPassword}
              name={JsChangePassword.confirmNewPassword}
              type="password"
              classes={outlinedInputClasses}
              onChange={confirmPasswordOnChangeHandler}
            />
            {confirmNewPassword && values.newPassword !== confirmNewPassword && (
              <FormHelperText error className={classes["helper-text"]}>
                Password and confirm password should be same
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={2} xs={2} md={2} className={classes["btn-grid"]}>
          <Button
            onClick={onSubmit}
            size={
              window.innerWidth <= 599
                ? "small"
                : window.innerWidth >= 600 && window.innerWidth <= 767
                  ? "medium"
                  : "large"
            }
            variant={!isValid() ? "outlined" : "contained"}
            disabled={!isValid()}
            className={
              !isValid()
                ? classes["change-btn-outlined"]
                : classes["change-btn-contained"]
            }
          >
            Change
          </Button>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </>
  );
};

export default ChangePassword;
