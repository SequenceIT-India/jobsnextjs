import makeStyles from "@mui/styles/makeStyles";
import { Checkbox } from "@mui/material";
import withStyles from "@mui/styles/withStyles";

import colors from "../vars.module.scss";

export const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "&$focused $notchedOutline": {
      borderColor: colors.primaryColor,
    },
  },
  input: {
    height: 8,
    [theme.breakpoints.only("xs")]: {
      height: 0,
    },
    [theme.breakpoints.only("sm")]: {
      height: 2,
    },
    [theme.breakpoints.only("md")]: {
      height: 4,
    },
  },
  focused: {
    backgroundColor: "rgb(236, 249, 252)",
  },
  notchedOutline: {},
}));

export const CustomCheckbox = withStyles({
  root: {
    color: colors.primaryColor,
    "&$checked": {
      color: colors.primaryColor,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
