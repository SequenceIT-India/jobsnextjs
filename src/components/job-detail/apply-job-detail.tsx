import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Attachment,
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { defaultStyles, FileIcon } from "react-file-icon";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { loginAction } from "../../redux/actions";
import { login } from "../../service/auth";
import { RESPONSE_CODE } from "../../util/constants";
import { validateField } from "../../util/helper";
import styles from "./apply-job-detail.module.scss";

const useStyles = makeStyles((theme) => ({
  input: {},
  modal: {},
  helperText: {
    marginLeft: 0,
    color: "red",
  },
  btnsDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ApplyJobDetail = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    password: "",
    emailId: "",
    fullname: '',
    notes: ''
  });
  const [loginDataErr, setLoginDataErr]: any = useState({});

  const onLoginChange = (prop: any) => (event: any) => {
    setLoginDataErr({
      ...loginDataErr,
      [prop]: validateField(
        event.target.name,
        event.target.value,
        prop === "password" ? prop : event.target.type,
        event.target.required,
        true
      ),
    });
    setLoginData({ ...loginData, [prop]: event.target.value });
  };

  const [file, setFile]: any = useState(null);

  const [showJsLoginPassword, setShowJsLoginPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowJsLoginPassword(!showJsLoginPassword);
  };

  const onLoginBtnClick = (event: any) => {
    const emailErr = validateField(
      "emailId",
      loginData.emailId,
      "text",
      true,
      true
    );

    const passwordErr = validateField(
      "password",
      loginData.password,
      "password",
      true,
      true
    );
    setLoginDataErr({
      ...loginDataErr,
      emailId: emailErr,
      password: passwordErr,
    });

    if (!emailErr && !passwordErr) {
      const result = login(loginData);
      result
        .then((response) => {
          if (response.data) {
            if (response.data.code === RESPONSE_CODE.EMAIL_NOT_REGISTERED) {
              setLoginDataErr({
                ...loginDataErr,
                emailId: "Email Id is not registered",
              });
            } else if (!response.data.token) {
              setLoginDataErr({
                ...loginDataErr,
                emailId: "Invalid credentials",
                password: " ",
              });
            } else {
              dispatch(loginAction(response.data));
            }
          }
        })
        .catch((err) => {
          setLoginDataErr({
            ...loginDataErr,
            password: "Invalid credentials",
          });
        });
    }
  };

  const getIconStyle = (filename: any) => {
    const extension = filename.split(".").pop().toLowerCase();
    return defaultStyles[extension] || defaultStyles.txt;
  };

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={`${classes.modal} ${styles[`apply-job-detail`]}`}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={`${styles[`content`]}`}>
          <h2
            style={{ marginTop: 0, marginBottom: "0.75rem" }}
            id="modal-title"
          >
            Use professional profile to apply
          </h2>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className={`${styles[`field-row-container`]}`}
          >
            <Grid item xs={12} md={6} className={`${styles[`field`]}`}>
              <InputLabel className={`${styles[`field-label`]}`}>Username or email</InputLabel>
              <TextField
                name="email"
                id="email"
                onChange={onLoginChange("emailId")}
                variant="outlined"
                required
                placeholder="Enter username or email"
                size="medium"
                value={loginData.emailId}
                error={Boolean(loginDataErr.emailId)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined className={`${styles[`icon`]}`} />
                    </InputAdornment>
                  ),
                }}
              />
              {loginDataErr.emailId && (
                <FormHelperText error className={classes.helperText}>
                  {loginDataErr.emailId}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} md={6} className={`${styles[`field`]} `}>
              <InputLabel className={`${styles[`field-label`]}`}>Password</InputLabel>
              <TextField
                type={showJsLoginPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={onLoginChange("password")}
                variant="outlined"
                error={Boolean(loginDataErr.password)}
                required
                placeholder="Enter password"
                size="medium"
                value={loginData.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined className={`${styles[`icon`]}`} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={handleClickShowPassword}
                        size="large"
                      >
                        {showJsLoginPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {loginDataErr.password && (
                <FormHelperText error className={classes.helperText}>
                  {loginDataErr.password}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className={`${styles[`field-row-container`]}`}
          >
            <Grid item xs={12} md={3} className={`${styles[`field`]}`}>
              <Button className={`${styles[`login-btn`]}`} onClick={onLoginBtnClick}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} md={3} className={`${styles[`field`]} `}>
              Dont have an account? &nbsp;{" "}
              <Link href="/jobseeker/register"><a className={`${styles[`link`]}`}>
                Register</a>
              </Link>
            </Grid>
            <Grid item xs={12} md={6} className={`${styles[`field`]}`}>
              <Link href="/jobseeker/register"><a className={`${styles[`link`]}`}>
                Forgot Password ?</a>
              </Link>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className={`${styles[`field-row-container`]}`}
          >
            <Grid item xs={12} md={12} className={`${styles[`field`]}`}>
              <h2
                style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}
                id="modal-title"
              >
                Or send your application quickly without registration
              </h2>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className={`${styles[`field-row-container`]}`}
          >
            <Grid item xs={12} md={6} className={`${styles[`field`]}`}>
              <InputLabel className={`${styles[`field-label`]}`}>Full name</InputLabel>
              <TextField
                name="email"
                id="email"
                onChange={onLoginChange}
                variant="outlined"
                required
                placeholder="Enter full name"
                size="medium"
                value={loginData.fullname}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined className="icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} className={`${styles[`field`]}`}>
              <InputLabel className={`${styles[`field-label`]}`}>Email</InputLabel>
              <TextField
                type="password"
                name="email"
                id="email"
                onChange={onLoginChange}
                variant="outlined"
                required
                placeholder="Enter email"
                size="medium"
                value={loginData.emailId}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined className="icon" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className={`${styles[`field-row-container`]}`}
          >
            <Grid item xs={12} md={12} className={`${styles[`field`]}`}>
              <InputLabel className={`${styles[`field-label`]}`}>Notes</InputLabel>
              <TextField
                name="notes"
                id="notes"
                onChange={onLoginChange}
                variant="outlined"
                required
                multiline
                maxRows={6}
                rows={4}
                placeholder="Enter notes"
                size="medium"
                value={loginData.notes}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className={`${styles[`field-row-container`]}`}
          >
            <Grid item xs={12} md={12} className={`${styles[`field`]}`}>
              <InputLabel className={`${styles[`field-label`]}`}>Attach file</InputLabel>
              <input
                accept="image/*"
                className={classes.input}
                style={{ display: "none" }}
                id="raised-button-file"
                multiple={false}
                onChange={(evt: any) => {
                  setFile(evt.target.files.length ? evt.target.files[0] : null);
                }}
                type="file"
              />
              <label
                className={`${styles[`raised-button-file`]}`}
                htmlFor="raised-button-file"
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  className={`${styles[`field-row-container`]}`}
                >
                  <Grid item xs={12} md={6} className={`${styles[`field`]}`}>
                    {file && file != null ? (
                      <span className={`${styles[`attach-file-label`]}`}>
                        <FileIcon
                          extension={
                            file && file?.name
                              ? file?.name?.split(".").pop().toLowerCase()
                              : ""
                          }
                          {...getIconStyle(file?.name)}
                        />
                        &nbsp;
                        <span className={`${styles[`file-name`]}`}>{file?.name}</span>
                      </span>
                    ) : (
                      <span className={`${styles[`attach-file-label`]}`}>
                        <Attachment /> &nbsp; Attach your file
                      </span>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className={`${styles[`field`]} ${styles[`browse-btn-container`]}`}
                  >
                    <Button
                      // variant="raised"
                      component="span"
                      className={`${styles[`browse-btn`]}`}
                    >
                      Browse
                    </Button>
                  </Grid>
                </Grid>
              </label>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            className={`${styles[`field-row-container`]}`}
          >
            <Grid item xs={12} className={`${styles[`field`]}`}>
              <Button className={`${styles[`cancel-btn`]}`} onClick={props.handleClose}>
                Cancel
              </Button>
              &nbsp; &nbsp;
              <Button className={`${styles[`apply-btn`]}`}>Apply for this job</Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

ApplyJobDetail.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ApplyJobDetail;
