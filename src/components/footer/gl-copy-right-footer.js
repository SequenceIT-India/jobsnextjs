import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import colors from "../../vars.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  copyRightFooter: {
    background: colors.primaryColor,
    width: "100%",
    [theme.breakpoints.down("lg")]: {
      padding: "20px 0px",
    },
    [theme.breakpoints.up("md")]: {
      height: "70px",
    },
    boxShadow: "none",
  },
  copyRightToolbar: {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
  },
  copyRightText: {
    [theme.breakpoints.up("md")]: {
      width: "75vw",
      position: "absolute",
    },
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "18px",
    textAlign: "center",
    color: "#2e4548",
  },
}));

export default function CopyRightFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.copyRightFooter}>
        <Toolbar variant="dense" className={classes.copyRightToolbar}>
          <Typography variant="body2" className={classes.copyRightText}>
            © copyright 2014 to 2020 sequenceiT
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
