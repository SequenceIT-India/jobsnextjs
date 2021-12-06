import React, { useState } from "react";
import { Link } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import { Button, FormHelperText, Grid, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import {
  jsLoginContainer as jsForgotPasswordContainer,
  loginFormGrid as forgotPasswordFormGrid,
  formGrid,
  loginFormDiv as forgotPasswordFormDiv,
  userImageAvatar,
  loginTitleDiv as forgotPasswordTitleDiv,
  title,
  textFieldDiv,
  helperText,
  formBtnsDiv,
  btnsDiv,
  imageTextGrid,
  loginBgImageTextDiv as forgotPasswordBgImageTextDiv,
  imageText,
  required,
  form,
  subtitleDiv,
  containedBtn,
} from "../Login/JsLogin.module.scss";
import colors from "../../../vars.module.scss";

import userImage from "../../../assets/images/user.png";

import {
  JsLogin as jsForgotPassword,
  validateField,
} from "../../../util/helper";
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
  subtitle: {
    width: "67%",
    textAlign: "center",
    fontSize: "14px",
    color: colors.disableColor,
    marginBottom: "0.75rem",
  },
  iconColor: {
    color: colors.disableColor,
  },
  registerDiv: {
    width: "67%",
    marginBottom: "3rem",
    fontWeight: 400,
    fontSize: 14,
  },
  link: {
    textDecoration: "none",
    color: colors.primaryColor,
  },
}));

function JsForgotPassword() {
  const classes = useStyles();

  const initialState = {
    emailId: "",
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (prop) => (event) => {
    setErrors({
      ...errors,
      [prop]: validateField(
        event.target.name,
        event.target.value,
        prop === "password" ? prop : event.target.type,
        event.target.required,
        true
      ),
    });
    setValues({ ...values, [prop]: event.target.value });
  };

  const isValid = () => {
    return values.emailId === "" || errors.emailId !== "";
  };

  const onSubmitBtnClickHandler = () => {};

  return (
    <>
      <div className={jsForgotPasswordContainer}>
        <Grid container className={forgotPasswordFormGrid}>
          <Grid item lg={4} md={5} sm={7} xs={11} className={formGrid}>
            <div className={forgotPasswordFormDiv}>
              <div className={userImageAvatar}>
                <img alt="" src={userImage} />
              </div>
              <div className={forgotPasswordTitleDiv}>
                <Typography className={title}>Forgot Password</Typography>
              </div>
              <div className={subtitleDiv}>
                <Typography className={classes.subtitle}>
                  {INFO.FORGOT_PASSWORD_INFO}
                </Typography>
              </div>
              <form autoComplete="off" className={form}>
                <div className={`${classes.textFieldDiv} ${textFieldDiv}`}>
                  <label className={required}>Email</label>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="jobseeker-login-email"
                      placeholder="Eg: maria@gmail.com"
                      type="email"
                      onChange={handleChange("emailId")}
                      value={values.emailId}
                      name={jsForgotPassword.email}
                      required
                      error={Boolean(errors.emailId)}
                      startAdornment={
                        <InputAdornment position="start">
                          <MailOutlineIcon className={classes.iconColor} />
                        </InputAdornment>
                      }
                    />
                    {errors.emailId && (
                      <FormHelperText error className={helperText}>
                        {errors.emailId}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className={`${formBtnsDiv} ${classes.submitBtnDiv}`}>
                  <div className={btnsDiv}>
                    <Button
                      className={isValid() ? "" : containedBtn}
                      size="small"
                      variant={isValid() ? "outlined" : "contained"}
                      disabled={isValid()}
                      onClick={onSubmitBtnClickHandler}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
                <div className={classes.registerDiv}>
                  <span>
                    Don't have an account?{" "}
                    <Link className={classes.link} to="/jobseeker/register">
                      Register
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </Grid>
          <Grid item lg={5} md={5} sm={7} xs={12} className={imageTextGrid}>
            <div className={forgotPasswordBgImageTextDiv}>
              <Typography className={imageText} variant="h4">
                Reset Your Jobshorn Password
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default JsForgotPassword;
