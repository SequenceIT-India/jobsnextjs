import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import awards from "../../../../assets/images/awards.svg";
import certifications from "../../../../assets/images/certifications.svg";
import patents from "../../../../assets/images/patents.svg";
import publications from "../../../../assets/images/publications.svg";
import styles from "../desktop/JsAdditionalInfo.module.scss";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import makeStyles from "@mui/styles/makeStyles";
import PersonalInfo from "../desktop/PersonalInfo";
import clsx from "clsx";
import PrefferedJobLocations from "../desktop/PrefferedJobLocations";
import Certifications from "../desktop/Certifications";
import Awards from "../desktop/Awards";
import Groups from "../desktop/Groups";
import Publications from "../desktop/Publications";
import Patents from "../desktop/Patents";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import colors from "../../../../vars.module.scss";
import { useHistory } from "react-router-dom";
import Header from "../../../../components/header/gl-header";
import Footer from "../../../../components/footer/gl-footer";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "auto",
  },
  fullList: {
    width: "auto",
  },
  image: {
    width: "1.2rem",
    height: "1.2rem",
    marginLeft: "0.1rem",
  },
  rightArrowIcon: {
    width: 15,
    color: colors.primaryColor,
    margin: "0px 0.5rem",
  },
  titleDiv: {
    display: "flex",
    marginLeft: "1.1rem",
    color: colors.primaryColor,
    fontWeight: "700",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      fontSize: "small",
    },
  },
  text: {
    marginLeft: "0.5rem",
  },
  backArrowIcon: {
    cursor: "pointer",
  },
  footerDiv: {
    marginTop: "1rem",
  },
}));

export default function NestedList({
  valueOf,
  data,
  errors,
  onInputChangeHandler,
  onChange,
  onEditorStateChange,
  editorState,
  onGenderChange,
  onEthnicityChange,
  onDisabilityChange,
  setData,
  setErrors,
  switchHandleChange,
  locationErrors,
  setLocationErrors,
  city,
  pincode,
  setCity,
  setPinCode,
  setCountry,
  setState,
  setCountryShortName,
  setStateShortName,
  handleLocation,
  state,
  country,
}) {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState({
    right: false,
  });
  const [section, setSection] = useState("");

  const goBack = () => {
    setValue({ ...value, right: false });
  };

  const toggleDrawer = (anchor, open, section) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setValue({ ...value, [anchor]: open });
    setSection(section);
  };

  const goHome = () => {
    history.push("/jobseeker/homepage");
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <Header />
      {section === "Personal information" ? (
        <PersonalInfo
          valueOf={valueOf}
          onInputChangeHandler={onInputChangeHandler}
          data={data}
          errors={errors}
          onChange={onChange}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          onGenderChange={onGenderChange}
          onEthnicityChange={onEthnicityChange}
          onDisabilityChange={onDisabilityChange}
          setData={setData}
          setErrors={setErrors}
          switchHandleChange={switchHandleChange}
          goBack={goBack}
        />
      ) : section === "Prefferred job locations" ? (
        <PrefferedJobLocations
          setLocationErrors={setLocationErrors}
          locationErrors={locationErrors}
          data={data}
          setData={setData}
          state={state}
          country={country}
          pincode={pincode}
          city={city}
          setPinCode={setPinCode}
          setCity={setCity}
          setState={setState}
          setCountry={setCountry}
          handleLocation={handleLocation}
          setCountryShortName={setCountryShortName}
          setStateShortName={setStateShortName}
          goBack={goBack}
        />
      ) : section === "Certifications" ? (
        <Certifications
          data={data}
          setData={setData}
          onInputChangeHandler={onInputChangeHandler}
          valueOf={valueOf}
          errors={errors}
          setErrors={setErrors}
          goBack={goBack}
        />
      ) : section === "Awards" ? (
        <Awards
          data={data}
          setData={setData}
          onInputChangeHandler={onInputChangeHandler}
          valueOf={valueOf}
          errors={errors}
          setErrors={setErrors}
          goBack={goBack}
        />
      ) : section === "Groups membered" ? (
        <Groups
          data={data}
          setData={setData}
          onInputChangeHandler={onInputChangeHandler}
          valueOf={valueOf}
          errors={errors}
          setErrors={setErrors}
          goBack={goBack}
        />
      ) : section === "Publications" ? (
        <Publications
          data={data}
          setData={setData}
          onInputChangeHandler={onInputChangeHandler}
          valueOf={valueOf}
          errors={errors}
          setErrors={setErrors}
          goBack={goBack}
        />
      ) : (
        <Patents
          data={data}
          setData={setData}
          onInputChangeHandler={onInputChangeHandler}
          valueOf={valueOf}
          errors={errors}
          setErrors={setErrors}
          goBack={goBack}
        />
      )}
      <div className={classes.footerDiv}>
        <Footer />
      </div>
    </div>
  );

  return (
    <div>
      <div className={classes.titleDiv}>
        <ArrowBackIcon onClick={goHome} className={classes.backArrowIcon} />
        <span className={classes.text}>Home</span>
        <ArrowForwardIosIcon className={classes.rightArrowIcon} />
        <span>Additonal Information</span>
      </div>
      {[
        "Personal information",
        "Prefferred job locations",
        "Certifications",
        "Awards",
        "Groups membered",
        "Publications",
        "Patents",
      ].map((anchor) => (
        <List key={anchor} component="nav">
          <ListItem button onClick={toggleDrawer("right", true, anchor)}>
            <ListItemIcon>
              {anchor === "Personal information" ? (
                <PersonIcon className={styles["icon"]} />
              ) : anchor === "Prefferred job locations" ? (
                <LocationOnIcon className={styles["icon"]} />
              ) : anchor === "Groups membered" ? (
                <GroupIcon className={styles["icon"]} />
              ) : anchor === "Awards" ? (
                <img src={awards} alt={anchor} className={classes.image} />
              ) : anchor === "Patents" ? (
                <img src={patents} alt={patents} className={classes.image} />
              ) : anchor === "Publications" ? (
                <img
                  src={publications}
                  alt={publications}
                  className={classes.image}
                />
              ) : (
                <img
                  src={certifications}
                  alt={certifications}
                  className={classes.image}
                />
              )}
            </ListItemIcon>
            <ListItemText primary={anchor} />
            <ChevronRightIcon />
          </ListItem>
          <SwipeableDrawer
            transitionDuration={1}
            variant="persistent"
            anchor={"right"}
            open={value["right"]}
            onOpen={toggleDrawer("right", true)}
            disableBackdropTransition
            disableSwipeToOpen
            hysteresis={1}
            BackdropProps={{ invisible: true }}
            disableDiscovery
          >
            {list("right")}
          </SwipeableDrawer>
        </List>
      ))}
    </div>
  );
}
