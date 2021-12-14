import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, FormHelperText, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import JobsHornEncryptAndDecrypt from "../../../util/jhSecurityBuilder";
import { DATETIMEFORMAT, RESPONSE_CODE } from "../../../util/constants";

import { useDispatch } from "react-redux";
import {
  JsLogin as empLogin,
  onCopyPasteHandler,
  validateField,
} from "../../../util/helper";
import { employerLogin } from "../../../service/auth";
import { loginAction, showSnackbar } from "../../../redux/actions";

import styles from "../../../components/login/JsLogin.module.scss";

import style from "./EmpLogin.module.scss";
import colors from "../../../vars.module.scss";

const useStyles = makeStyles((theme: any) => ({
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
}));

const EmpLogin = () => {
  const classes = useStyles();
  const [showEmpLoginPassword, setShowLoginPassword] = useState(false);
  const [errors, setErrors]: any = useState({ password: '', emailId: '' });
  const history = useRouter();
  const dispatch = useDispatch();

  const initialState = {
    password: "",
    emailId: "",
  };
  const [values, setValues]: any = useState(initialState);

  const handleClickShowPassword = () => {
    setShowLoginPassword(!showEmpLoginPassword);
  };

  const handleChange = (prop: any) => (event: any) => {
    const type = prop === "password" ? prop : event.target.type;
    setErrors({
      ...errors,
      [prop]: validateField(
        event.target.name,
        event.target.value,
        type,
        event.target.required,
        true
      ),
    });
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const onLoginBtnClick = (event: any) => {
    let aesJobsHorn = new JobsHornEncryptAndDecrypt();
    const output = aesJobsHorn.getFinalOutput(values, DATETIMEFORMAT, "EMP");
    const { timeStamp, saltRandom20Char, cipherText } = output;
    const result = employerLogin({
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
            sessionStorage.setItem("isEmployee", JSON.stringify(true));

            if (response?.data?.code === RESPONSE_CODE.SUCCESSFUL_LOGIN) {
              history.push("/logged-in");
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

  return (
    <>
      <div className={`${styles?.empLoginContainer} ${style?.empLoginContainerBgImage}`}>
        <Grid container className={styles?.loginFormGrid}>
          <Grid item lg={4} md={5} sm={8} xs={11} className={styles?.formGrid}>
            <div className={styles?.loginFormDiv}>
              <div className={styles?.employerImageAvatar}>
                <img alt="" src={'../../../assets/images/employer.png'} />
              </div>
              <div className={styles?.loginTitleDiv}>
                <Typography className={styles?.title}>Employer Login</Typography>
              </div>
              <form autoComplete="off" className={styles?.form}>
                <div className={`${classes.textFieldDiv} ${styles?.textFieldDiv}`}>
                  <label className={styles?.required}>Email</label>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="employer-login-email"
                      placeholder="Eg: maria@gmail.com"
                      type="email"
                      onChange={handleChange("emailId")}
                      value={values.emailId}
                      name={empLogin.email}
                      required
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
                      id="employer-login-password"
                      value={values.password}
                      type={showEmpLoginPassword ? "text" : "password"}
                      onChange={handleChange("password")}
                      onCopy={onCopyPasteHandler}
                      onPaste={onCopyPasteHandler}
                      placeholder="password"
                      name={empLogin.password}
                      required
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
                            {showEmpLoginPassword ? (
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
                        setErrors({ emailId: '', password: '' });
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
                    <Link href="/employer/forgot/password"><a className={styles?.link}>
                      Forgot password ?</a></Link>
                  </div>
                </div>
                <div className={styles?.dontHaveAccountRegisterDiv}>
                  <Typography className={styles?.registerLinkText}>
                    Don't have an account?{" "}
                    <Link href="/employer/register/page/one"><a className={styles?.link}>
                      Register</a></Link>
                  </Typography>
                </div>
                <div className={styles?.dividerDiv}>
                  <Divider className={styles?.divider} />
                </div>
                <div className="jobseekerLoginLinkDiv">
                  <Typography className={styles?.loginLinkText}>
                    <Link
                      href="/jobseeker/login"><a
                        style={{ fontWeight: "bold" }}
                        className={styles?.link}
                      >Job Seeker Login, click here</a>
                    </Link>
                  </Typography>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default EmpLogin;
