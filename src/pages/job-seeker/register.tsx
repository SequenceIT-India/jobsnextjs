import { Button, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Radio from "@mui/material/Radio";
import JobsHornEncryptAndDecrypt from "../../util/jhSecurityBuilder.js";
import { makeStyles } from '@material-ui/core/styles';
import withStyles from "@mui/styles/withStyles";
import LockIcon from "@mui/icons-material/Lock";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from 'next/link'
import { loginAction } from "../../redux/actions";
import { userRegister } from "../../service/auth";
import { DATETIMEFORMAT, RESPONSE_CODE } from "../../util/constants";
import { JsLogin as jsRegister, validateField } from "../../util/helper";
import colors from "./../../vars.module.scss";
import styles from "./Login/JsLogin.module.scss";



// userImageAvatar,

const useStyles = makeStyles((theme) => ({
  textFieldDiv: {
    "& > *": {
      margin: theme?.spacing(1),
      width: "320px",
    },
    [theme?.breakpoints.only("xs")]: {
      "& > *": {
        width: "85vw",
      },
    },
  },
  iconColor: {
    color: colors.disableColor,
  },
  helperText: {
    marginLeft: 0,
    marginRight: 0,
  },
}));
const CustomRadio = withStyles({
  root: {
    color: "#3D8A94",
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
function register() {
  const classes = useStyles();
  const [showJsRegisterPassword, setShowJsRegisterPassword] = useState(false);
  const [errors, setErrors] = useState({ emailId: '', password: '' });
  const router = useRouter();
  const dispatch = useDispatch();
  const initialState = {
    password: "",
    emailId: "",
    jobAlerts: "Y",
  };
  const [values, setValues] = useState(initialState);
  const handleClickShowJsRegisterPassword = () => {
    setShowJsRegisterPassword(!showJsRegisterPassword);
  };
  const handleChange = (prop: string) => (event: any) => {
    console.log(prop, event)
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
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const isValid = () => {
    let isValidChk = true;
    Object.keys(errors).forEach((element: any) => {
      isValidChk = isValidChk && !Boolean(errors?.[`element`]);
    });
    Object.keys(values).forEach((element) => {
      isValidChk = isValidChk && Boolean(values?.[`element`]);
    });
    return isValidChk;
  };

  const onRegisterClick = async (event: any) => {
    let aesJobsHorn = new JobsHornEncryptAndDecrypt();
    const { timeStamp, saltRandom20Char, cipherText } =
      aesJobsHorn.getFinalOutput(values, DATETIMEFORMAT, "CAND");
    const { emailId, jobAlerts } = values;
    const registrationResponse = await userRegister({
      emailId,
      jobAlerts,
      timeStamp: timeStamp.toString(),
      systemId: saltRandom20Char,
      dataSet: cipherText,
      termsAndCond: 1,
    });
    const messages = {
      EMAIL_ALREADY_IN_SYSTEM: "Email already registered in system.",
      ALREADY_EXISTS_IN_SYSTEM:
        "Email already registered in system, try with another email",
    };
    if (
      registrationResponse.data &&
      registrationResponse.data.code === RESPONSE_CODE.SUCCESSFUL_REGISTRATION
    ) {
      sessionStorage.setItem("email", values.emailId);
      sessionStorage.setItem("token", registrationResponse.data.token);
      router.push("/jobseeker/create-profile");
      dispatch(
        loginAction({ ...registrationResponse.data, email: values.emailId })
      );
    } else if (
      registrationResponse.data &&
      [
        RESPONSE_CODE.INVALID_CREDENTIALS,
        RESPONSE_CODE.EMAIL_ALREADY_IN_SYSTEM,
        RESPONSE_CODE.INVALID_TIMESTAMP_IN_REQUEST,
        RESPONSE_CODE.UNEXPECTED_ERROR,
      ].indexOf(registrationResponse.data.code) !== -1
    ) {
      setErrors({
        ...errors,
        email: messages[registrationResponse.data.message],
      });
    }
  };

  return (
    <>
      <div className={styles?.jsRegisterContainer}>
        <Grid container className={styles?.registerFormGrid}>
          <Grid item lg={4} md={5} sm={8} xs={11} className={styles?.formGrid}>
            <div className={styles?.registerFormDiv}>
              <div className={styles?.userImageAvatar}>
                <img alt="" src={`./../../../public/assets/images/user.png`} />
              </div>
              <div className={styles?.registerTitleDiv}>
                <Typography className={styles?.title}>
                  Job Seeker Registration
                </Typography>
              </div>
              <form autoComplete="off" className={styles?.form}>
                <div className={`${classes.textFieldDiv} ${styles?.textFieldDiv}`}>
                  <label className={styles?.required}>Email</label>
                  <FormControl variant="outlined">
                    <OutlinedInput
                      id="jobseeker-register-email"
                      placeholder="Eg: maria@gmail.com"
                      type="email"
                      name={jsRegister.email}
                      onChange={handleChange("emailId")}
                      required
                      error={Boolean(errors.emailId)}
                      value={values.emailId}
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
                      id="jobseeker-register-password"
                      name={jsRegister.password}
                      required
                      inputProps={{
                        maxLength: 128,
                        minLength: 8,
                      }}
                      value={values.password}
                      type={showJsRegisterPassword ? "text" : "password"}
                      onChange={handleChange("password")}
                      placeholder="password"
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
                            onClick={handleClickShowJsRegisterPassword}
                            onMouseDown={handleMouseDownPassword}
                            size="large"
                          >
                            {showJsRegisterPassword ? (
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
                        className={classes.helperText}
                        id="employer-register-helper-text"
                      >
                        Must be 8 to 128 characters, one number and symbol
                      </FormHelperText>
                    )}
                    {errors.password && (
                      <FormHelperText error className={styles?.helperText}>
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className={styles?.registerSendAlertsYesOrNoText}>
                  <Typography className={styles?.alertsText} variant="body1">
                    Get email about related career updates, job alerts, managed
                    saved alerts, you can manage alerts or unsubscribe anytime
                  </Typography>
                </div>
                <div className={styles?.registerRadioBtnsDiv}>
                  <div className={styles?.radioBtn}>
                    <FormControlLabel
                      value="Y"
                      control={
                        <CustomRadio
                          onChange={(evt, checked) => {
                            setValues({
                              ...values,
                              jobAlerts: checked ? "Y" : "N",
                            });
                          }}
                        />
                      }
                      label="Yes"
                      checked={values.jobAlerts === "Y"}
                    />
                  </div>
                  <div className={styles?.radioBtn}>
                    <FormControlLabel
                      value="N"
                      control={
                        <CustomRadio
                          onChange={(evt, checked) => {
                            setValues({
                              ...values,
                              jobAlerts: checked ? "N" : "Y",
                            });
                          }}
                        />
                      }
                      label="No"
                      checked={values.jobAlerts === "N"}
                    />
                  </div>
                </div>
                <div className={styles?.termsAndConditions}>
                  <Typography
                    style={{ fontSize: 13, color: colors.disableColor }}
                    variant="body1"
                  >
                    By continuing you agree with JobsHorn
                  </Typography>
                  <Typography style={{ fontSize: 13 }} variant="body1">
                    <Link href="#" >
                      <a>Privacy Policy & Terms of use</a>
                    </Link>
                  </Typography>
                </div>
                <div className={styles?.formBtnsDiv}>
                  <div className={styles?.registerBtnsDiv}>
                    <Button
                      className={
                        values.emailId === "" && values.password === ""
                          ? styles?.outlinedRegisterBtn
                          : styles?.containedRegisterBtn
                      }
                      size="small"
                      variant={
                        values.emailId === "" && values.password === ""
                          ? "outlined"
                          : "contained"
                      }
                      onClick={() => {
                        setValues(initialState);
                        setErrors({emailId:'', password:''});
                      }}
                      disabled={values.emailId === "" && values.password === ""}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={
                        !isValid() ? styles?.outlinedRegisterBtn : styles?.containedRegisterBtn
                      }
                      size="small"
                      variant={!isValid() ? "outlined" : "contained"}
                      disabled={!isValid()}
                      onClick={onRegisterClick}
                    >
                      Register
                    </Button>
                  </div>
                </div>
                <div className={styles?.alreadyHaveAnAccountLoginDiv}>
                  <Typography className={styles?.registerLinkText}>
                    Already have an account?{" "}
                    <Link href="/job-seeker/login" >
                      <a className={styles?.link}>Login</a>
                    </Link>

                  </Typography>
                </div>
                <div className={styles?.dividerDiv}>
                  <Divider className={styles?.divider} />
                </div>
                <div className="employerRegisterLink">
                  <Typography className={styles?.loginLinkText}>
                    <Link
                      href="/employer/register/page/one"
                    >
                      <a className={styles?.link} style={{ fontWeight: "bold" }}>Employer Registration, click here</a>
                    </Link>
                  </Typography>
                </div>
              </form>
            </div>
          </Grid>
          <Grid item lg={5} md={5} sm={8} className={styles?.imageTextGrid}>
            <div className={styles?.registerBgImageTextDiv}>
              <Typography className={styles?.imageText} variant="h4">
                Welcome to Jobshorn
              </Typography>
              <Typography className={styles?.imageText} variant="body1">
                Register by filling your details
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default register;
