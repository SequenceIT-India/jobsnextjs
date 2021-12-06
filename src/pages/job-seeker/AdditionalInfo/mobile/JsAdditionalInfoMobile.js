import { Grid } from "@mui/material";
import React, { useState } from "react";
import NestedList from "./List";
import { EditorState } from "draft-js";
import { validateField } from "../../../../util/helper";
import { jsCreateProfileLabels } from "../../../../util/additional-info-fields";

const JsAdditionalInfoMobile = () => {
  const [data, setData] = useState({
    awards: [
      {
        awardDate: null,
        awardNum: 0,
        awardTitle: null,
        crtdTS: null,
        description: null,
        orgName: null,
        uptdTS: null,
      },
    ],
    certifications: [
      {
        certNum: 0,
        certifiedDate: null,
        examCode: null,
        examTitle: null,
        expiryDate: null,
        orgName: null,
        uptdTS: null,
      },
    ],
    certApply: false,
    changeReason: null,
    coverLetter: "",
    crtdTS: null,
    disability: null,
    emailId: sessionStorage.getItem("email"),
    ethnicity: null,
    gender: null,
    groupsMembereds: [
      {
        activeMember: false,
        crtdTS: null,
        description: "",
        fromDate: null,
        groupsMemberedNum: 0,
        title: "",
        toDate: null,
        uptdTS: null,
        url: "",
      },
    ],
    preferredLocations: [],
    patents: [
      {
        crtdTS: null,
        description: "",
        patentDate: null,
        patentNum: "",
        registrationNum: 0,
        title: "",
        uptdTS: null,
        url: "",
      },
    ],
    publications: [
      {
        crtdTS: null,
        description: "",
        publicationDate: null,
        publicationNum: 0,
        title: "",
        uptdTS: null,
        url: "",
      },
    ],
    securityClearance: {
      confidential: false,
      deptOfEnergy: false,
      homelandSecurity: false,
      intelligenceAgency: false,
      otherDescription: "",
      other: false,
      publicTrust: false,
      secret: false,
      sensitive: false,
      topSecret: false,
      topSecretSCI: false,
    },
    securityClearanceFlag: false,
    socialLinks: {
      facebookURL: "",
      linkedInURL: "",
      personalWebURL: "",
      twitterURL: "",
    },
    uptdTS: null,
    veteranServiceFlag: true,
    veteranServices: [
      {
        branch: null,
        countryId: 0,
        crtdTS: null,
        description: "",
        fromDate: null,
        inService: false,
        rank: null,
        recommendations: "",
        toDate: null,
        uptdTS: null,
        veteranServiceNum: 0,
      },
    ],
  });

  const [errors, setErrors] = useState({
    awards: [
      {
        awardDate: null,
        awardNum: 0,
        awardTitle: null,
        crtdTS: null,
        description: null,
        orgName: null,
        uptdTS: null,
      },
    ],
    certifications: [
      {
        certNum: 0,
        certifiedDate: null,
        examCode: null,
        examTitle: null,
        expiryDate: null,
        orgName: null,
        uptdTS: null,
      },
    ],
    changeReason: "",
    coverLetter: "",
    crtdTS: null,
    disability: false,
    emailId: sessionStorage.getItem("email"),
    ethnicity: null,
    gender: null,
    groupsMembereds: [
      {
        activeMember: false,
        crtdTS: null,
        description: "",
        fromDate: null,
        groupsMemberedNum: 0,
        title: "",
        toDate: null,
        uptdTS: null,
        url: "",
      },
    ],
    patents: [
      {
        crtdTS: null,
        description: "",
        patentDate: null,
        patentNum: "",
        registrationNum: 0,
        title: "",
        uptdTS: null,
        url: "",
      },
    ],
    publications: [
      {
        crtdTS: null,
        description: "",
        publicationDate: null,
        publicationNum: 0,
        title: "",
        uptdTS: null,
        url: "",
      },
    ],
    securityClearance: "",
    otherDescription: "",
    securityClearanceFlag: false,
    socialLinks: {
      facebookURL: "",
      linkedInURL: "",
      personalWebURL: "",
      twitterURL: "",
    },
    uptdTS: null,
    veteranServices: [
      {
        branch: null,
        countryId: null,
        crtdTS: null,
        description: "",
        fromDate: null,
        inService: false,
        rank: null,
        recommendations: "",
        toDate: null,
        uptdTS: null,
        veteranServiceNum: 0,
      },
    ],
  });

  const handleLocation = (prop) => (e) => {
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
        setState(value);
        break;
      }
      case "country": {
        setCountry(value);
        break;
      }
      default:
        return;
    }
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [pincode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [countryShortName, setCountryShortName] = useState("");
  const [stateShortName, setStateShortName] = useState("");
  const [locationErrors, setLocationErrors] = useState({});

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onChange = (evt, value) => {
    setData({ ...data, changeReason: value ? value.key : null });
  };

  const onGenderChange = (evt, value) => {
    setData({ ...data, gender: value ? value.key : null });
  };

  const onEthnicityChange = (evt, value) => {
    setData({ ...data, ethnicity: value ? value.key : null });
  };

  const onDisabilityChange = (evt, value) => {
    console.log(value);
    setData({ ...data, disability: value ? value.key : null });
  };

  const valueOf = (obj, path, value) => {
    if (typeof path == "string") {
      return valueOf(obj, path.split("."), value);
    } else if (path.length === 1 && typeof value != "undefined") {
      return (obj[path[0]] = value);
    } else if (path.length === 0) {
      return obj;
    } else {
      return valueOf(obj[path[0]], path.slice(1), value);
    }
  };

  const switchHandleChange = (evt, value) => {
    console.log(evt);
    setData({ ...data, veteranServiceFlag: evt.target.checked });
  };

  const onInputChangeHandler =
    (path, isAutocomplete, isCheckbox, isAutocompleteInt) => (evt, value) => {
      const tmpData = { ...data };
      const tmpErrors = { ...errors };
      let val = null;
      if (isAutocomplete) {
        val = value
          ? isAutocompleteInt
            ? parseInt(value.key || value.id)
            : value.key || value.id
          : null;
      } else if (isCheckbox) {
        val = value;
      } else {
        val = evt.target.value;
      }
      valueOf(tmpData, path, val);
      setData(tmpData);
      if (jsCreateProfileLabels[path]) {
        valueOf(
          tmpErrors,
          path,
          validateField(
            jsCreateProfileLabels[path].name,
            val,
            jsCreateProfileLabels[path].type,
            evt.target.required,
            true,
            "",
            false
          )
        );
        setErrors(tmpErrors);
      } else {
        const paths = path.split(".");
        let checkNext = true;
        if (paths.length > 0) {
          let index = 0;
          let fieldValidateObj = null;
          while (checkNext && index < paths.length) {
            const tmpPath = paths.slice(index, paths.length - 1);

            if (index === 0) {
              fieldValidateObj =
                jsCreateProfileLabels[tmpPath] ||
                jsCreateProfileLabels[paths[index]];
            } else {
              fieldValidateObj =
                fieldValidateObj[tmpPath] || fieldValidateObj[paths[index]];
            }
            if (fieldValidateObj) {
              index++;
              if (fieldValidateObj.type === "array") {
                index++;
                fieldValidateObj = fieldValidateObj.fields;
              }
            } else {
              checkNext = false;
            }
          }
          if (fieldValidateObj) {
            valueOf(
              tmpErrors,
              path,
              validateField(
                fieldValidateObj.name,
                val,
                fieldValidateObj.type,
                false,
                true,
                "",
                false
              )
            );
            setErrors(tmpErrors);
          }
        }
      }
    };
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <NestedList
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
            locationErrors={locationErrors}
            setLocationErrors={setLocationErrors}
            handleLocation={handleLocation}
            pincode={pincode}
            setPinCode={setPinCode}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            country={country}
            setCountry={setCountry}
            setStateShortName={setStateShortName}
            setCountryShortName={setCountryShortName}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JsAdditionalInfoMobile;
