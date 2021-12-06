import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import colors from "../../../vars.module.scss";
import Profile from "./Profile";
import Box from "@mui/material/Box";
import Education from "./Education";
import Skills from "./Skills";
import WorkExperience from "./WorkExperience";
import { ManageProfile } from "../../../util/helper";

import {
  tabpanels,
  box,
} from "../../../components/tabs/JsCustomTabs.module.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className={tabpanels}
      hidden={value !== index}
      id={`jobs-tabpanel-${index}`}
      aria-labelledby={`jobs-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={box} p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `jobs-tab-${index}`,
    "aria-controls": `jobs-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    color: colors.textLightColor,
    backgroundColor: "white",
    boxShadow: "none",
    [theme.breakpoints.between("xs", "md")]: {
      padding: "0px 0.75rem",
    },
  },
  indicator: {
    backgroundColor: colors.primaryColor,
  },
  selectedTab: {
    color: colors.primaryColor,
    fontSize: 14,
    [theme.breakpoints.only("xs")]: {
      fontSize: "x-small",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "x-small",
    },
  },
  tabs: {
    borderBottom: `1px solid ${colors.textLightColor}`,
  },
  tab: {
    fontSize: 14,
    [theme.breakpoints.only("xs")]: {
      fontSize: "x-small",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "x-small",
    },
  },
  paginationDiv: {
    display: "flex",
    justifyContent: "flex-start",
    padding: 16,
    marginLeft: 10,
  },
}));

export default function JSManageProfileTabs({
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
  resume,
  toastMessage,
  open,
  handleClose,
  onNext,
  onPrevious,
  getResume,
  getIconStyle,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(ManageProfile.firstTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const previous = () => {
    setValue(value - 1);
  };

  const next = () => {
    setValue(value + 1);
  };
  console.log(onInputChangeHandler);
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Manage Profile tabs"
          className={classes.tabs}
          centered
          classes={{
            indicator: classes.indicator,
          }}
        >
          <Tab
            className={
              value === ManageProfile.firstTab
                ? classes.selectedTab
                : classes.tab
            }
            label="Profile"
            {...a11yProps(0)}
          />
          <Tab
            className={
              value === ManageProfile.secondTab
                ? classes.selectedTab
                : classes.tab
            }
            label="Skills"
            {...a11yProps(1)}
          />
          <Tab
            className={
              value === ManageProfile.thirdTab
                ? classes.selectedTab
                : classes.tab
            }
            label="Work Experience"
            {...a11yProps(2)}
          />
          <Tab
            className={
              value === ManageProfile.fourthTab
                ? classes.selectedTab
                : classes.tab
            }
            label="Education"
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Profile
          resume={resume}
          onInputChangeHandler={onInputChangeHandler}
          errors={errors}
          data={data}
          valueOf={valueOf}
          value={value}
          setErrors={setErrors}
          setData={setData}
          toastMessage={toastMessage}
          open={open}
          handleClose={handleClose}
          onNext={next}
          onPrevious={previous}
          getResume={getResume}
          getIconStyle={getIconStyle}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Skills
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
          previous={previous}
          next={next}
          value={value}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WorkExperience
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
          previous={previous}
          next={next}
          value={value}
        />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Education
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
          previous={previous}
          next={next}
          value={value}
        />
      </TabPanel>
    </div>
  );
}
