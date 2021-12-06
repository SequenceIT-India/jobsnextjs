import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import {
  box,
  tabpanels,
} from "../../../../components/tabs/JsCustomTabs.module.scss";
import colors from "../../../../vars.module.scss";
import PersonalInfo from "./PersonalInfo";
import PrefferedJobLocations from "./PrefferedJobLocations";
import Certifications from "./Certifications";
import Awards from "./Awards";
import Groups from "./Groups";
import Publications from "./Publications";
import Patents from "./Patents";

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
    "& div.MuiTabs-scroller": {
      "& .MuiTabs-flexContainer": {
        justifyContent: "space-between",
      },
    },
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
  },
  tabs: {
    borderBottom: `1px solid ${colors.textLightColor}`,
  },
  tab: {
    fontSize: 14,
  },
}));

export default function JsAdditionalInfoTabs({
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
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const previous = () => {
    setValue(value - 1);
  };

  const next = () => {
    setValue(value + 1);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="additional info tabs"
          variant="scrollable"
          scrollButtons="auto"
          className={classes.tabs}
          classes={{
            indicator: classes.indicator,
          }}
        >
          <Tab
            className={value === 0 ? classes.selectedTab : classes.tab}
            label="Personal information"
            {...a11yProps(0)}
          />
          <Tab
            className={value === 1 ? classes.selectedTab : classes.tab}
            label="Preffered job locations"
            {...a11yProps(1)}
          />
          <Tab
            className={value === 2 ? classes.selectedTab : classes.tab}
            label="Certifications"
            {...a11yProps(2)}
          />
          <Tab
            className={value === 3 ? classes.selectedTab : classes.tab}
            label="Awards"
            {...a11yProps(3)}
          />
          <Tab
            className={value === 4 ? classes.selectedTab : classes.tab}
            label="Groups membered"
            {...a11yProps(4)}
          />
          <Tab
            className={value === 5 ? classes.selectedTab : classes.tab}
            label="Publications"
            {...a11yProps(5)}
          />
          <Tab
            className={value === 6 ? classes.selectedTab : classes.tab}
            label="Patents"
            {...a11yProps(6)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
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
          previous={previous}
          next={next}
          value={value}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PrefferedJobLocations
          data={data}
          setData={setData}
          value={value}
          errors={errors}
          setErrors={setErrors}
          previous={previous}
          next={next}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Certifications
          data={data}
          setData={setData}
          onInputChangeHandler={onInputChangeHandler}
          valueOf={valueOf}
          errors={errors}
          setErrors={setErrors}
          value={value}
          previous={previous}
          next={next}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Awards
          data={data}
          setData={setData}
          onInputChangeHandler={onInputChangeHandler}
          valueOf={valueOf}
          errors={errors}
          setErrors={setErrors}
          value={value}
          previous={previous}
          next={next}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Groups
          data={data}
          setData={setData}
          onInputChangeHandler={onInputChangeHandler}
          valueOf={valueOf}
          errors={errors}
          setErrors={setErrors}
          value={value}
          previous={previous}
          next={next}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Publications
          data={data}
          setData={setData}
          onInputChangeHandler={onInputChangeHandler}
          valueOf={valueOf}
          errors={errors}
          setErrors={setErrors}
          value={value}
          previous={previous}
          next={next}
        />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Patents
          data={data}
          setData={setData}
          onInputChangeHandler={onInputChangeHandler}
          valueOf={valueOf}
          errors={errors}
          setErrors={setErrors}
          value={value}
          previous={previous}
          next={next}
        />
      </TabPanel>
    </div>
  );
}
