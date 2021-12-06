import React, { useEffect } from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  InputLabel,
  FormControlLabel,
  Button,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { LABELS } from "../../../../util/additional-info-labels";
import "date-fns";

import classes from "./JsAdditionalInfo.module.scss";
import { CustomCheckbox } from "../../../../util/CustomInputField";
import GlLocationSearch from "../../../../components/locationSearch/glLocationSearch";
import zipCodeIcon from "../../../../assets/images/zipcode.svg";
import cityIcon from "../../../../assets/images/city.svg";
import stateIcon from "../../../../assets/images/state.svg";
import PublicIcon from "@mui/icons-material/Public";
import {
  JsLogin as JsAdditionalInfo,
  validateField,
} from "../../../../util/helper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { updateAdditionalInfoLocation } from "../../../../service/profile";

const PrefferedJobLocations = ({
  data,
  setData,
  value,
  previous,
  next,
  goBack,
  setErrors,
  errors,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    const tmpLocations = data.preferredLocations.jobLocations.map((loc) => {
      return loc.recordType !== "D"
        ? { ...loc, recordType: "U", addressSrcFlag: "G" }
        : { ...loc, addressSrcFlag: "G" };
    });
    setData({
      ...data,
      preferredLocations: {
        ...data.preferredLocations,
        jobLocations: tmpLocations,
      },
    });
  }, []);

  const submit = async () => {
    const response = await updateAdditionalInfoLocation({
      ...data.preferredLocations,
      emailId: sessionStorage.getItem("email")
    });

    if(response.code === "1009"){
      const tmpLocations = data.preferredLocations.jobLocations.filter(loc => loc.recordType !== "D").map((loc) => {
        return  { ...loc, recordType: "U", addressSrcFlag: "G" }
      });
      setData({
        ...data,
        preferredLocations: {
          ...data.preferredLocations,
          jobLocations: tmpLocations,
        },
      });
      next();
    }
  };

  const setLocationErrors = (index) => (ers) => {
    const tmpLocErrs = errors.preferredLocations.jobLocations;
    tmpLocErrs[index] = ers;
    setErrors({
      ...errors,
      preferredLocations: {
        ...data.preferredLocations,
        jobLocations: tmpLocErrs,
      },
    });
  };

  const setCity = (index) => (cityVal) => {
    let tmpLocations = data.preferredLocations.jobLocations;
    tmpLocations[index]["city"] = cityVal;
    setData({
      ...data,
      preferredLocations: {
        ...data.preferredLocations,
        jobLocations: tmpLocations,
      },
    });
  };
  const setPinCode = (index) => (pinCodeVal) => {
    let tmpLocations = data.preferredLocations.jobLocations;
    tmpLocations[index]["postal"] = pinCodeVal;
    setData({
      ...data,
      preferredLocations: {
        ...data.preferredLocations,
        jobLocations: tmpLocations,
      },
    });
  };
  const setState = (index) => (stateVal) => {
    let tmpLocations = data.preferredLocations.jobLocations;
    tmpLocations[index]["state"] = stateVal;
    setData({
      ...data,
      preferredLocations: {
        ...data.preferredLocations,
        jobLocations: tmpLocations,
      },
    });
  };

  const setStateShortName = (index) => (stateShortNameVal) => {
    let tmpLocations = data.preferredLocations.jobLocations;
    tmpLocations[index]["stateCode"] = stateShortNameVal;
    setData({
      ...data,
      preferredLocations: {
        ...data.preferredLocations,
        jobLocations: tmpLocations,
      },
    });
  };
  const setCountry = (index) => (countryVal) => {
    let tmpLocations = data.preferredLocations.jobLocations;
    tmpLocations[index]["countryCode"] = countryVal;
    setData({
      ...data,
      preferredLocations: {
        ...data.preferredLocations,
        jobLocations: tmpLocations,
      },
    });
  };

  const handleLocation = (index, prop) => (e) => {
    let value = e.target.value;
    if (value !== "") {
      setErrors({
        ...errors,
        [prop]: validateField(
          e.target.name,
          value,
          e.target.type,
          e.target.required,
          false
        ),
      });
    }
    if (value === "") {
      setErrors({
        ...errors,
        [prop]: "",
      });
    }
    switch (prop) {
      case "state": {
        setState(index)(value);
        break;
      }
      case "country": {
        setCountry(index)(value);
        break;
      }
      default:
        return;
    }
  };

  const addNewLocation = () => {
    setData({
      ...data,
      preferredLocations: {
        ...data.preferredLocations,
        jobLocations: [
          ...data.preferredLocations.jobLocations,
          { recordType: "I", addressSrcFlag: "G", oldPostalUI: "", uptdTS: new Date() },
        ],
      },
    });

    setErrors({
      ...errors,
      preferredLocations: {
        ...errors.preferredLocations,
        jobLocations: [
          ...errors.preferredLocations.jobLocations,
          {},
        ],
      },
    });
  };

  const removeLocation = (index) => () => {
    let tmpLocations = data.preferredLocations.joblocations;
    let tmpErr = errors.preferredLocations.joblocations;
    if (tmpLocations[index].recordType === "I") {
      tmpLocations = [
        ...tmpLocations.slice(0, index),
        ...tmpLocations.slice(index + 1),
      ];
      tmpErr = [...tmpErr.slice(0, index), ...tmpErr.slice(index + 1)];
    } else {
      tmpLocations[index].recordType = "D";
      tmpErr[index] = {};
    }

    setData({
      ...data,
      preferredLocations: {
        ...data.preferredLocations,
        jobLocations: tmpLocations,
      },
    });

    setErrors({
      ...errors,
      preferredLocations: {
        ...errors.preferredLocations,
        jobLocations: tmpErr,
      },
    })
  };

  return (
    <>
      <div className={classes["title-div"]}>
        {matches && (
          <ArrowBackIcon className={classes["go-back"]} onClick={goBack} />
        )}
        <span>Preffered job locations</span>
      </div>
      <div className={classes["section-title"]}>
        <span> {LABELS.PLACE_HOLDER.PREFERRED_LOCATION}</span>
      </div>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={11}>
          <FormControlLabel
            control={
              <CustomCheckbox
                checked={!data.preferredLocations.applicable}
                onChange={(evt, checked) => {
                  setData({
                    ...data,
                    preferredLocations: {
                      applicable: !checked,
                      jobLocations: checked
                        ? []
                        : data.preferredLocations.jobLocations.length > 0
                        ? data.preferredLocations.jobLocations
                        : [ { recordType: "I", addressSrcFlag: "G", oldPostalUI: "", uptdTS: new Date() }],
                    },
                  });
                }}
                name="alerts"
              />
            }
            label={LABELS.PLACE_HOLDER.NOT_APPLICABLE}
          />
        </Grid>
      </Grid>
      {data.preferredLocations.applicable &&
        data.preferredLocations.jobLocations
          .filter((loc) => loc.recordType !== "D")
          .map((location, index) => (
            <Grid
              className={classes["location-data-grid"]}
              container
              justifyContent="center"
              spacing={4}
            >
              <Grid item className={classes["location-fields"]}>
                <InputLabel className={classes["input-label"]}>
                  {LABELS.PLACE_HOLDER.ZIP}
                </InputLabel>
                <GlLocationSearch
                  fieldValue={location.postal}
                  setCity={setCity(index)}
                  setPinCode={setPinCode(index)}
                  setCountry={setCountry(index)}
                  setState={setState(index)}
                  icon={zipCodeIcon}
                  setStateShortName={setStateShortName(index)}
                  placeholder="Eg: 511190"
                  id="pincode"
                  name={JsAdditionalInfo.pincode}
                  errors={errors.preferredLocations.jobLocations[index]}
                  city={location.city}
                  setErrors={setLocationErrors}
                  size="small"
                />
              </Grid>
              <Grid item className={classes["location-fields"]}>
                <InputLabel className={classes["input-label"]}>
                  {LABELS.PLACE_HOLDER.CITY}
                </InputLabel>
                <GlLocationSearch
                  fieldValue={location.city}
                  setCity={setCity(index)}
                  setPinCode={setPinCode(index)}
                  setCountry={setCountry(index)}
                  setState={setState(index)}
                  icon={cityIcon}
                  placeholder="City"
                  id="city"
                  name={JsAdditionalInfo.city}
                  city={location.city}
                  size="small"
                  setStateShortName={setStateShortName(index)}
                  errors={errors.preferredLocations.jobLocations[index]}
                  setErrors={setLocationErrors}
                />
              </Grid>
              <Grid item className={classes["location-fields"]}>
                <InputLabel className={classes["input-label"]}>
                  {LABELS.PLACE_HOLDER.STATE}
                </InputLabel>
                <FormControl
                  className={classes["text-field"]}
                  variant="outlined"
                  size="small"
                >
                  <OutlinedInput
                    id="loc-state"
                    type="text"
                    name={JsAdditionalInfo.state}
                    onChange={handleLocation(index, "state")}
                    placeholder="State"
                    value={location.state}
                    startAdornment={
                      <InputAdornment position="start">
                        <img
                          className={classes["iconImage"]}
                          src={stateIcon}
                          alt=""
                        />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item className={classes["location-fields"]}>
                <InputLabel className={classes["input-label"]}>
                  {LABELS.PLACE_HOLDER.COUNTRY}
                </InputLabel>
                <TextField
                  className={classes["text-field"]}
                  name={JsAdditionalInfo.country}
                  id={JsAdditionalInfo.country}
                  variant="outlined"
                  onChange={handleLocation(index, "country")}
                  placeholder={LABELS.PLACE_HOLDER.COUNTRY}
                  size="small"
                  value={location.countryCode}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PublicIcon className="icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item className={classes["add-location-btn-grid"]}>
                <Grid container justifyContent="center">
                  {data.preferredLocations.jobLocations.filter(loc => loc.recordType !== "D").length !== 1 &&
                    index !== data.preferredLocations.jobLocations.filter(loc => loc.recordType !== "D").length - 1 && (
                      <Grid item>
                        {" "}
                        <Button
                          size="small"
                          className={classes["add-btn"]}
                          variant="contained"
                          onClick={removeLocation(index)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    )}
                  {index === data.preferredLocations.jobLocations.filter(loc => loc.recordType !== "D").length - 1 && (
                    <Grid item>
                      <Button
                        size="small"
                        className={classes["add-btn"]}
                        variant="contained"
                        onClick={addNewLocation}
                      >
                        Add
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
      <Grid
        container
        justifyContent="center"
        className={classes["locations-grid"]}
      >
        <Grid item></Grid>
      </Grid>
      {!matches ? (
        <Grid
          container
          justifyContent="center"
          className={classes["btns-grid"]}
        >
          <Grid item lg={12} md={12} sm={12} xs={11}>
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
              size="small"
              variant="contained"
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

export default PrefferedJobLocations;
