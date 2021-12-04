import makeStyles from "@mui/styles/makeStyles";

import colors from "../../vars.module.scss";

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${colors.primaryDarkColor}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "50%",
    [theme.breakpoints.only("xs")]: {
      width: "75%",
    },
  },
  modalTitle: {
    marginTop: 0,
    marginBottom: "0.75rem",
    textAlign: "center",
    color: colors.primaryDarkColor,
  },
  chooseFileDiv: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      flexDirection: "column",
    },
  },
  chooseFileBtnDiv: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      marginTop: "1rem",
    },
  },
  displayImageDiv: {
    width: "45%",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      margin: "1rem 0px",
    },
  },
  uploadBtnDiv: {
    textAlign: "center",
    marginTop: "0.5rem",
    [theme.breakpoints.only("xs")]: {
      marginTop: "0.5rem",
    },
  },
  chooseFileBtn: {
    backgroundColor: colors.primaryColor,
    color: "white",
    "&:hover": {
      backgroundColor: colors.primaryColor,
    },
  },
  uploadBtn: {
    backgroundColor: colors.primaryColor,
    color: "white",
    "&:hover": {
      backgroundColor: colors.primaryColor,
    },
  },
  input: {
    display: "none",
  },
}));
