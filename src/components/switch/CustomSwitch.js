import React from "react";
import withStyles from "@mui/styles/withStyles";
import makeStyles from "@mui/styles/makeStyles";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import colors from "../../vars.module.scss";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 35,
    height: 16,
    padding: 0,
    display: "flex",
    overflow: "visible",
    [theme.breakpoints.only("xs")]: {
      width: 28,
      height: 14,
    },
  },
  switchBase: {
    padding: 2.15,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(17px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: colors.primaryColor,
        borderColor: colors.primaryColor,
      },
    },
    [theme.breakpoints.only("xs")]: {
      "&$checked": {
        transform: "translateX(12px)",
      },
    },
  },
  thumb: {
    width: 12,
    height: "0.8rem",
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

const useStyles = makeStyles((theme) => ({
  grid: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "smaller",
    },
  },
}));

export default function CustomSwitch(props) {
  const classes = useStyles();

  return (
    <FormGroup className={props.className}>
      <Typography component="div">
        <Grid
          component="label"
          className={classes.grid}
          container
          alignItems="center"
          spacing={1}
        >
          <Grid item>No</Grid>
          <Grid item>
            <AntSwitch checked={props.isActive} onChange={props.handleChange} />
          </Grid>
          <Grid item>Yes</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
