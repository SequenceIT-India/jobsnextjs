import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Popover from "@mui/material/Popover";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Avatar } from "@mui/material";

import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions";

import colors from "../../vars.module.scss";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    width: "6.5rem",
  },
  items: {
    width: "5rem",
    display: "flex",
    flexDirection: "column",
    margin: "0.25rem 0px",
  },
  link: {
    textDecoration: "none",
    color: colors.disableColor,
    padding: "0.25rem",
    fontSize: 14,
  },
}));

export default function AvatarDropdown(props) {
  const history = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const profileIconOnClickHandler = () => {
    history.push("/jobseeker/homepage");
  };

  const onClickHandler = () => {
    setAnchorEl(null);
  };

  const onLogoutClickHandler = () => {
    dispatch(logoutAction());
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dispatch = useDispatch();

  return (
    <div className={classes.profileDiv}>
      {sessionStorage.getItem("email") !== undefined ||
      sessionStorage.getItem("email") !== null ? (
        <Avatar
          onMouseEnter={handlePopoverOpen}
          alt={sessionStorage.getItem("email")}
          src={props.photo}
          onClick={profileIconOnClickHandler}
        />
      ) : (
        <Avatar
          onMouseEnter={handlePopoverOpen}
          alt={sessionStorage.getItem("email")}
        >
          {sessionStorage.getItem("email").charAt(0).toUpperCase()}
        </Avatar>
      )}
      <Popover
        id={id}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        getcontentanchorel={null}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className={classes.items}>
          <Link
            className={classes.link}
            onClick={onClickHandler}
            href="/jobseeker/homepage"
          >
            Home
          </Link>
          <Link
            className={classes.link}
            onClick={onClickHandler}
            href="/jobseeker/jobs"
          >
            Jobs
          </Link>
          <Link
            onClick={onClickHandler}
            className={classes.link}
            href={`/${
              sessionStorage.getItem("isEmployee") ? "employee" : "jobseeker"
            }/settings`}
          >
            Settings
          </Link>
          <Link
            onClick={onLogoutClickHandler}
            className={classes.link}
            href="/#"
          >
            Logout
          </Link>
        </div>
      </Popover>
    </div>
  );
}
