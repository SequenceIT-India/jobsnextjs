import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import colors from "../../vars.module.scss";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${colors.blackColor}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "30%",
    [theme.breakpoints.between("sm", "lg")]: {
      width: "60%",
    },
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
  modalTitle: {
    marginTop: 0,
    marginBottom: "0.75rem",
    color: colors.primaryColor,
    fontSize: 22,
    fontWeight: 700,
    [theme.breakpoints.only("xs")]: {
      fontSize: "small",
    },
  },
  radioBtnsContent: {
    color: colors.disableColor,
  },
  radioBtnLabel: {
    fontSize: 16,
    fontWeight: 400,
    [theme.breakpoints.only("xs")]: {
      fontSize: "small",
    },
    [theme.breakpoints.between("sm", "lg")]: {
      fontSize: "medium",
    },
  },
  radioBtn: {
    color: colors.primaryColor,
  },
  titleDiv: {
    marginBottom: "1.5rem",
    [theme.breakpoints.only("xs")]: {
      marginBottom: "1rem",
    },
  },
  btnsDiv: {
    margin: "1rem 0px",
  },
  submitBtn: {
    backgroundColor: colors.primaryColor,
    color: "white",
    "&:hover": {
      backgroundColor: colors.primaryColor,
      color: "white",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "x-small",
    },
  },
}));

const CustomRadio = withStyles((theme) => ({
  root: {
    color: colors.primaryColor,
    "& .MuiSvgIcon-root": {
      fontSize: "x-large",
      [theme.breakpoints.only("xs")]: {
        fontSize: "medium",
      },
      [theme.breakpoints.between("sm", "xl")]: {
        fontSize: "large",
      },
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

function RadioButtonsGroup({ handleChange, value }) {
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="email-subscription"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          classes={{ label: classes.radioBtnLabel }}
          className={classes.radioBtnsContent}
          value="monthly"
          control={<CustomRadio className={classes.radioBtn} />}
          label="Monthly frequency email"
        />
        <FormControlLabel
          classes={{ label: classes.radioBtnLabel }}
          className={classes.radioBtnsContent}
          value="weekly"
          control={<CustomRadio className={classes.radioBtn} />}
          label="Weekly frequency email"
        />
        <FormControlLabel
          classes={{ label: classes.radioBtnLabel }}
          className={classes.radioBtnsContent}
          value="daily"
          control={<CustomRadio className={classes.radioBtn} />}
          label="Daily email"
        />
        <FormControlLabel
          classes={{ label: classes.radioBtnLabel }}
          className={classes.radioBtnsContent}
          value="toomany"
          control={<CustomRadio className={classes.radioBtn} />}
          label="You send too many emails"
        />
        <FormControlLabel
          classes={{ label: classes.radioBtnLabel }}
          className={classes.radioBtnsContent}
          value="irrelevant"
          control={<CustomRadio className={classes.radioBtn} />}
          label="You send irrelevant content"
        />
        <FormControlLabel
          classes={{ label: classes.radioBtnLabel }}
          className={classes.radioBtnsContent}
          value="never"
          control={<CustomRadio className={classes.radioBtn} />}
          label="Never subscribed for emails"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default function EmailSubscriptionModal(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.paper}>
        <div className={classes.titleDiv}>
          <span className={classes.modalTitle} id="modal-title">
            {props.title}
          </span>
        </div>
        <div className={classes.radioBtnsDiv}>
          <RadioButtonsGroup handleChange={handleChange} value={value} />
        </div>
        <div className={classes.btnsDiv}>
          <Button
            variant={value === "" ? "outlined" : "contained"}
            disabled={value === ""}
            size="small"
            className={value !== "" ? classes.submitBtn : ""}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
}
