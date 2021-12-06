import DateFnsUtils from "@date-io/date-fns";
import {
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import { Autocomplete } from "@mui/material";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import React from "react";
import { LABELS } from "../../../util/create-profile-labels";
import "date-fns";
import moment from "moment";

import { AddCircleOutline, Close } from "@mui/icons-material";

import { DateRangeOutlined } from "@mui/icons-material";
import styles from "./ManageProfile.module.scss";
import { ManageProfile } from "../../../util/helper";
import { YEARMONTHFORMAT } from "../../../util/constants";

const CustomCheckbox = withStyles({
  root: {
    color: "#3d8a94",
    "&$checked": {
      color: "#3d8a94",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Skills = ({
  onInputChangeHandler,
  data,
  setData,
  errors,
  setErrors,
  valueOf,
  value,
  previous,
  next,
  ischeckBox,
}) => {
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography display="block">Skills</Typography>
          </Grid>
          <Grid item xs={12}>
            {data.skills.map((skill, idx) => {
              return (
                <>
                  <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} sm={3}>
                      <InputLabel className={styles["input_label"]}>
                        {LABELS.PLACE_HOLDER.SKILL_NAME}
                      </InputLabel>
                      <TextField
                        className={styles["text_field"]}
                        name={`skills.${idx}.skillName`}
                        id={`skills.${idx}.skillName`}
                        onChange={(evt) => {
                          let alreadyExist = false;
                          data.skills.forEach((skl, index) => {
                            const targetValue = evt.target.value
                              .toLowerCase()
                              .trim();
                            const skillName = skl.skillName
                              .toLowerCase()
                              .trim();
                            alreadyExist = !!(
                              evt.target.value &&
                              skillName === targetValue &&
                              idx !== index
                            );
                          });
                          onInputChangeHandler(`skills.${idx}.skillName`)(evt);
                          const tmpErrors = { ...errors };
                          const errorMsg = alreadyExist
                            ? LABELS.ERROR.SKILL_ALREADY_EXISTS
                            : "";
                          //   valueOf(
                          //     tmpErrors,
                          //     `skills.${idx}.skillName`,
                          //     errorMsg
                          //   );
                        }}
                        variant="outlined"
                        placeholder="Enter Skill Name"
                        // value={valueOf(data, `skills.${idx}.skillName`)}
                        // size="small"
                        // error={valueOf(errors, `skills.${idx}.skillName`)}
                        // helperText={valueOf(errors, `skills.${idx}.skillName`)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <InputLabel
                        required={skill.skillName}
                        className={styles["input_label"]}
                      >
                        {LABELS.PLACE_HOLDER.YEAR}
                      </InputLabel>
                      <Autocomplete
                        className={styles["text_field"]}
                        name="year"
                        id="year"
                        options={Array.from(Array(75).keys())}
                        onChange={(evt, val) => {
                          const tmpSkills = data.skills;
                          const value = val || 0;
                          tmpSkills[idx].monthsExp =
                            parseInt(value) * 12 +
                            ((data.skills[idx].monthsExp != null
                              ? data.skills[idx].monthsExp
                              : 0) %
                              12);
                          setData({ ...data, skills: tmpSkills });
                        }}
                        value={Math.floor(data.skills[idx].monthsExp / 12)}
                        getOptionLabel={(option) => `${option}`}
                        type="text"
                        size="small"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="locationDetails"
                            className={styles["text_field"]}
                            variant="outlined"
                            id="search-location"
                            placeholder="Select year"
                            // error={valueOf(errors, `skills.${idx}.monthsExp`)}
                            // helperText={valueOf(
                            //   errors,
                            //   `skills.${idx}.monthsExp`
                            // )}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <InputLabel required={skill.skillName}>
                        {LABELS.PLACE_HOLDER.MONTH}
                      </InputLabel>
                      <Autocomplete
                        className={styles["text_field"]}
                        name="month"
                        id="month"
                        options={Array.from(Array(13).keys())}
                        onChange={(evt, val) => {
                          const tmpSkills = data.skills;
                          const value = val || 0;
                          tmpSkills[idx].monthsExp =
                            Math.floor(data.skills[idx].monthsExp / 12) * 12 +
                            parseInt(value);
                          setData({ ...data, skills: tmpSkills });
                        }}
                        value={Math.floor(data.skills[idx].monthsExp % 12)}
                        getOptionLabel={(option) => `${option}`}
                        type="text"
                        size="small"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="locationDetails"
                            variant="outlined"
                            id="search-location"
                            placeholder="Select month"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <InputLabel>{LABELS.PLACE_HOLDER.LAST_USED}</InputLabel>
                      <DatePicker
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        openTo="year"
                        views={["year", "month"]}
                        placeholder="Last used"
                        maxDate={moment()}
                        value={
                          data.skills[idx].lastUsed
                            ? moment(data.skills[idx].lastUsed, YEARMONTHFORMAT)
                            : null
                        }
                        onChange={(value) => {
                          const tmpSkills = data.skills;
                          tmpSkills[idx].lastUsed =
                            moment(value).format(YEARMONTHFORMAT);
                          setData({ ...data, skills: tmpSkills });
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <DateRangeOutlined className="icon" />
                            </InputAdornment>
                          ),
                        }}
                        size="small"
                        inputVariant="outlined"
                        // error={valueOf(errors, `skills.${idx}.lastUsed`)}
                        // helperText={valueOf(errors, `skills.${idx}.lastUsed`)}
                      />
                    </Grid>
                  </Grid>

                  {data.skills.length > 3 && (
                    <IconButton
                      edge="start"
                      className={`delete-item skill-remove-action`}
                      color="inherit"
                      arial-label="delete item"
                      onClick={() => {
                        const tmpData = data.skills;
                        tmpData.splice(idx, 1);
                        const tmpError = errors.skills;
                        tmpError.splice(idx, 1);
                        setData({ ...data, skills: tmpData });
                        setErrors({ ...errors, skills: tmpError });
                      }}
                      size="large"
                    >
                      <Close className="delete-icon" />
                    </IconButton>
                  )}
                </>
              );
            })}
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item xs={3}>
                <Button
                  className={styles["add_more_btn"]}
                  onClick={() => {
                    const tmpSkills = data.skills;
                    tmpSkills.push({
                      lastUsed: null,
                      monthsExp: null,
                      skillName: null,
                    });
                    setData({ ...data, skills: tmpSkills });
                    setErrors({
                      ...errors,
                      skills: [
                        ...errors.skills,
                        {
                          lastUsed: null,
                          monthsExp: null,
                          skillName: null,
                        },
                      ],
                    });
                  }}
                >
                  <AddCircleOutline />
                  Add Skill
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} className="field">
              <FormControlLabel
                className="primary-checkbox"
                control={
                  <CustomCheckbox
                    checked={data.jobAlert}
                    onChange={(evt, checked) => {
                      setData({ ...data, jobAlert: checked });
                    }}
                    name="alerts"
                  />
                }
                label="I am selecting this to receive matching job alerts"
              />
            </Grid>
          </Grid>

          <Grid container className={styles["btns-grid"]}>
            <Grid item lg={12}>
              <Button
                size="small"
                disabled={value === ManageProfile.firstTab}
                variant="outlined"
                className={styles["previous-btn"]}
                onClick={previous}
              >
                Previous
              </Button>
              <Button
                size="small"
                disabled={value === ManageProfile.fourthTab}
                variant="outlined"
                className={styles["next-btn"]}
                onClick={next}
              >
                Next
              </Button>
              <Button
                variant="contained"
                className={styles["submit-btn"]}
                size="small"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default Skills;
