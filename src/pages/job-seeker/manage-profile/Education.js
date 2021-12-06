import DateFnsUtils from "@date-io/date-fns";
import {
  Grid,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import PublicIcon from "@mui/icons-material/Public";
import moment from "moment";
import { Autocomplete } from "@mui/material";
import cityIcon from "../../../assets/images/city.svg";
import stateIcon from "../../../assets/images/state.svg";
import { iconImage } from "../../job-seeker/create-profile/js-create-profile.scss";

import React, { useState } from "react";
import { ManageProfile } from "../../../util/helper";
import { LABELS } from "../../../util/create-profile-labels";
import "date-fns";
import { Close, DateRangeOutlined } from "@mui/icons-material";

import { EDUCATION_LEVELS, YEARMONTHFORMAT } from "../../../util/constants";
import GlLocationSearch from "../../../components/locationSearch/glLocationSearch";
import styles from "./ManageProfile.module.scss";

const CustomCheckbox = withStyles({
  root: {
    color: "#3d8a94",
    "&$checked": {
      color: "#3d8a94",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const EducationDetails = ({
  onInputChangeHandler,
  errors,
  setErrors,
  valueOf,
  value,
  previous,
  next,
  ManageProfileEnums,
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
    profStatSkills: "",
    profStatWorkExp: "",
    profStatWorkAuth: "",
    profStatusEmpType: "",
    profStatEduUptdTS: null,
    profStatSkillsUptdTS: null,
    profStatWorkExpUptdTS: null,
    profStatWorkAuthUptdTS: null,
    profStatusEmpTypeUptdTS: null,
    skills: [
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
        skillSet: null,
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

  const [isEditMode] = useState(true);

  const [update] = useState(false);
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography className="field-row-header" display="block">
              Education
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              disabled={!isEditMode}
              className="primary-checkbox"
              control={
                <CustomCheckbox
                  checked={data.educationApply}
                  onChange={(evt, checked) => {
                    setData({
                      ...data,
                      educationDetails: checked ? data.educationDetails : [],
                      educationApply: checked,
                    });
                  }}
                  name="alerts"
                />
              }
              label={LABELS.PLACE_HOLDER.NOT_APPLICABLE}
            />
          </Grid>
          <Grid item xs={12}>
            {!data.educationApply &&
              data.educationDetails.map((education, idx) => {
                return (
                  <div className="repeat-item">
                    <Grid container spacing={2} justifyContent="space-between">
                      <Grid item xs={12}>
                        <InputLabel>
                          {LABELS.PLACE_HOLDER.EDUCATION_LEVEL}
                        </InputLabel>
                        <Autocomplete
                          name="level"
                          id="level"
                          options={EDUCATION_LEVELS}
                          onChange={(evt, value) => {
                            onInputChangeHandler(
                              `educationDetails.${idx}.educationLevel`,
                              true,
                              false,
                              true
                            );
                          }}
                          value={
                            EDUCATION_LEVELS.filter(
                              (option) =>
                                option.key ===
                                valueOf(
                                  data,
                                  `educationDetails.${idx}.educationNumber`
                                )
                            )[0] || { name: "", key: "" }
                          }
                          getOptionLabel={(option) => `${option.name}`}
                          type="text"
                          size="small"
                          className={styles["text_field"]}
                          disabled={update ? !isEditMode : false}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="level"
                              variant="outlined"
                              className={styles["text_field"]}
                              id="level"
                              placeholder="Select level of education"
                              error={valueOf(
                                errors,
                                `educationDetails.${idx}.educationNumber`
                              )}
                              helperText={valueOf(
                                errors,
                                `educationDetails.${idx}.educationNumber`
                              )}
                            />
                          )}
                        />
                      </Grid>
                      {valueOf(
                        data,
                        `educationDetails.${idx}.educationNumber`
                      ) === 11 && (
                        <Grid item xs={12}>
                          <InputLabel required>
                            {LABELS.PLACE_HOLDER.OTHER}
                          </InputLabel>
                          <TextField
                            name="otherEducationLevel"
                            id="otherEducationLevel"
                            className={styles["text_field"]}
                            onChange={onInputChangeHandler(
                              `educationDetails.${idx}.otherEducationLevel`
                            )}
                            variant="outlined"
                            required
                            placeholder="Enter education level"
                            size="small"
                            value={valueOf(
                              data,
                              `educationDetails.${idx}.otherEducationLevel`
                            )}
                            helperText={valueOf(
                              errors,
                              `educationDetails.${idx}.otherEducationLevel`
                            )}
                            error={valueOf(
                              errors,
                              `educationDetails.${idx}.otherEducationLevel`
                            )}
                            disabled={update ? !isEditMode : false}
                          />
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <InputLabel
                          required={data.educationDetails[idx].educationLevel}
                        >
                          {LABELS.PLACE_HOLDER.FOS}
                        </InputLabel>
                        <TextField
                          required
                          name="fieldOfStudy"
                          variant="outlined"
                          id="fieldOfStudy"
                          className={styles["text_field"]}
                          size="small"
                          value={valueOf(
                            data,
                            `educationDetails.${idx}.studyField`
                          )}
                          onChange={onInputChangeHandler(
                            `educationDetails.${idx}.studyField`
                          )}
                          placeholder="Enter field of study"
                          error={valueOf(
                            errors,
                            `educationDetails.${idx}.studyField`
                          )}
                          helperText={valueOf(
                            errors,
                            `educationDetails.${idx}.studyField`
                          )}
                          disabled={update ? !isEditMode : false}
                          inputProps={{ maxLength: 150 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel>
                          {LABELS.PLACE_HOLDER.SCHOOL_OR_COLLEGE}
                        </InputLabel>
                        <TextField
                          inputProps={{ maxLength: 150 }}
                          name="school"
                          variant="outlined"
                          id="school"
                          className={styles["text_field"]}
                          size="small"
                          value={valueOf(
                            data,
                            `educationDetails.${idx}.institutionName`
                          )}
                          onChange={onInputChangeHandler(
                            `educationDetails.${idx}.institutionName`
                          )}
                          placeholder="Enter school/college"
                          error={valueOf(
                            errors,
                            `educationDetails.${idx}.institutionName`
                          )}
                          helperText={valueOf(
                            errors,
                            `educationDetails.${idx}.institutionName`
                          )}
                          disabled={update ? !isEditMode : false}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={4}
                        className={styles["text_field"]}
                      >
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
                              `educationDetails.${idx}.address.city`
                            )}
                            setCity={onInputChangeHandler(
                              `educationDetails.${idx}.address.city`,
                              false,
                              false,
                              false,
                              true
                            )}
                            setPinCode={() => {}}
                            setCountryShortName={onInputChangeHandler(
                              `educationDetails.${idx}.address.country`,
                              false,
                              false,
                              false,
                              true
                            )}
                            setStateShortName={onInputChangeHandler(
                              `educationDetails.${idx}.address.stateCode`,
                              false,
                              false,
                              false,
                              true
                            )}
                            setCountry={() => {}}
                            setState={onInputChangeHandler(
                              `educationDetails.${idx}.address.state`,
                              false,
                              false,
                              false,
                              true
                            )}
                            icon={cityIcon}
                            placeholder="City"
                            id="city"
                            name="city"
                            errors={errors}
                            city={valueOf(
                              data,
                              `educationDetails.${idx}.address.city`
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
                              `educationDetails.${idx}.address.state`
                            )}
                            placeholder="State"
                            value={valueOf(
                              data,
                              `educationDetails.${idx}.address.state`
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
                              `educationDetails.${idx}.address.country`
                            )}
                            placeholder="Country"
                            value={valueOf(
                              data,
                              `educationDetails.${idx}.address.country`
                            )}
                            startAdornment={
                              <InputAdornment position="start">
                                <PublicIcon />
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <FormControlLabel
                          disabled={update ? !isEditMode : false}
                          control={
                            <CustomCheckbox
                              checked={valueOf(
                                data,
                                `educationDetails.${idx}.currentStatus`
                              )}
                              onChange={onInputChangeHandler(
                                `educationDetails.${idx}.currentStatus`,
                                false,
                                true
                              )}
                              name="stillHere"
                            />
                          }
                          label="I am currently here"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        className={styles["text_field"]}
                      >
                        <InputLabel
                          required={data.educationDetails[idx].educationLevel}
                        >
                          {LABELS.PLACE_HOLDER.FROM}
                        </InputLabel>
                        <DatePicker
                          disableToolbar
                          autoOk={true}
                          disabled={update ? !isEditMode : false}
                          variant="inline"
                          openTo="year"
                          views={["year", "month"]}
                          placeholder="Select month, year"
                          value={
                            data.educationDetails[idx].startDate
                              ? moment(
                                  data.educationDetails[idx].startDate,
                                  YEARMONTHFORMAT
                                )
                              : null
                          }
                          onChange={(value) => {
                            const tmpEdu = data.educationDetails;
                            tmpEdu[idx].startDate =
                              moment(value).format(YEARMONTHFORMAT);
                            setData({ ...data, educationDetails: tmpEdu });
                          }}
                          size="small"
                          inputVariant="outlined"
                          className={styles["text_field"]}
                          error={valueOf(
                            errors,
                            `educationDetails.${idx}.startDate`
                          )}
                          helperText={valueOf(
                            errors,
                            `educationDetails.${idx}.startDate`
                          )}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                <DateRangeOutlined className="icon" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} lg={6}>
                        <InputLabel
                          required={
                            data.educationDetails[idx].educationLevel &&
                            !data.educationDetails[idx].currentStatus
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
                          openTo="year"
                          views={["year", "month"]}
                          minDate={
                            data.educationDetails[idx].startDate
                              ? moment(data.educationDetails[idx].startDate)
                              : null
                          }
                          value={
                            data.educationDetails[idx].endDate
                              ? moment(
                                  data.educationDetails[idx].endDate,
                                  YEARMONTHFORMAT
                                )
                              : null
                          }
                          onChange={(value) => {
                            const tmpEdu = data.educationDetails;
                            tmpEdu[idx].endDate =
                              moment(value).format(YEARMONTHFORMAT);
                            setData({ ...data, educationDetails: tmpEdu });
                          }}
                          placeholder="Select month, year"
                          disabled={
                            (update ? !isEditMode : false) ||
                            data.educationDetails[idx].currentStatus
                          }
                          size="small"
                          inputVariant="outlined"
                          className={styles["text_field"]}
                          error={
                            !data.educationDetails[idx].currentStatus &&
                            valueOf(errors, `educationDetails.${idx}.endDate`)
                          }
                          helperText={
                            !data.educationDetails[idx].currentStatus &&
                            valueOf(errors, `educationDetails.${idx}.endDate`)
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
                    </Grid>
                    {data.educationDetails.length > 1 && (
                      <IconButton
                        edge="start"
                        className={`delete-item`}
                        color="inherit"
                        arial-label="delete item"
                        disabled={update ? !isEditMode : false}
                        onClick={() => {
                          const tmpData = data.educationDetails;
                          tmpData.splice(idx, 1);
                          const tmpError = errors.educationDetails;
                          tmpError.splice(idx, 1);
                          setData({ ...data, educationDetails: tmpData });
                          setErrors({ ...errors, educationDetails: tmpError });
                        }}
                        size="large"
                      >
                        <Close className="delete-icon" />
                      </IconButton>
                    )}
                  </div>
                );
              })}
            {!data.educationApply && (
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item className="field right">
                  <Button
                    className={styles["add_more_btn"]}
                    disabled={update ? !isEditMode : false}
                    onClick={() => {
                      const tmpEdu = data.educationDetails;
                      tmpEdu.push({
                        address: {
                          cityId: null,
                          cntryId: null,
                          postalCd: "",
                          stateId: null,
                        },
                        currentStatus: false,
                        educationNumber: null,
                        educationLevel: null,
                        endDate: null,
                        institutionName: null,
                        otherEducationLevel: null,
                        startDate: null,
                        studyField: null,
                      });
                      setData({ ...data, educationDetails: tmpEdu });
                      setErrors({
                        ...errors,
                        educationDetails: [
                          ...errors.educationDetails,
                          {
                            address: {
                              cityId: null,
                              cntryId: null,
                              postalCd: "",
                              stateId: null,
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
                      });
                    }}
                  >
                    <AddCircleOutline />
                    Add education
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid container className={styles["btns-grid"]}>
            <Grid item lg={12}>
              <Button
                size="small"
                disabled={value === ManageProfile.FirstTab}
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

export default EducationDetails;
