import {
  Facebook,
  Public,
  Twitter
} from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
  Autocomplete, Button, FormControlLabel, Grid,
  InputAdornment,

  InputLabel, TextField
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "date-fns";
import React from "react";
import CustomEditor from "../../../../components/Editor/CustomEditor";
import CustomSwitch from "../../../../components/switch/CustomSwitch";
import { updateAdditionalInfoPersonalInfo } from "../../../../service/profile";
import { LABELS } from "../../../../util/additional-info-labels";
import {
  CHANGE_REASON,
  CLEARANCE, DISABILITIES,
  ETHNICITY,
  GENDER
} from "../../../../util/constants";
import classes from "./JsAdditionalInfo.module.scss";


const PersonalInfo = ({
  valueOf,
  onInputChangeHandler,
  data,
  errors,
  onChange,
  onEditorStateChange,
  editorState,
  setData,
  setErrors,
  value,
  previous,
  next,
  goBack,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.only("xs"));

  const handleVeteranServiceFlag = (evt, value) => {
    setData({ ...data, veteranServiceFlag: evt.target.checked });
  };

  const handleSecurityClearanceFlag = (evt, value) => {
    setData({ ...data, securityClearanceFlag: evt.target.checked });
  };

  const onGenderChange = (evt, value) => {
    setData({ ...data, gender: value ? value.key : null });
  };

  const onEthnicityChange = (evt, value) => {
    setData({ ...data, ethnicity: value ? value.key : null });
  };

  const onDisabilityChange = (evt, value) => {
    setData({
      ...data,
      disabilities: [
        {
          disabilityCode: value ? value.key : null,
          otherDesc: "",
        },
      ],
    });
  };

  const onSecurityClearanceChange = (evt, value) => {
    setData({
      ...data,
      securityClearance: [
        {
          clearanceCode: value ? value.key : null,
          otherDesc: "",
        },
      ],
    });
  };

  const submit = async () => {
    updateAdditionalInfoPersonalInfo({
      changeReason: data.changeReason,
      coverLetter: {
        coverLetter:editorState.getCurrentContent().getPlainText(),
        coverLetterName: "",
        emailId: sessionStorage.getItem("email"),
        oldCoverLetterName: "",
        status: true,
        uptdTS: new Date(),
      },
      sectionsFlag: {
        addressUpdated: true,
        disabilityUpdated: true,
        empltypeUpdated: true,
        securityClearanceUpdated: true,
        totExpUpdated: true,
        workAuthUpdated: true,
        workLocTypesUpdated: true
      },
      disabilities: data.disabilities,
      emailId: sessionStorage.getItem("email"),
      ethnicity: data.ethnicity,
      gender: data.gender,
      securityClearance: data.securityClearance,
      securityClearanceFlag: true,
      socialLinks: data.socialLinks,
      uptdTS: new Date(),
      veteranServiceFlag: data.veteranServiceFlag,
    });
  };
  return (
    <>
      <div className={classes["title-div"]}>
        {matches && (
          <ArrowBackIcon className={classes["go-back"]} onClick={goBack} />
        )}
        <span>Personal Information</span>
      </div>
      <div className={classes["section-title"]}>
        <span>Social links</span>
      </div>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={6} md={6} sm={6} xs={11}>
          <TextField
            className={classes["text-field"]}
            name="socialLinks.linkedInURL"
            id="socialLinks.linkedInURL"
            onChange={onInputChangeHandler("socialLinks.linkedInURL")}
            variant="outlined"
            placeholder={LABELS.PLACE_HOLDER.LINKEDIN}
            size="small"
            value={valueOf(data, "socialLinks.linkedInURL")}
            helperText={valueOf(errors, "socialLinks.linkedInURL")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkedInIcon className={classes["linkedin-icon"]} />
                </InputAdornment>
              ),
              className: classes["text_field"],
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={11}>
          <TextField
            className={classes["text-field"]}
            name="socialLinks.twitterURL"
            id="socialLinks.twitterURL"
            onChange={onInputChangeHandler("socialLinks.twitterURL")}
            variant="outlined"
            placeholder={LABELS.PLACE_HOLDER.TWITTER}
            size="small"
            value={valueOf(data, "socialLinks.twitterURL")}
            helperText={valueOf(errors, "socialLinks.twitterURL")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Twitter className={classes["twitter-icon"]} />
                </InputAdornment>
              ),
              className: classes["text_field"],
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={11}>
          <TextField
            className={classes["text-field"]}
            name="socialLinks.facebookURL"
            id="socialLinks.facebookURL"
            onChange={onInputChangeHandler("socialLinks.facebookURL")}
            variant="outlined"
            placeholder={LABELS.PLACE_HOLDER.FACEBOOK}
            size="small"
            value={valueOf(data, "socialLinks.facebookURL")}
            helperText={valueOf(errors, "socialLinks.facebookURL")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Facebook className={classes["facebook-icon"]} />
                </InputAdornment>
              ),
              className: classes["text_field"],
            }}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={11}>
          <TextField
            className={classes["text-field"]}
            name="socialLinks.personalWebURL"
            id="socialLinks.personalWebURL"
            onChange={onInputChangeHandler("socialLinks.personalWebURL")}
            variant="outlined"
            placeholder={LABELS.PLACE_HOLDER.PERSONAL}
            size="small"
            value={valueOf(data, "socialLinks.personalWebURL")}
            helperText={valueOf(errors, "socialLinks.personalWebURL")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Public className={classes["public-icon"]} />
                </InputAdornment>
              ),
              className: classes["text_field"],
            }}
          />
        </Grid>
      </Grid>
      <div className={classes["section-title"]}>
        <span>{LABELS.PLACE_HOLDER.CHANGE_REASON}</span>
      </div>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={11}>
          <InputLabel className={classes["input-label"]}>
            {LABELS.PLACE_HOLDER.CHANGE_REASON}
          </InputLabel>
          <Autocomplete
            name="changeReason"
            id="changeReason"
            options={CHANGE_REASON}
            getOptionLabel={(option) => `${option.name}`}
            type="text"
            size="small"
            groupBy={(option) => option.group}
            value={
              CHANGE_REASON.filter(
                (option) => data.changeReason === option.key
              )[0]
            }
            onChange={(evt, value) => onChange(evt, value)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="locationDetails"
                variant="outlined"
                id="search-location"
                placeholder="Select change reasons"
                helperText={valueOf(errors, "changeReason")}
              />
            )}
          />
        </Grid>
      </Grid>
      <div className={classes["section-title"]}>
        <span>{LABELS.PLACE_HOLDER.RESUME_COVER}</span>
      </div>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={11}>
          <CustomEditor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            editorClassName={classes["editor"]}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent={matches ? "center" : ""} spacing={4}>
        <Grid item lg={8} md={8} sm={12} xs={11}>
          <span className={classes["non-mandatory-text"]}>
            {" "}
            Non Mandatory information: Completely voluntary, shared with
            employers who comply with and sign ‘non-disclosure agreement’ and
            ‘Equal Employment Opportunity’ practices and designated recruiters
            by companies.
          </span>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={6} md={6} sm={6} xs={11}>
          <InputLabel className={classes["input-label"]}>
            {LABELS.PLACE_HOLDER.GENDER}
          </InputLabel>
          <Autocomplete
            name="gender"
            id="gender"
            options={GENDER}
            getOptionLabel={(option) => `${option.name}`}
            type="text"
            size="small"
            value={GENDER.filter((option) => data.gender === option.key)[0]}
            onChange={(evt, value) => onGenderChange(evt, value)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="genderText"
                variant="outlined"
                id="search-gender"
                placeholder="Gender"
                error={valueOf(errors, "gender")}
                helperText={valueOf(errors, "gender")}
              />
            )}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={11}>
          <InputLabel className={classes["input-label"]}>
            {LABELS.PLACE_HOLDER.ETHNICITY}
          </InputLabel>
          <Autocomplete
            name="ethnicity"
            id="ethnicity"
            options={ETHNICITY}
            getOptionLabel={(option) => `${option.name}`}
            type="text"
            size="small"
            groupBy={(option) => option.group}
            value={
              ETHNICITY.filter((option) => data.ethnicity === option.key)[0]
            }
            onChange={(evt, value) => onEthnicityChange(evt, value)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="ethnicityText"
                variant="outlined"
                id="search-ethnicity"
                placeholder="Ethnicity"
                error={valueOf(errors, "ethnicity")}
                helperText={valueOf(errors, "ethnicity")}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={11}>
          <InputLabel className={classes["input-label"]}>
            {LABELS.PLACE_HOLDER.DISABILITY}
          </InputLabel>
          <Autocomplete
            name="disability"
            id="disability"
            options={DISABILITIES}
            getOptionLabel={(option) => `${option.name}`}
            type="text"
            size="small"
            groupBy={(option) => option.group}
            value={
              DISABILITIES.filter((option) => data.disabilities[0]?.disabilityCode === option.key)[0]
            }
            onChange={(evt, value) => onDisabilityChange(evt, value)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="disabilityText"
                variant="outlined"
                id="search-disability"
                placeholder="Disability"
                error={valueOf(errors, "disability")}
                helperText={valueOf(errors, "disability")}
              />
            )}
          />
        </Grid>
        {data.disability === 99 && (
          <Grid item lg={12} md={12} sm={12} xs={11}>
            <InputLabel required className={classes["input-label"]}>
              {LABELS.PLACE_HOLDER.OTHER_DISABILITY}
            </InputLabel>
            <TextField
              name={`otherDisability`}
              className={classes["text-field"]}
              id={`otherDisability`}
              onChange={onInputChangeHandler(`otherDisability`)}
              variant="outlined"
              placeholder={`Enter ${LABELS.PLACE_HOLDER.OTHER_DISABILITY}`}
              value={valueOf(data, `otherDisability`)}
              size="small"
              required
              helperText={valueOf(errors, `otherDisability`)}
            />
          </Grid>
        )}
      </Grid>
      <div className={classes["section-title"]}>
        <span>{LABELS.PLACE_HOLDER.SECURITY_CLEARANCE}</span>
      </div>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={11}>
          <FormControlLabel
            className={classes["veteran-service"]}
            control={
              <CustomSwitch
                isActive={data.securityClearanceFlag}
                handleChange={handleSecurityClearanceFlag}
                name="securityClearanceFlag"
                className={classes["formGroup"]}
              />
            }
            label={LABELS.PLACE_HOLDER.SECURITY_CLEARANCE}
            labelPlacement="start"
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={11}>
          <InputLabel className={classes["input-label"]}>
            {LABELS.PLACE_HOLDER.CLEARANCE}
          </InputLabel>
          <Autocomplete
            name="clearance"
            id="clearance"
            options={CLEARANCE}
            getOptionLabel={(option) => `${option.name}`}
            type="text"
            size="small"
            groupBy={(option) => option.group}
            value={
              CLEARANCE.filter((option) => data.securityClearance[0]?.clearanceCode === option.key)[0]
            }
            onChange={(evt, value) => onSecurityClearanceChange(evt, value)}
            renderInput={(params) => (
              <TextField
                {...params}
                name="clearanceText"
                variant="outlined"
                id="search-clearance"
                placeholder="Clearance"
                error={valueOf(errors, "clearance")}
                helperText={valueOf(errors, "clearance")}
              />
            )}
          />
        </Grid>
        { data.securityClearance[0]?.clearanceCode === 0 && (
          <Grid item lg={12} md={12} sm={12} xs={11}>
            <InputLabel required className={classes["input-label"]}>
              {LABELS.PLACE_HOLDER.OTHER_SECURITY_CLEARANCE}
            </InputLabel>
            <TextField
              name={`otherClearance`}
              className={classes["text-field"]}
              id={`otherClearance`}
              onChange={onInputChangeHandler(`securityClearance.0.otherDesc`)}
              variant="outlined"
              placeholder={`Enter ${LABELS.PLACE_HOLDER.OTHER_SECURITY_CLEARANCE}`}
              value={valueOf(data, `securityClearance.0.otherDesc`)}
              size="small"
              required
              helperText={valueOf(errors, `otherClearance`)}
            />
          </Grid>
        )}
      </Grid>
      
      <div className={classes["section-title"]}>
        <span>{LABELS.PLACE_HOLDER.VETERAN_SERVICE}</span>
      </div>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={11}>
          <FormControlLabel
            className={classes["veteran-service"]}
            control={
              <CustomSwitch
                isActive={data.veteranServiceFlag}
                handleChange={handleVeteranServiceFlag}
                name="veteranServiceFlag"
                className={classes["formGroup"]}
              />
            }
            label={LABELS.PLACE_HOLDER.VETERAN_SERVICE}
            labelPlacement="start"
          />
        </Grid>
      </Grid>
      {!matches ? (
        <Grid
          container
          justifyContent="center"
          className={classes["btns-grid"]}
        >
          <Grid item lg={12} xs={11} md={12} sm={12}>
            <Button
              size="small"
              disabled={value === 0}
              variant="outlined"
              className={classes["previous-btn"]}
              onClick={previous}
            >
              Previous
            </Button>
            <Button
              size="small"
              disabled={value === 6}
              variant="outlined"
              className={classes["next-btn"]}
              onClick={next}
            >
              Next
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes["submit-btn"]}
              onClick={submit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="center"
          spacing={4}
          className={classes["btns-grid"]}
        >
          <Grid item lg={12} xs={11} md={12} sm={12}>
            <Button
              size="small"
              variant="outlined"
              className={classes["cancel-btn"]}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes["submit-btn"]}
              onClick={submit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PersonalInfo;
