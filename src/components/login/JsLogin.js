import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, FormHelperText, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import makeStyles from "@mui/styles/makeStyles";
import LockIcon from "@mui/icons-material/Lock";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { DATETIMEFORMAT, RESPONSE_CODE } from "../../util/constants";

import JobsHornEncryptAndDecrypt from "../../util/jhSecurityBuilder.js";

import { login } from "../../service/auth";
import { useDispatch } from "react-redux";
import { loginAction, showSnackbar } from "../../redux/actions";
import { JsLogin as jsLogin, validateField } from "../../util/helper";

import styles from "./JsLogin.module.scss";

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
    color: '#5b5b5b',
  },
}));

function JsLogin() {
  const classes = useStyles();
  const [showJsLoginPassword, setShowJsLoginPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useRouter();
  const initialState = {
    password: "",
    emailId: "",
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({ password: '', emailId: '' });

  const handleClickShowPassword = () => {
    setShowJsLoginPassword(!showJsLoginPassword);
  };

  const handleChange = (prop) => (event) => {
    const type = prop === "password" ? prop : event.target.type;
    setErrors({
      ...errors,
      [prop]: validateField(
        event.target.name,
        event.target.value,
        type,
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
      // eslint-disable-next-line
      isValidChk = isValidChk && !Boolean(errors[element]);
    });

    Object.keys(values).forEach((element) => {
      // eslint-disable-next-line
      isValidChk = isValidChk && Boolean(values[element]);
    });

    return isValidChk;
  };

  const onLoginBtnClick = async (event) => {
    let aesJobsHorn = new JobsHornEncryptAndDecrypt();
    const output = aesJobsHorn.getFinalOutput(values, DATETIMEFORMAT, "CAND");
    const { timeStamp, saltRandom20Char, cipherText } = output;
    const result = login({
      timeStamp: timeStamp.toString(),
      systemId: saltRandom20Char,
      dataSet: cipherText,
    });
    result
      .then((response) => {
        if (response.status === 200) {
          if (
            (!response?.data?.token || response?.data?.token == null) &&
            [
              RESPONSE_CODE.INVALID_CREDENTIALS,
              RESPONSE_CODE.INVALID_USER,
              RESPONSE_CODE.INVALID_ACCOUNT_STATUS,
              RESPONSE_CODE.EMAIL_NOT_REGISTERED,
              RESPONSE_CODE.INVALID_TIMESTAMP_IN_REQUEST,
              RESPONSE_CODE.UNEXPECTED_ERROR,
            ].indexOf(response?.data?.code) !== -1
          ) {
            dispatch(showSnackbar(response?.data.message, "warning"));
          } else {
            if (response?.data?.code === RESPONSE_CODE.SUCCESSFUL_LOGIN) {
              history.push("/jobseeker/homepage");
            } else if (
              response?.data?.code === RESPONSE_CODE.INCOMPLETE_PROFILE
            ) {
              history.push("/jobseeker/create-profile");
            } else {
              history.push("/logged-in");
            }
            dispatch(loginAction({ ...response.data, email: values.emailId }));
          }
        } else {
          dispatch(showSnackbar("Something went wrong", "warning"));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles?.jsLoginContainer}>
        <Grid container className={styles?.loginFormGrid}>
          <Grid item lg={4} md={5} sm={7} xs={11} className={styles?.formGrid}>
            <div className={styles?.loginFormDiv}>
              <div className={styles?.userImageAvatar}>
                <img alt="" src={`../../../assets/images/user.png`} />
              </div>
              <div className={styles?.loginTitleDiv}>
                <Typography className={styles?.title}>Job Seeker Login</Typography>
              </div>
              <form autoComplete="off" className={styles?.form}>
                <div className={`${classes.textFieldDiv} ${styles?.textFieldDiv}`}>
                  <label className={styles?.required}>Email</label>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="jobseeker-login-email"
                      placeholder="Eg: maria@gmail.com"
                      type="email"
                      onChange={handleChange("emailId")}
                      value={values.emailId}
                      name={jsLogin.email}
                      required
                      error={Boolean(errors.emailId)}
                      startAdornment={
                        <InputAdornment position="start">
                          <MailOutlineIcon className={classes.iconColor} />
                        </InputAdornment>
                      }
                    />
                    {errors.emailId && (
                      <FormHelperText error className={styles?.helperText}>
                        {errors.emailId}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className={`${classes.textFieldDiv} ${styles?.textFieldDiv}`}>
                  <label className={styles?.required}>Password</label>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="jobseeker-login-password"
                      value={values.password}
                      type={showJsLoginPassword ? "text" : "password"}
                      onChange={handleChange("password")}
                      placeholder="password"
                      name={jsLogin.password}
                      required
                      inputProps={{
                        maxLength: 128,
                        minLength: 8,
                      }}
                      error={Boolean(errors.password)}
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
                            {showJsLoginPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.password && (
                      <FormHelperText error className={styles?.helperText}>
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className={styles?.formBtnsDiv}>
                  <div className={styles?.btnsDiv}>
                    <Button
                      className={
                        values.emailId === "" && values.password === ""
                          ? ""
                          : styles?.containedBtn
                      }
                      size="small"
                      variant={
                        values.emailId === "" && values.password === ""
                          ? "outlined"
                          : "contained"
                      }
                      onClick={() => {
                        setValues(initialState);
                        setErrors({ password: '', emailId: '' });
                      }}
                      disabled={values.emailId === "" && values.password === ""}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={isValid() ? styles?.containedBtn : ""}
                      size="small"
                      variant={isValid() ? "contained" : "outlined"}
                      disabled={!isValid()}
                      onClick={onLoginBtnClick}
                    >
                      Login
                    </Button>
                  </div>
                  <div className={styles?.forgotPasswordDiv}>
                    <Link href="/jobseeker/forgot-password" >
                      <a className={styles?.link} >Forgot password ?</a>
                    </Link>
                  </div>
                </div>
                <div className={styles?.dontHaveAccountRegisterDiv}>
                  <Typography className={styles?.registerLinkText}>
                    Don't have an account?{" "}
                    <Link href="/jobseeker/register" >
                      <a className={styles?.link} >Register</a>
                    </Link>
                  </Typography>
                </div>
                <div className={styles?.dividerDiv}>
                  <Divider className={styles?.divider} />
                </div>
                <div className="employerLoginLinkDiv">
                  <Typography className={styles?.loginLinkText}>
                    <Link
                      href="/employer/login"

                    >
                      <a style={{ fontWeight: "bold" }}
                        className={styles?.link} >Employer Login, click here</a>
                    </Link>
                  </Typography>
                </div>
              </form>
            </div>
          </Grid>
          <Grid item lg={5} md={5} sm={7} xs={12} className={styles?.imageTextGrid}>
            <div className={styles?.loginBgImageTextDiv}>
              <Typography className={styles?.imageText} variant="h4">
                Welcome to Jobshorn
              </Typography>
              <Typography className={styles?.imageText} variant="body1">
                Sign in to continue to your account
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default JsLogin;
