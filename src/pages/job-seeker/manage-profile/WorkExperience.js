import DateFnsUtils from "@date-io/date-fns";
import {
  Grid,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import {  ManageProfile } from "../../../util/helper";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import GlLocationSearch from "../../../components/locationSearch/glLocationSearch";
import cityIcon from "../../../assets/images/city.svg";
import stateIcon from "../../../assets/images/state.svg";
import { iconImage } from "../../job-seeker/create-profile/js-create-profile.scss";
import PublicIcon from "@mui/icons-material/Public";

import React, { useState } from "react";
import { LABELS } from "../../../util/create-profile-labels";
import "date-fns";
import moment from "moment";

import { AddCircleOutline, Close } from "@mui/icons-material";

import { DateRangeOutlined } from "@mui/icons-material";

import styles from "./ManageProfile.module.scss";
import { YEARMONTHFORMAT } from "../../../util/constants";

const WorkExperience = ({
  onInputChangeHandler,
  errors,
  setErrors,
  valueOf,
  value,
  previous,
  next,
}) => {
  const [data, setData] = useState({
    contactAndAddress: {
      address: {
        addressLine: "",
        city: "",
        country: "",
        postal: "",
        state: "",
        stateCode: "",
        zip5: 0,
      },
      contact: {
        cntryId: null,
        email: "",
        firstName: "",
        lastName: "",
        phoneCntryCd: "",
        phoneNo: "",
      },
    },
    educationDetails: [
      {
        address: {
          city: "",
          country: "",
          postal: "",
          state: "",
          stateCode: "",
        },
        currentStatus: false,
        educationNumber: null,
        educationLevel: null,
        endDate: null,
        institutionName: null,
        otherEducationLevel: null,
        startDate: null,
        studyField: null,
      },
    ],
    emailId: sessionStorage.getItem("email"),
    employmentTypePref: {
      contractInd: "N",
      contractToHireInd: "N",
      contractToHireW2: "N",
      contractW2: "N",
      corpToCorpContract: "N",
      corpToCorpContractHire: "N",
      fullTime: "N",
      partTime: "N",
      temporary: "N",
    },
    jobAlert: null,
    monthsExp: 0,
    otherWorkAuthType: null,
    profStatCert: "N",
    profStatEdu: "",
    profStatJobLoc: "",
    profStatWorkExperience: "",
    profStatWorkExp: "",
    profStatWorkAuth: "",
    profStatusEmpType: "",
    profStatEduUptdTS: null,
    profStatWorkExperienceUptdTS: null,
    profStatWorkExpUptdTS: null,
    profStatWorkAuthUptdTS: null,
    profStatusEmpTypeUptdTS: null,
    WorkExperience: [
      {
        lastUsed: null,
        monthsExp: null,
        skillName: "",
      },
      {
        lastUsed: null,
        monthsExp: null,
        skillName: "",
      },
      {
        lastUsed: null,
        monthsExp: null,
        skillName: "",
      },
    ],
    uptdTS: null,
    workAuthType: null,
    workExpApplicable: true,
    workExpDetails: [
      {
        companyAddress: {
          addressLine: "",
          city: "",
          country: "",
          postal: "",
          state: "",
          stateCode: "",
        },
        companyName: null,
        currentJob: null,
        endDate: null,
        jobDesc: null,
        jobTitle: null,
        WorkExperienceet: null,
        startDate: null,
        workNum: 1,
      },
    ],
    workLocPref: {
      companyLocationOnly: "N",
      fullTravelJobs: "N",
      jobInMyPrimeAndPrefLoc: "N",
      jobInMyPrimeLoc: "N",
      openForRelocation: "N",
      remoteFull: "N",
      remoteFullOccslyTravel: "N",
      remoteHalf: "N",
    },
  });

  const CustomCheckbox = withStyles({
    root: {
      color: "#3d8a94",
      "&$checked": {
        color: "#3d8a94",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const [update] = useState(false);
  const [isEditMode] = useState(true);
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12}>
            <Typography className="field-row-header" display="block">
              Work experience
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                disabled={update ? !isEditMode : false}
                className="primary-checkbox"
                control={
                  <CustomCheckbox
                    checked={data.workExpNotApplicable}
                    onChange={(evt, checked) => {
                      setData({ ...data, workExpNotApplicable: checked });
                    }}
                    name="alerts"
                  />
                }
                label={LABELS.PLACE_HOLDER.NOT_APPLICABLE}
              />
            </Grid>
          </Grid>
        </Grid>
        {!data.workExpNotApplicable && (
          <Grid item xs={12}>
            {data.workExpDetails.map((workExp, idx) => {
              return (
                <div className="repeat-item">
                  <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={12} sm={12}>
                      <InputLabel>{LABELS.PLACE_HOLDER.JOB_TITLE}</InputLabel>
                      <TextField
                        name="jobTitle"
                        variant="outlined"
                        className={styles["text_field"]}
                        id="jobTitle"
                        size="small"
                        inputProps={{ maxLength: 150 }}
                        // value={valueOf(data, `workExpDetails.${idx}.jobTitle`)}
                        // onChange={onInputChangeHandler(
                        //   `workExpDetails.${idx}.jobTitle`
                        // )}
                        placeholder="Enter job title"
                        error={valueOf(
                          errors,
                          `workExpDetails.${idx}.jobTitle`
                        )}
                        helperText={valueOf(
                          errors,
                          `workExpDetails.${idx}.jobTitle`
                        )}
                        disabled={update ? !isEditMode : false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputLabel
                        required={
                          valueOf(data, `workExpDetails.${idx}.jobTitle`)
                            ? true
                            : false
                        }
                      >
                        {LABELS.PLACE_HOLDER.COMPANY}
                      </InputLabel>
                      <TextField
                        name="companyName"
                        variant="outlined"
                        id="companyName"
                        size="small"
                        className={styles["text_field"]}
                        inputProps={{ maxLength: 150 }}
                        value={valueOf(
                          data,
                          `workExpDetails.${idx}.companyName`
                        )}
                        onChange={onInputChangeHandler(
                          `workExpDetails.${idx}.companyName`
                        )}
                        placeholder="Enter company"
                        error={valueOf(
                          errors,
                          `workExpDetails.${idx}.companyName`
                        )}
                        helperText={valueOf(
                          errors,
                          `workExpDetails.${idx}.companyName`
                        )}
                        disabled={update ? !isEditMode : false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel required>
                        {LABELS.PLACE_HOLDER.CITY}
                      </InputLabel>
                      <FormControl
                        className={styles["text_field"]}
                        variant="outlined"
                        size="small"
                      >
                        <GlLocationSearch
                          fieldValue={valueOf(
                            data,
                            `workExpDetails.${idx}.companyAddress.city`
                          )}
                          setStateShortName={onInputChangeHandler(
                            `workExpDetails.${idx}.companyAddress.stateCode`,
                            false,
                            false,
                            false,
                            true
                          )}
                          setCountryShortName={onInputChangeHandler(
                            `workExpDetails.${idx}.companyAddress.country`,
                            false,
                            false,
                            false,
                            true
                          )}
                          setCountry={() => {}}
                          setCity={onInputChangeHandler(
                            `workExpDetails.${idx}.companyAddress.city`,
                            false,
                            false,
                            false,
                            true
                          )}
                          setPinCode={() => {}}
                          setState={onInputChangeHandler(
                            `workExpDetails.${idx}.companyAddress.state`,
                            false,
                            false,
                            false,
                            true
                          )}
                          icon={cityIcon}
                          placeholder="City"
                          className={styles["text_field"]}
                          id="city"
                          name="city"
                          errors={errors}
                          city={valueOf(
                            data,
                            `workExpDetails.${idx}.companyAddress.city`
                          )}
                          setErrors={setErrors}
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel required>
                        {LABELS.PLACE_HOLDER.STATE}
                      </InputLabel>
                      <FormControl
                        className={styles["text_field"]}
                        variant="outlined"
                        size="small"
                      >
                        <OutlinedInput
                          id="loc-state"
                          type="text"
                          name={valueOf(
                            data,
                            `workExpDetails.${idx}.companyAddress.state`
                          )}
                          placeholder="State"
                          value={valueOf(
                            data,
                            `workExpDetails.${idx}.companyAddress.state`
                          )}
                          startAdornment={
                            <InputAdornment position="start">
                              <img
                                className={iconImage}
                                src={stateIcon}
                                alt=""
                              />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel required>
                        {LABELS.PLACE_HOLDER.COUNTRY}
                      </InputLabel>
                      <FormControl
                        className={styles["text_field"]}
                        variant="outlined"
                        size="small"
                      >
                        <OutlinedInput
                          id="loc-cntry"
                          type="text"
                          name={valueOf(
                            data,
                            `workExpDetails.${idx}.companyAddress.country`
                          )}
                          placeholder="Country"
                          value={valueOf(
                            data,
                            `workExpDetails.${idx}.companyAddress.country`
                          )}
                          startAdornment={
                            <InputAdornment position="start">
                              <PublicIcon />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel
                        required={
                          valueOf(data, `workExpDetails.${idx}.jobTitle`)
                            ? true
                            : false
                        }
                      >
                        {LABELS.PLACE_HOLDER.FROM}
                      </InputLabel>
                      <DatePicker
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        openTo="year"
                        views={["year", "month"]}
                        placeholder="Select month, year"
                        className={styles["text_field"]}
                        value={
                          data.workExpDetails[idx].startDate
                            ? moment(
                                data.workExpDetails[idx].startDate,
                                YEARMONTHFORMAT
                              )
                            : null
                        }
                        onChange={(value) => {
                          const tmpEdu = data.workExpDetails;
                          tmpEdu[idx].startDate =
                            moment(value).format(YEARMONTHFORMAT);
                          setData({ ...data, workExpDetails: tmpEdu });
                        }}
                        size="small"
                        inputVariant="outlined"
                        error={valueOf(
                          errors,
                          `workExpDetails.${idx}.startDate`
                        )}
                        helperText={valueOf(
                          errors,
                          `workExpDetails.${idx}.startDate`
                        )}
                        disabled={update ? !isEditMode : false}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <DateRangeOutlined className="icon" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <InputLabel
                        required={
                          valueOf(data, `workExpDetails.${idx}.jobTitle`) &&
                          !data.workExpDetails[idx].currentStatus
                            ? true
                            : false
                        }
                      >
                        {LABELS.PLACE_HOLDER.TO}
                      </InputLabel>
                      <DatePicker
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        className={styles["text_field"]}
                        openTo="year"
                        views={["year", "month"]}
                        minDate={
                          data.workExpDetails[idx].startDate
                            ? moment(data.workExpDetails[idx].startDate)
                            : null
                        }
                        value={
                          data.workExpDetails[idx].endDate &&
                          !valueOf(data, `workExpDetails.${idx}.currentStatus`)
                            ? moment(data.workExpDetails[idx].endDate).format(
                                YEARMONTHFORMAT
                              )
                            : null
                        }
                        onChange={(value) => {
                          const tmpEdu = data.workExpDetails;
                          tmpEdu[idx].endDate =
                            moment(value).format(YEARMONTHFORMAT);
                          setData({ ...data, workExpDetails: tmpEdu });
                        }}
                        placeholder="Select month, year"
                        disabled={
                          (update ? !isEditMode : false) ||
                          data.workExpDetails[idx].currentStatus
                        }
                        size="small"
                        inputVariant="outlined"
                        error={
                          !data.workExpDetails[idx].currentStatus &&
                          valueOf(errors, `workExpDetails.${idx}.endDate`)
                        }
                        helperText={
                          !data.workExpDetails[idx].currentStatus &&
                          valueOf(errors, `workExpDetails.${idx}.endDate`)
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <DateRangeOutlined className="icon" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControlLabel
                        disabled={update ? !isEditMode : false}
                        control={
                          <CustomCheckbox
                            checked={valueOf(
                              data,
                              `workExpDetails.${idx}.currentStatus`
                            )}
                            onChange={onInputChangeHandler(
                              `workExpDetails.${idx}.currentStatus`,
                              false,
                              true
                            )}
                            name="stillHere"
                          />
                        }
                        label="I am currently here"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputLabel>{LABELS.PLACE_HOLDER.SKILL_SET}</InputLabel>
                      <TextField
                        name="skillSet"
                        variant="outlined"
                        id="skillSet"
                        size="small"
                        className={styles["text_field"]}
                        inputProps={{ maxLength: 1000 }}
                        // value={valueOf(data, `workExpDetails.${idx}.skillSet`)}
                        // onChange={onInputChangeHandler(
                        //   `workExpDetails.${idx}.skillSet`
                        // )}
                        placeholder="Enter skill set"
                        error={valueOf(
                          errors,
                          `workExpDetails.${idx}.skillSet`
                        )}
                        helperText={valueOf(
                          errors,
                          `workExpDetails.${idx}.skillSet`
                        )}
                        disabled={update ? !isEditMode : false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputLabel>
                        {LABELS.PLACE_HOLDER.JOB_DESCRIPTION}
                      </InputLabel>
                      <TextField
                        name="jobDesc"
                        variant="outlined"
                        id="jobDesc"
                        inputProps={{ maxLength: 1000 }}
                        size="small"
                        className={styles["text_field"]}
                        // value={valueOf(data, `workExpDetails.${idx}.jobDesc`)}
                        // onChange={onInputChangeHandler(
                        //   `workExpDetails.${idx}.jobDesc`
                        // )}
                        placeholder="Enter job description"
                        error={valueOf(errors, `workExpDetails.${idx}.jobDesc`)}
                        helperText={valueOf(
                          errors,
                          `workExpDetails.${idx}.jobDesc`
                        )}
                        disabled={update ? !isEditMode : false}
                      />
                    </Grid>
                  </Grid>
                  {data.workExpDetails.length > 1 && (
                    <IconButton
                      edge="start"
                      className={`delete-item`}
                      color="inherit"
                      arial-label="delete item"
                      disabled={update ? !isEditMode : false}
                      onClick={() => {
                        const tmpData = data.workExpDetails;
                        tmpData.splice(idx, 1);
                        const tmpError = errors.workExpDetails;
                        tmpError.splice(idx, 1);
                        setData({ ...data, workExpDetails: tmpData });
                        setErrors({ ...errors, workExpDetails: tmpError });
                      }}
                      size="large"
                    >
                      <Close className="delete-icon" />
                    </IconButton>
                  )}
                </div>
              );
            })}
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item xs={3}>
                <Button
                  className={styles["add_more_btn"]}
                  onClick={() => {
                    const workExpDetails = data.workExpDetails;
                    workExpDetails.push({
                      companyAddress: {
                        addressLine: "",
                        cityId: null,
                        cntryId: null,
                        postalCd: "",
                        stateId: null,
                      },
                      companyName: null,
                      currentJob: null,
                      endDate: null,
                      jobDesc: null,
                      jobTitle: null,
                      skillSet: null,
                      startDate: null,
                      workNum: 1,
                    });
                    setData({ ...data, workExpDetails });
                    setErrors({
                      ...errors,
                      workExpDetails: [
                        ...errors.workExpDetails,
                        {
                          companyAddress: {
                            addressLine: "",
                            cityId: null,
                            cntryId: null,
                            postalCd: "",
                            stateId: null,
                          },
                          companyName: null,
                          currentJob: null,
                          endDate: null,
                          jobDesc: null,
                          jobTitle: null,
                          skillSet: null,
                          startDate: null,
                          workNum: 1,
                        },
                      ],
                    });
                  }}
                  disabled={update ? !isEditMode : false}
                >
                  <AddCircleOutline />
                  Add work experience
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
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
      </MuiPickersUtilsProvider>
    </>
  );
};

export default WorkExperience;
