import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Button, FormHelperText, Grid, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import { onCopyPasteHandler, validateField } from "../../../util/helper";

import { JsLogin as jsResetPassword } from "../../../util/helper";

import {
  jsLoginContainer as jsResetPasswordContainer,
  loginFormGrid as resetPasswordFormGrid,
  formGrid,
  loginFormDiv as resetPasswordFormDiv,
  userImageAvatar,
  loginTitleDiv as resetPasswordTitleDiv,
  title,
  textFieldDiv,
  helperText,
  formBtnsDiv,
  btnsDiv,
  imageTextGrid,
  loginBgImageTextDiv as resetPasswordBgImageTextDiv,
  imageText,
  required,
  form,
  containedBtn,
  subtitleDiv,
  passwordSubtitle,
} from "../Login/JsLogin.module.scss";
import colors from "../../../vars.module.scss";

import userImage from "../../../assets/images/user.png";
import { INFO } from "../../../util/Labels";

const useStyles = makeStyles((theme) => ({
  textFieldDiv: {
    "& > *": {
      margin: theme.spacing(1),
      width: "320px",
    },
    [theme.breakpoints.only("xs")]: {
      "& > *": {
        width: "85vw",
      },
    },
  },
  iconColor: {
    color: colors.disableColor,
  },
  createBtnDiv: {
    marginBottom: "3rem",
  },
}));

function JsResetPassword() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const initialState = {
    password: "",
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleConfirmPasswordOnChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChange = (prop) => (event) => {
    setErrors({
      ...errors,
      [prop]: validateField(
        event.target.name,
        event.target.value,
        prop === "password" ? prop : event.target.type,
        event.target.required,
        false
      ),
    });
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isValid = () => {
    let isValidChk = true;
    Object.keys(errors).forEach((element) => {
      isValidChk = isValidChk && !Boolean(errors[element]);
    });

    Object.keys(values).forEach((element) => {
      isValidChk = isValidChk && Boolean(values[element]);
    });
    return isValidChk;
  };

  const onCreateBtnClick = (event) => {};

  return (
    <>
      <div className={jsResetPasswordContainer}>
        <Grid container className={resetPasswordFormGrid}>
          <Grid item lg={4} md={5} sm={7} xs={11} className={formGrid}>
            <div className={resetPasswordFormDiv}>
              <div className={userImageAvatar}>
                <img alt="" src={userImage} />
              </div>
              <div className={resetPasswordTitleDiv}>
                <Typography className={title}>Create new password</Typography>
              </div>
              <div className={subtitleDiv}>
                <Typography className={passwordSubtitle}>
                  {INFO.RESET_PASSWORD_INFO}
                </Typography>
              </div>
              <form autoComplete="off" className={form}>
                <div className={`${classes.textFieldDiv} ${textFieldDiv}`}>
                  <label className={required}>New password</label>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="jobseeker-new-password"
                      value={values.password}
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange("password")}
                      placeholder="password"
                      name={jsResetPassword.password}
                      required
                      error={Boolean(errors.password)}
                      onCopy={onCopyPasteHandler}
                      onPaste={onCopyPasteHandler}
                      startAdornment={
                        <InputAdornment position="start">
                          <LockIcon className={classes.iconColor} />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {!errors.password && (
                      <FormHelperText
                        style={{ marginLeft: 0, marginRight: 0 }}
                        id="employer-register-helper-text"
                      >
                        Must be 8 to 20 characters, one number and symbol
                      </FormHelperText>
                    )}
                    {errors.password && (
                      <FormHelperText error className={helperText}>
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className={`${classes.textFieldDiv} ${textFieldDiv}`}>
                  <label className={required}>Confirm password</label>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="jobseeker-confirm-new-password"
                      value={confirmPassword}
                      type={showConfirmPassword ? "text" : "password"}
                      onChange={handleConfirmPasswordOnChange}
                      placeholder="Confirm Password"
                      name={jsResetPassword.confirmPassword}
                      required
                      error={Boolean(
                        confirmPassword && values.password !== confirmPassword
                      )}
                      onCopy={onCopyPasteHandler}
                      onPaste={onCopyPasteHandler}
                      startAdornment={
                        <InputAdornment position="start">
                          <LockIcon className={classes.iconColor} />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            size="large"
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {confirmPassword && values.password !== confirmPassword && (
                      <FormHelperText error className={helperText}>
                        Password and confirm password should be same
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className={`${formBtnsDiv} ${classes.createBtnDiv}`}>
                  <div className={btnsDiv}>
                    <Button
                      className={
                        !isValid() ||
                        confirmPassword.length !== values.password.length ||
                        confirmPassword !== values.password
                          ? ""
                          : containedBtn
                      }
                      size="small"
                      variant={
                        !isValid() ||
                        confirmPassword.length !== values.password.length ||
                        confirmPassword !== values.password
                          ? "outlined"
                          : "contained"
                      }
                      disabled={
                        !isValid() ||
                        confirmPassword.length !== values.password.length ||
                        confirmPassword !== values.password
                      }
                      onClick={onCreateBtnClick}
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </Grid>
          <Grid item lg={5} md={5} sm={7} xs={12} className={imageTextGrid}>
            <div className={resetPasswordBgImageTextDiv}>
              <Typography className={imageText} variant="h4">
                Welcome to Jobshorn
              </Typography>
              <Typography className={imageText} variant="body1">
                Change your password
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default JsResetPassword;
