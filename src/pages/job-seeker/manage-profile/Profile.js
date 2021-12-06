import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  FormControl,
  Grid,
  Hidden,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Publish } from "@mui/icons-material";
import GlLocationSearch from "../../../components/locationSearch/glLocationSearch";
import PublicIcon from "@mui/icons-material/Public";
import cityIcon from "../../../assets/images/city.svg";
import stateIcon from "../../../assets/images/state.svg";
import zipCodeIcon from "../../../assets/images/zipcode.svg";
import { iconImage } from "../../job-seeker/create-profile/js-create-profile.scss";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import { Alert, Autocomplete } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import React from "react";
import { FileIcon } from "react-file-icon";
import PhoneInput from "react-phone-input-2";
import { mobileInputSmall } from "../../../pages/JobSeeker/Login/JsLogin.module.scss";
import { uploadUserResume } from "../../../service/profile";
import {
  EMPLOYMENT_TYPES,
  WORK_AUTHORIZATION,
  WORK_LOCATION_TYPE,
} from "../../../util/constants";
import { LABELS } from "../../../util/create-profile-labels";
import { ValidMobileNoRegex, ManageProfile } from "../../../util/helper";
import CustomSwitch from "../../../components/switch/CustomSwitch";

import classes from "./ManageProfile.module.scss";

const Profile = ({
  resume,
  onInputChangeHandler,
  errors,
  data,
  value,
  valueOf,
  setErrors,
  setData,
  toastMessage,
  open,
  props,
  handleClose,
  onNext,
  onPrevious,
  getResume,
  getIconStyle,
}) => {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item lg={12}>
          <Typography>Profile</Typography>
        </Grid>
      </Grid>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid
          container
          spacing={4}
          className="js-create-profile main-padded-container"
        >
          <Grid item xs={12} className="field-row">
            {resume && resume.fileData ? (
              <div className="uploaded">
                <div className="upload-area-container">
                  <div className="upload-text">
                    <Typography className="upload-text-header" display="block">
                      Resume uploaded successfully
                    </Typography>
                    <span className="attached-file-icon">
                      <FileIcon
                        extension={resume.fileName
                          .split(".")
                          .pop()
                          .toLowerCase()}
                        {...getIconStyle(resume.fileName)}
                      />{" "}
                      &nbsp;
                    </span>
                    <a
                      className="uploaded-file"
                      href={`data:application/octet-stream;base64,${resume.fileData}`}
                      target="_blank"
                      download={resume.fileName}
                      rel="noreferrer"
                    >
                      {resume.fileName}
                    </a>
                  </div>
                  <Hidden only={["xs", "sm"]}>
                    <Button className="upload-btn">
                      <Delete /> Remove
                    </Button>
                  </Hidden>
                  <Hidden only={["md", "lg", "xl"]}>
                    <div className="upload-btn-wrapper">
                      <Button className="upload-btn">
                        <Delete />
                      </Button>
                    </div>
                  </Hidden>
                </div>
              </div>
            ) : (
              <DropzoneArea
                dropzoneText=""
                Icon={() => (
                  <div className="upload-area-container">
                    <div className="upload-text">
                      <Hidden only={["xs", "sm"]}>
                        <Typography
                          className="upload-text-header"
                          display="block"
                        >
                          Drop your resume here or click on upload button
                        </Typography>
                      </Hidden>
                      <Hidden only={["md", "lg", "xl"]}>
                        <Typography
                          className="upload-text-header"
                          display="block"
                        >
                          Upload resume
                        </Typography>
                      </Hidden>
                      <Typography
                        className="upload-text-subtitle"
                        display="block"
                      >
                        Supported formats: .docx, .doc, .pdf, .txt, .rtf up to 3
                        MB
                      </Typography>
                    </div>
                    <Hidden only={["xs", "sm"]}>
                      <Button className="upload-btn">Upload File</Button>
                    </Hidden>
                    <Hidden only={["md", "lg", "xl"]}>
                      <div className="upload-btn-wrapper">
                        <Button className="upload-btn">
                          <Publish />
                        </Button>
                      </div>
                    </Hidden>
                  </div>
                )}
                onChange={async (files) => {
                  if (files.length) {
                    await uploadUserResume(
                      sessionStorage.getItem("email"),
                      files[0]
                    );
                    await getResume();
                  }
                }}
                showPreviewsInDropzone={false}
                showPreviews={false}
              />
            )}
          </Grid>
        </Grid>
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <InputLabel required className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.FIRST_NAME}
            </InputLabel>
            <TextField
              name="contactAndAddress.contact.firstName"
              id="contactAndAddress.contact.firstName"
              className={classes["text_field"]}
              onChange={onInputChangeHandler(
                "contactAndAddress.contact.firstName"
              )}
              variant="outlined"
              required
              placeholder="Enter First Name"
              size="small"
              value={valueOf(data, "contactAndAddress.contact.firstName")}
              helperText={valueOf(
                errors,
                "contactAndAddress.contact.firstName"
              )}
              error={valueOf(errors, "contactAndAddress.contact.firstName")}
              inputProps={{ maxLength: 150 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputLabel required className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.LAST_NAME}
            </InputLabel>
            <TextField
              name="contactAndAddress.contact.lastName"
              id="lastNacontactAndAddress.contact.lastNameme"
              className={classes["text_field"]}
              onChange={onInputChangeHandler(
                "contactAndAddress.contact.lastName"
              )}
              variant="outlined"
              required
              placeholder="Enter Last Name"
              size="small"
              value={valueOf(data, "contactAndAddress.contact.lastName")}
              error={valueOf(errors, "contactAndAddress.contact.lastName")}
              helperText={valueOf(errors, "contactAndAddress.contact.lastName")}
              inputProps={{ maxLength: 150 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputLabel className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.MOBILE_NUMBER}
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              className={classes["text_field"]}
            >
              <PhoneInput
                specialLabel=""
                inputClass={mobileInputSmall}
                country={
                  valueOf(data, "contactAndAddress.contact.phoneCntryCd") ||
                  "us"
                }
                value={valueOf(data, "contactAndAddress.contact.phoneNo")}
                onChange={(value, e) => {
                  let phoneErrorMessage = ValidMobileNoRegex.test(
                    value.replace(e.dialCode, "")
                  )
                    ? ""
                    : "Invalid Mobile No";
                  if (value.replace(e.dialCode, "") === "") {
                    phoneErrorMessage = "";
                  }
                  setErrors({ ...errors, phoneErrorMessage });
                  valueOf(data, "contactAndAddress.contact.phoneNo", value);
                  valueOf(
                    data,
                    "contactAndAddress.contact.phoneCntryCd",
                    e.dialCode
                  );
                  setData(data);
                }}
                enableSearch
                name="phoneNo"
                placeholder="Phone Number"
                disableSearchIcon={true}
                preferredCountries={["us", "in"]}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={3}>
            <InputLabel required className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.ZIP}
            </InputLabel>
            <FormControl
              className={classes["text_field"]}
              variant="outlined"
              size="small"
            >
              <GlLocationSearch
                fieldValue={valueOf(data, "contactAndAddress.address.postal")}
                setCity={onInputChangeHandler(
                  "contactAndAddress.address.city",
                  false,
                  false,
                  false,
                  true
                )}
                setPinCode={onInputChangeHandler(
                  "contactAndAddress.address.postal",
                  false,
                  false,
                  false,
                  true
                )}
                setStateShortName={onInputChangeHandler(
                  "contactAndAddress.address.stateCode",
                  false,
                  false,
                  false,
                  true
                )}
                setCountryShortName={onInputChangeHandler(
                  "contactAndAddress.address.country",
                  false,
                  false,
                  false,
                  true
                )}
                setCountry={() => {}}
                setState={onInputChangeHandler(
                  "contactAndAddress.address.state",
                  false,
                  false,
                  false,
                  true
                )}
                icon={zipCodeIcon}
                placeholder="Eg: 511190"
                id="pincode"
                name="pincode"
                errors={errors}
                city={valueOf(data, "contactAndAddress.address.city")}
                setErrors={setErrors}
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabel required className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.CITY}
            </InputLabel>
            <FormControl
              className={classes["text_field"]}
              variant="outlined"
              size="small"
            >
              <GlLocationSearch
                fieldValue={valueOf(data, "contactAndAddress.address.city")}
                setCity={onInputChangeHandler(
                  "contactAndAddress.address.city",
                  false,
                  false,
                  false,
                  true
                )}
                setPinCode={onInputChangeHandler(
                  "contactAndAddress.address.postal",
                  false,
                  false,
                  false,
                  true
                )}
                setStateShortName={onInputChangeHandler(
                  "contactAndAddress.address.stateCode",
                  false,
                  false,
                  false,
                  true
                )}
                setCountryShortName={onInputChangeHandler(
                  "contactAndAddress.address.country",
                  false,
                  false,
                  false,
                  true
                )}
                setCountry={() => {}}
                setState={onInputChangeHandler(
                  "contactAndAddress.address.state",
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
                city={valueOf(data, "contactAndAddress.address.city")}
                setErrors={setErrors}
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabel required className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.STATE}
            </InputLabel>
            <FormControl
              className={classes["text_field"]}
              variant="outlined"
              size="small"
            >
              <OutlinedInput
                id="loc-state"
                type="text"
                name={valueOf(data, "contactAndAddress.address.state")}
                placeholder="State"
                value={valueOf(data, "contactAndAddress.address.state")}
                startAdornment={
                  <InputAdornment position="start">
                    <img className={iconImage} src={stateIcon} alt="" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <InputLabel required className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.COUNTRY}
            </InputLabel>
            <FormControl
              className={classes["text_field"]}
              variant="outlined"
              size="small"
            >
              <OutlinedInput
                id="loc-cntry"
                type="text"
                name={valueOf(data, "contactAndAddress.address.country")}
                placeholder="Country"
                value={valueOf(data, "contactAndAddress.address.country")}
                startAdornment={
                  <InputAdornment position="start">
                    <PublicIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
        <div className={classes["profile-visibility-div"]}>
          <span>willing to relocate </span>
          <CustomSwitch />
        </div>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xs={12} sm={12}>
            <Typography>Seeking employment types</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xs={12} sm={12}>
            <InputLabel className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.EMPLOYMENT_TYPE}
            </InputLabel>
            <Autocomplete
              multiple
              className={classes["text_field"]}
              name="employmentType"
              id="employmentType"
              options={EMPLOYMENT_TYPES}
              getOptionLabel={(option) => `${option.name}`}
              type="text"
              size="small"
              groupBy={(option) => option.group}
              value={EMPLOYMENT_TYPES.filter(
                (option) => data.employmentTypePref[option.key] === "Y"
              )}
              onChange={(evt, value) => {
                const tmpEmploymentTypePref = data.employmentTypePref;
                Object.keys(tmpEmploymentTypePref).forEach((key) => {
                  tmpEmploymentTypePref[key] = "N";
                });
                value.forEach((val) => {
                  tmpEmploymentTypePref[val.key] = "Y";
                });
                setData({
                  ...data,
                  employmentTypePref: tmpEmploymentTypePref,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="empType"
                  variant="outlined"
                  id="empType"
                  placeholder="Select employment type"
                  error={valueOf(errors, "employmentTypePref")}
                  helperText={valueOf(errors, "employmentTypePref")}
                />
              )}
            />
          </Grid>
        </Grid>
        <div className={classes["profile-visibility-div"]}>
          <span>
            Are you legally authorised to work in the United States without
            sponsership to any employer ? *{" "}
          </span>
          <CustomSwitch className={classes["custom_switch"]} />
        </div>
        <div className={classes["profile-visibility-div"]}>
          <span>
            will you now or in the future require visa sponsership ? *
          </span>
          <CustomSwitch className={classes["custom_switch"]} />
        </div>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <Typography display="block">
              {LABELS.PLACE_HOLDER.WORK_AUTHORIZATION}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} lg={12}>
            <InputLabel className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.WORK_AUTHORIZATION}
            </InputLabel>
            <Autocomplete
              className={classes["text_field"]}
              name="workAuthorization"
              id="workAuthorization"
              options={WORK_AUTHORIZATION}
              getOptionLabel={(option) => `${option.name}`}
              type="text"
              size="small"
              value={
                WORK_AUTHORIZATION.filter(
                  (option) => data.workAuthType === option.key
                )[0] || { name: "", key: "" }
              }
              onChange={(evt, value) => {
                setData({
                  ...data,
                  workAuthType: value ? value.key : null,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="workAuth"
                  variant="outlined"
                  id="workAuth"
                  placeholder="Select work authorization"
                  error={valueOf(errors, "workAuthType")}
                  helperText={valueOf(errors, "workAuthType")}
                />
              )}
            />
          </Grid>
          {data.workAuthType === 99 && (
            <Grid item xs={12} lg={12}>
              <InputLabel required className={classes["input_label"]}>
                {LABELS.PLACE_HOLDER.OTHER}
              </InputLabel>
              <TextField
                className={classes["text_field"]}
                name="otherWorkAuthType"
                id="otherWorkAuthType"
                onChange={onInputChangeHandler("otherWorkAuthType")}
                variant="outlined"
                required
                placeholder="Enter work authorization"
                size="small"
                helperText={valueOf(errors, "otherWorkAuthType")}
                error={Boolean(valueOf(errors, "otherWorkAuthType"))}
              />
            </Grid>
          )}
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <Typography>{LABELS.PLACE_HOLDER.WORK_LOCATION_TYPE}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} lg={12}>
            <InputLabel className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.WORK_LOCATION_TYPE}
            </InputLabel>
            <Autocomplete
              className={classes["text_field"]}
              multiple
              name="workLocation"
              id="workLocation"
              options={WORK_LOCATION_TYPE}
              getOptionLabel={(option) => `${option.name}`}
              type="text"
              size="small"
              value={WORK_LOCATION_TYPE.filter(
                (option) => data.workLocPref[option.key] === "Y"
              )}
              onChange={(evt, value) => {
                const tmpWorkLocPref = data.workLocPref;
                Object.keys(tmpWorkLocPref).forEach((key) => {
                  tmpWorkLocPref[key] = "N";
                });
                value.forEach((val) => {
                  tmpWorkLocPref[val.key] = "Y";
                });
                setData({ ...data, workLocPref: tmpWorkLocPref });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="locationDetails"
                  variant="outlined"
                  id="search-location"
                  placeholder="Select work location type"
                  error={valueOf(errors, "workLocPref")}
                  helperText={valueOf(errors, "workLocPref")}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <Typography>{LABELS.PLACE_HOLDER.TOTAL_EXPERIENCE}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={6}>
            <InputLabel className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.YEAR}
            </InputLabel>
            <Autocomplete
              className={classes["text_field"]}
              name="year"
              id="year"
              value={Math.floor(data.monthsExp / 12)}
              options={Array.from(Array(76).keys())}
              getOptionLabel={(option) => `${option}`}
              onChange={(evt, value) => {
                if (value) {
                  setData({
                    ...data,
                    monthsExp: parseInt(value) * 12 + (data.monthsExp % 12),
                  });
                } else {
                  setData({ ...data, monthsExp: 0 });
                }
              }}
              type="text"
              size="small"
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="locationDetails"
                  variant="outlined"
                  id="search-location"
                  placeholder="Select year"
                  error={valueOf(errors, "monthsExp")}
                  helperText={valueOf(errors, "monthsExp")}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={6}>
            <InputLabel className={classes["input_label"]}>
              {LABELS.PLACE_HOLDER.MONTH}
            </InputLabel>
            <Autocomplete
              className={classes["text_field"]}
              name="month"
              id="month"
              options={Array.from(Array(13).keys())}
              onChange={(evt, value) => {
                if (value) {
                  setData({
                    ...data,
                    monthsExp:
                      Math.floor(data.monthsExp / 12) * 12 + parseInt(value),
                  });
                } else {
                  setData({ ...data, monthsExp: 0 });
                }
              }}
              value={Math.floor(data.monthsExp % 12)}
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
        </Grid>
        <Grid container spacing={4} className={classes["btns-grid"]}>
          <Grid item lg={12}>
            <Button
              size="small"
              disabled={value === ManageProfile.firstTab}
              variant="outlined"
              className={classes["previous-btn"]}
              onClick={onPrevious}
            >
              Previous
            </Button>
            <Button
              size="small"
              disabled={value === ManageProfile.fourthTab}
              variant="outlined"
              className={classes["next-btn"]}
              onClick={onNext}
            >
              Next
            </Button>
            <Button
              variant="contained"
              className={classes["submit-btn"]}
              size="small"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={toastMessage.type}>
            {toastMessage.message}
          </Alert>
        </Snackbar>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default Profile;
