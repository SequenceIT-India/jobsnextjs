import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FormHelperText from "@mui/material/FormHelperText";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  JsLogin as empRegister,
  onCopyPasteHandler,
  validateField,
} from "../../../util/helper";
import { employerRegister } from "../../../service/auth";
import { RESPONSE_CODE, DATETIMEFORMAT } from "../../../util/constants";
import JobsHornEncryptAndDecrypt from "../../../util/jhSecurityBuilder";

import styles from "../../../components/login/JsLogin.module.scss";
import colors from "../../../vars.module.scss";

import style from "../../employer/login/EmpLogin.module.scss";

var CryptoJS = require("crypto-js");

const useStyles = makeStyles((theme: any) => ({
  registerFormGrid: {
    [theme.breakpoints.only("xs")]: {
      margin: "5% auto",
    },
  },
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
  termsAndConditionsOne: {
    fontSize: 13,
    marginTop: "1rem",
    [theme.breakpoints.only("xs")]: {
      fontSize: 11,
    },
  },
  termsAndConditionsTwo: {
    fontSize: 13,
    [theme.breakpoints.only("xs")]: {
      fontSize: 11,
    },
  },
  checkbox: {
    fontSize: 20,
    [theme.breakpoints.only("xs")]: {
      fontSize: 16,
    },
  },
  iconColor: {
    color: colors.disableColor,
  },
}));

function EmpRegister() {
  const classes = useStyles();
  const history = useRouter();
  const [showEmpRegisterPassword, setShowEmpRegisterPassword] = useState(false);
  const [showEmpRegisterConfirmPassword, setShowEmpRegisterConfirmPassword] =
    useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    emailId: "",
    companyName: "",
  });

  const initialState = {
    password: "",
    emailId: "",
    companyName: "",
    ipAddress: "1",
    ipAddressBin: "1",
    termsAndCond: false,
  };

  const [values, setValues] = useState(initialState);

  const handleClickShowEmpRegisterPassword = () => {
    setShowEmpRegisterPassword(!showEmpRegisterPassword);
  };

  const handleClickShowEmpRegisterConfirmPassword = () => {
    setShowEmpRegisterConfirmPassword(!showEmpRegisterConfirmPassword);
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
        false
      ),
    });
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const empRegisterOnClickHandler = async (event: any) => {
    event.preventDefault();
    let aesJobsHorn = new JobsHornEncryptAndDecrypt();
    const { timeStamp, saltRandom20Char, cipherText } =
      aesJobsHorn.getFinalOutput(values, DATETIMEFORMAT, "EMP");

    const registrationResponse: any = await employerRegister({
      timeStamp: timeStamp.toString(),
      systemId: saltRandom20Char,
      dataSet: cipherText,
      companyName: values.companyName,
      ipAddress: values.ipAddress,
      ipAddressBin: "1",
      termsAndCond: values.termsAndCond,
    });

    const messages = {
      EMAIL_ALREADY_IN_SYSTEM: "Email already registered in system.",
      ALREADY_EXISTS_IN_SYSTEM:
        "Email already registered in system, try with another email",
    };

    if (registrationResponse &&
      registrationResponse.data &&
      registrationResponse.data.code === RESPONSE_CODE.SUCCESSFUL_REGISTRATION
    ) {
      sessionStorage.setItem("email", values.emailId);
      sessionStorage.setItem("token", registrationResponse.data.token);
      // dispatch({
      //     type: "login",
      //     payload: {
      //         user: { email: data.email, role: 'employer' }
      //     }
      // });

      history.push("/employer/register/page/two");
    } else if (registrationResponse &&
      registrationResponse.data &&
      (registrationResponse.data.code ===
        RESPONSE_CODE.FAILED_REGISTRATION_101 ||
        registrationResponse.data.code ===
        RESPONSE_CODE.FAILED_REGISTRATION_101)
    ) {
      setErrors({
        ...errors,
        emailId: registrationResponse.data.message,
      });
    }
  };

  const cancelClickHandler = () => {
    setValues(initialState);
    setConfirmPassword("");
    setErrors({
      password: "",
      emailId: "",
      companyName: "",
    });
  };

  const handleCheckbox = () => {
    setValues({ ...values, termsAndCond: !values.termsAndCond });
  };

  const cancelBtnIsDisabled = () => {
    let isDisabled =
      values.emailId === "" &&
      values.companyName === "" &&
      confirmPassword === "" &&
      values.password === "" &&
      values.termsAndCond === false;
    return isDisabled;
  };

  const registerBtnIsDisabled = () => {
    let isDisabled =
      values.companyName === "" ||
      confirmPassword === "" ||
      errors.emailId !== "" ||
      errors.password !== "" ||
      values.termsAndCond === false ||
      values.password.length !== confirmPassword.length ||
      values.password !== confirmPassword;
    return isDisabled;
  };

  return (
    <>
      <div className={`${styles?.empRegisterContainer} ${style?.empRegisterContainerBgImage}`}>
        <Grid
          container
          className={`${classes.registerFormGrid} ${styles?.registerFormGrid}`}
        >
          <Grid item lg={4} md={5} sm={8} xs={11} className={styles?.formGrid}>
            <div className={styles?.registerFormDiv}>
              <div className={styles?.employerImageAvatar}>
                <img alt="" src={'../../../../assets/images/employer.png'} />
              </div>
              <div className={styles?.registerTitleDiv}>
                <Typography className={styles?.title}>Employer Registration</Typography>
              </div>
              <form autoComplete="off" className={styles?.form}>
                <div className={`${classes.textFieldDiv} ${styles?.textFieldDiv}`}>
                  <label className={styles?.required}>Business Name</label>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="employer-business-name"
                      placeholder="Manpower Consultant"
                      name={empRegister.businessName}
                      required
                      error={Boolean(errors.companyName)}
                      type="text"
                      onChange={handleChange("companyName")}
                      value={values.companyName}
                      startAdornment={
                        <InputAdornment position="start">
                          <WorkOutlineIcon className={classes.iconColor} />
                        </InputAdornment>
                      }
                    />
                    {errors.companyName && (
                      <FormHelperText error className={styles?.helperText}>
                        {errors.companyName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className={`${classes.textFieldDiv} ${styles?.textFieldDiv}`}>
                  <label className={styles?.required}>Email</label>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="employer-register-email"
                      placeholder="Eg: maria@gmail.com"
                      type="email"
                      value={values.emailId}
                      name={empRegister.email}
                      onChange={handleChange("emailId")}
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
                      id="employer-register-password"
                      name={empRegister.password}
                      required
                      error={Boolean(errors.password)}
                      value={values.password}
                      type={showEmpRegisterPassword ? "text" : "password"}
                      onChange={handleChange("password")}
                      placeholder="password"
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
                            onClick={handleClickShowEmpRegisterPassword}
                            onMouseDown={handleMouseDownPassword}
                            size="large"
                          >
                            {showEmpRegisterPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
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
                      <FormHelperText error className={styles?.helperText}>
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className={`${classes.textFieldDiv} ${styles?.textFieldDiv}`}>
                  <label className={styles?.required}>Confirm Password</label>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="employer-register-confirm-password"
                      value={confirmPassword}
                      name={empRegister.confirmPassword}
                      type={
                        showEmpRegisterConfirmPassword ? "text" : "password"
                      }
                      onChange={(evt) => {
                        setConfirmPassword(evt.target.value);
                      }}
                      error={Boolean(
                        confirmPassword && values.password !== confirmPassword
                      )}
                      onCopy={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      placeholder="confirm password"
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
                            onClick={handleClickShowEmpRegisterConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            size="large"
                          >
                            {showEmpRegisterConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {confirmPassword &&
                      (values.password !== confirmPassword ||
                        values.password.length !== confirmPassword.length) && (
                        <FormHelperText error className={styles?.helperText}>
                          Password and confirm password should be same
                        </FormHelperText>
                      )}
                  </FormControl>
                </div>
                <div className={styles?.termsAndConditions}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleCheckbox}
                        checked={values.termsAndCond}
                        style={{ color: colors.primaryColor }}
                        icon={
                          <CheckBoxOutlineBlankIcon
                            className={classes.checkbox}
                          />
                        }
                        checkedIcon={
                          <CheckBoxIcon className={classes.checkbox} />
                        }
                      />
                    }
                    label={
                      <>
                        <Typography
                          className={classes.termsAndConditionsOne}
                          variant="body1"
                        >
                          By continuing you agree with JobsHorn
                        </Typography>
                        <Typography
                          className={classes.termsAndConditionsTwo}
                          variant="body1"
                        >
                          <Link
                            href="#"><a
                              className={`${styles?.link} ${styles?.registerPolicyLink}`}
                            >Privacy Policy & Terms of use</a></Link>
                        </Typography>
                      </>
                    }
                  />
                </div>
                <div className={styles?.formBtnsDiv}>
                  <div className={styles?.registerBtnsDiv}>
                    <Button
                      className={
                        cancelBtnIsDisabled()
                          ? styles?.outlinedRegisterBtn
                          : styles?.containedRegisterBtn
                      }
                      size="small"
                      variant={cancelBtnIsDisabled() ? "outlined" : "contained"}
                      onClick={cancelClickHandler}
                      disabled={cancelBtnIsDisabled()}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={
                        registerBtnIsDisabled()
                          ? styles?.outlinedRegisterBtn
                          : styles?.containedRegisterBtn
                      }
                      size="small"
                      variant={
                        registerBtnIsDisabled() ? "outlined" : "contained"
                      }
                      disabled={registerBtnIsDisabled()}
                      onClick={empRegisterOnClickHandler}
                    >
                      Register
                    </Button>
                  </div>
                </div>
                <div className={styles?.alreadyHaveAnAccountLoginDiv}>
                  <Typography className={styles?.registerLinkText}>
                    Already have an account?{" "}
                    <Link href="/employer/login" ><a className={styles?.link}>Login</a></Link>
                  </Typography>
                </div>
                <div className={styles?.dividerDiv}>
                  <Divider className={styles?.divider} />
                </div>
                <div className="employerRegisterLink">
                  <Typography className={styles?.loginLinkText}>
                    <Link href="/jobseeker/register"><a
                      style={{ fontWeight: "bold" }}
                      className={styles?.link}
                    >Job Seeker Registration, click here</a></Link>
                  </Typography>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default EmpRegister;
