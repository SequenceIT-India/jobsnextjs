import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import withStyles from "@mui/styles/withStyles";
import LinearProgress from "@mui/material/LinearProgress";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 700],
  },
  bar: {
    background: "linear-gradient(to right, #ffd000, #c7cf52, #7bcb8f)",
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: "0.5rem 1rem 0.5rem 0px",
  },
});

export default function ProgressBar({ value }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={value} />
    </div>
  );
}
