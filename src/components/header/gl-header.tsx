import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Hidden,
  IconButton,
  Link,
  List,
  ListItem,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import SearchBar from "../home-page/gl-search-bar";
import ListItemText from "@mui/material/ListItemText";
import { Close, ExpandLess, ExpandMore, Search } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { default as React, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
const logo = "/assets/images/logo.png";

import { logoutAction } from "../../redux/actions";
import { getUserProfilePhoto } from "../../service/profile";
import "./gl-header.module.scss";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PropTypes from "prop-types";
import AvatarDropdown from "./AvatarDropdown";

import colors from "../../vars.module.scss";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: any) => (
  <Menu
    open={false}
    elevation={0}
    anchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme: any) => ({
  root: {
    "&:focus": {
      backgroundColor: "#3d8a94",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const AccordionMenu = (props: any) => {
  return (
    <Accordion className="accordion-menu">
      <AccordionSummary
        className="accordion-menu-summary"
        expandIcon={<ExpandMore />}
        aria-controls={`${props.id}-content`}
        id={`${props.id}-header`}
      >
        <Typography className="accordion-menu-title">{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails className="accordion-menu-details">
        {props.items.map((item: any, idx: any) => {
          return (
            <StyledMenuItem
              onClick={() => {
                if (props.onClick) {
                  props.onClick(item);
                }
              }}
              key={`menu-item-${item.href}-${idx}`}
            >
              <ListItemText className="sub-menu" primary={item.title} />
            </StyledMenuItem>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

const HeaderMenu = (props: any) => {
  const anchorEl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event: any) => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>

      <Button
        aria-controls={props.id}
        aria-haspopup="true"
        ref={anchorEl}
        onClick={handleClick}
        className="header-actions menu"
      >
        {props.title} {isOpen ? <ExpandLess /> : <ExpandMore />}
      </Button>

      <StyledMenu
        id={props.id}
        anchorEl={anchorEl.current}
        keepMounted
        open={isOpen}
        onClose={handleClose}
      >
        {props.items.map((item: any, idx: any) => {
          return (
            <StyledMenuItem
              onClick={() => {
                if (props.onClick) {
                  props.onClick(item);
                }
                setIsOpen(false);
              }}
              key={`menu-item-${item.href}-${idx}`}
            >
              <ListItemText primary={item.title} />
            </StyledMenuItem>
          );
        })}
      </StyledMenu>
    </div >
  );
};

const useStyles = makeStyles((theme: any) => ({
  grow: {
    flexGrow: 1,
  },
  menuButtonMix: {
    display: "flex !important",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  appBar: {
    boxShadow: "none",
  },
  profileNameDiv: {
    color: colors.primaryColor,
    marginRight: "1rem",
  },
  headerItem: {
    paddingLeft: 0,
    paddingRight: 0,
    color: colors.primaryColor,
  },
  paper: {
    border: "1px solid #d3d4d5",
  },
}));

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

const Header = (props: any) => {
  const history = useRouter();
  const [showDrawer, setShowDrawer] = useState(false);
  const classes = useStyles();
  const auth = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const [photo, setPhoto] = useState("");

  const getPhoto = async () => {
    const result = ""; //await getUserProfilePhoto(sessionStorage.getItem("email"));
    setPhoto(result ? `data:image/png;base64,${result}` : "");
  };

  useEffect(() => {
    getPhoto();
  }, []);

  const onFindJobsBtnHandler = () => { };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar
        className={classes.appBar}
        position="sticky"
      // bg="light"
      // expand="lg"
      // sticky="top"
      >
        <Toolbar className="app-header">
          <Link href="/">
            <Image
              className="nav-logo"
              width="100px"
              height="45px"
              src={logo}
              alt="logo"
            />
          </Link>
          <div className="main-header-space"></div>
          {auth.token ? (
            <div className={classes.sectionDesktop}>
              <Link href="#"><a className="link">
                Careers</a>
              </Link>
              <Link href="#"><a className="link">
                Company Search</a>
              </Link>
              <IconButton
                aria-label="alerts"
                className="notifications"
                size="large"
              >
                <NotificationsNoneOutlinedIcon fontSize="small" />
              </IconButton>
              {/* <div className={classes.profileNameDiv}>
              <span>Hello</span>
            </div> */}
              <AvatarDropdown photo={photo} />
            </div>
          ) : (
            <div className={classes.sectionDesktop}>
              <HeaderMenu
                onClick={(item: any) => {
                  history.push(item.href);
                }}
                id={"jobs"}
                title={"Jobs"}
                items={[
                  {
                    href: "/",
                    title: "Search Jobs",
                  },
                  {
                    href: "/",
                    title: "Popular Searches",
                  },
                  {
                    href: "/jobseeker/register",
                    title: "Register",
                  },
                ]}
              />
              <HeaderMenu
                onClick={(item: any) => {
                  history.push(item.href);
                }}
                id={"employers"}
                title={"Employers"}
                items={[
                  {
                    href: "/employer/register/",
                    title: "Register",
                  },
                  {
                    href: "/employer/login",
                    title: "Login",
                  },
                  {
                    href: "/",
                    title: "Search Talent",
                  },
                  {
                    href: "/",
                    title: "Contact Sales",
                  },
                  {
                    href: "/",
                    title: "Pricing",
                  },
                ]}
              />

              <Button
                variant="outlined"
                className="login-btn header-actions"
                onClick={() => {
                  history.push("/jobseeker/login");
                }}
              >
                Login
              </Button>

              <Button
                variant="contained"
                className="register-btn  header-actions"
                onClick={() => {
                  history.push("/jobseeker/register");
                }}
              >
                Register
              </Button>
            </div>
          )}
          <Hidden only={["md", "lg", "xl"]}>
            <IconButton
              edge="start"
              className={`${classes.menuButtonMix} menu-button-mix`}
              color="inherit"
              arial-label="Open Menu"
              onClick={toggleDrawer}
              size="large"
            >
              <Search />
            </IconButton>
            <IconButton
              edge="start"
              className={`${classes.menuButtonMix} menu-button-mix`}
              color="inherit"
              arial-label="Open Menu"
              onClick={() => {
                setShowDrawer(true);
              }}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

        </Toolbar>
      </AppBar>
      <Dialog
        fullScreen
        hideBackdrop
        open={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
        className="mobile-dialog"
      >
        <DialogTitle className="mobile-dialog-title">
          <AppBar
            position="sticky"
          // bg="light"
          // expand="lg"
          // sticky="top"
          >
            <Toolbar className="app-header">
              <Link href="/">
                <img className="nav-logo" src={logo} alt="logo" />
              </Link>
              <div className="main-header-space"></div>
              <IconButton
                edge="start"
                className={`${classes.menuButtonMix} menu-button-mix`}
                color="inherit"
                arial-label="Open Menu"
                onClick={() => {
                  setShowDrawer(false);
                }}
                size="large"
              >
                <Close className="close-icon" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </DialogTitle>
        <DialogContent>
          {auth.token && (
            <List component="nav" aria-label="header-items">
              <ListItemLink className={classes.headerItem} href="/#">
                <ListItemText primary="Carrers" />
              </ListItemLink>
              <ListItemLink className={classes.headerItem} href="/#">
                <ListItemText primary="Company Search" />
              </ListItemLink>
              <ListItemLink className={classes.headerItem} href="/#">
                <ListItemText primary="Alerts" />
              </ListItemLink>
              <ListItemLink
                className={classes.headerItem}
                href="/jobseeker/homepage"
              >
                <ListItemText primary="Home" />
              </ListItemLink>
              <ListItemLink
                className={classes.headerItem}
                href="/jobseeker/jobs"
              >
                <ListItemText primary="Jobs" />
              </ListItemLink>
              <ListItemLink
                className={classes.headerItem}
                href="/jobseeker/settings"
              >
                <ListItemText primary="Settings" />
              </ListItemLink>
            </List>
          )}
          {!auth.token && (
            <AccordionMenu
              onClick={(item: any) => {
                history.push(item.href);
                setShowDrawer(false);
              }}
              id={"jobs"}
              title={"Jobs"}
              items={[
                {
                  href: "/",
                  title: "Search Jobs",
                },
                {
                  href: "/",
                  title: "Popular Searches",
                },
                {
                  href: "/jobseeker/register",
                  title: "Register",
                },
              ]}
            />
          )}
          {!auth.token && (
            <AccordionMenu
              onClick={(item: any) => {
                history.push(item.href);
                setShowDrawer(false);
              }}
              id={"employers"}
              title={"Employers"}
              items={[
                {
                  href: "/employer/register/",
                  title: "Register",
                },
                {
                  href: "/employer/login",
                  title: "Login",
                },
                {
                  href: "/",
                  title: "Search Talent",
                },
                {
                  href: "/",
                  title: "Contact Sales",
                },
                {
                  href: "/",
                  title: "Pricing",
                },
              ]}
            />
          )}
        </DialogContent>
        <DialogActions disableSpacing className="mobile-dialog-actions">
          {!auth.token && (
            <Button
              variant="contained"
              fullWidth
              className="register-btn  header-actions"
              onClick={() => {
                history.push("/jobseeker/register");
                setShowDrawer(false);
              }}
            >
              Register
            </Button>
          )}
          {!auth.token && (
            <Button
              variant="outlined"
              fullWidth
              className="login-btn header-actions"
              onClick={() => {
                history.push("/jobseeker/login");
                setShowDrawer(false);
              }}
            >
              Login
            </Button>
          )}

          {auth.token && (
            <Button
              variant="outlined"
              fullWidth
              className="login-btn header-actions"
              onClick={() => {
                dispatch(logoutAction());
                setShowDrawer(false);
                history.push("/jobseeker/login");
              }}
            >
              Logout
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        classes={{
          paper: classes.paper
        }}
      >
        <div className="job-detail-drawer">
          <SearchBar onFindJobsBtnHandler={onFindJobsBtnHandler} />
        </div>
      </Drawer>
    </>
  );
};

Header.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  items: PropTypes.array,
  onClick: PropTypes.func,
  setShowDrawer: PropTypes.func,
};
export default Header;
