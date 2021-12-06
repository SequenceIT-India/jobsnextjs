import React, { useEffect, useState } from "react";
import JSManageProfileTabs from "./Tab";
import {
  createJobProfile,
  getJobProfile,
  getUserResume,
  updateJobProfile,
} from "../../../service/profile";
import { validateField } from "../../../util/helper";
import { jsCreateProfileLabels } from "../../../util/create-profile-fields";
import { LABELS } from "../../../util/create-profile-labels";
import { RESPONSE_CODE } from "../../../util/constants";
import { defaultStyles } from "react-file-icon";
import { Grid } from "@mui/material";

export default function JSManageProfile() {
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
  const [errors, setErrors] = useState({
    contactAndAddress: {
      address: {
        addressLine: "",
        cityId: null,
        cntryId: null,
        postalCd: "",
        stateId: null,
      },
      contact: {
        cntryId: null,
        email: "",
        firstName: "",
        lastName: "",
        phoneCntryCd: 0,
        phoneNo: 0,
      },
    },
    educationDetails: [
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
    emailId: sessionStorage.getItem("email"),
    employmentTypePref: "",
    jobAlert: null,
    monthsExp: null,
    otherWorkAuthType: null,
    password: null,
    profileComplete: "Y",
    skills: [
      {
        lastUsed: null,
        monthsExp: null,
        skillName: null,
      },
      {
        lastUsed: null,
        monthsExp: null,
        skillName: null,
      },
      {
        lastUsed: null,
        monthsExp: null,
        skillName: null,
      },
    ],
    uptdTS: null,
    workAuthType: null,
    workExpDetails: [
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

    workLocPref: null,
  });
  const [resume, setResume] = useState(null);
  const [open, setOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState({
    message: "",
    type: "success",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const valueAsString = (obj, path) => {
    if (typeof path == "string") {
      return valueAsString(obj, path.split("."));
    } else if (path.length === 0) {
      return obj ? obj.toString() : "";
    } else {
      return valueAsString(obj[path[0]], path.slice(1));
    }
  };

  const valueOf = (obj, path, value) => {
    if (typeof path == "string") {
      return valueOf(obj, path.split("."), value);
    } else if (path.length === 1 && typeof value !== "undefined") {
      return (obj[path[0]] = value);
    } else if (path.length === 0) {
      return obj;
    } else {
      return valueOf(obj[path[0]], path.slice(1), value);
    }
  };

  const onInputChangeHandler =
    (path, isAutocomplete, isCheckbox, isAutocompleteInt, isDirectValue) =>
    (evt, value) => {
      const tmpData = { ...data };
      const tmpErrors = { ...errors };
      let val = null;
      let type = "text";
      if (isAutocomplete) {
        val = value
          ? isAutocompleteInt
            ? parseInt(value.key || value.id)
            : value.key || value.id
          : null;
      } else if (isCheckbox) {
        val = value;
      } else if (isDirectValue) {
        val = evt;
      } else {
        val = evt.target.value;
        type = evt.target.type;
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
            evt.target ? evt.target.required : false,
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
                evt.target.required,
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

  const validateBeforeSubmit = (step) => {
    const tmpErrors = { ...errors };
    let hasError = false;

    const paths =
      step !== undefined
        ? Object.keys(jsCreateProfileLabels).filter(
            (path) => jsCreateProfileLabels[path].step === step
          )
        : Object.keys(jsCreateProfileLabels);

    paths.forEach((path) => {
      let err = "";
      if (jsCreateProfileLabels[path].type === "array") {
        valueOf(data, path).forEach((item, idx) => {
          Object.keys(jsCreateProfileLabels[path].fields).forEach((subPath) => {
            let subErr = "";
            if (jsCreateProfileLabels[path].fields[subPath].validateFn) {
              subErr = jsCreateProfileLabels[path].fields[subPath].validateFn(
                valueOf(data, `${path}.${idx}.${subPath}`),
                valueOf(data, `${path}.${idx}`)
              );
            }
            if (!subErr) {
              subErr = validateField(
                jsCreateProfileLabels[path].fields[subPath].name,
                valueAsString(data, `${path}.${idx}.${subPath}`),
                jsCreateProfileLabels[path].fields[subPath].type,
                jsCreateProfileLabels[path].fields[subPath].validateFn
                  ? false
                  : true,
                true,
                "",
                false
              );
            }
            if (subErr) {
              hasError = true;
            }
            valueOf(tmpErrors, `${path}.${idx}.${subPath}`, subErr);
          });
        });
      } else {
        if (jsCreateProfileLabels[path].validateFn) {
          err = jsCreateProfileLabels[path].validateFn(
            valueOf(data, path),
            data
          );
        } else {
          err = validateField(
            jsCreateProfileLabels[path].name,
            valueAsString(data, path),
            jsCreateProfileLabels[path].type,
            true,
            true,
            "",
            false
          );
        }

        if (err) {
          hasError = true;
        }
        valueOf(tmpErrors, path, err);
      }
    });

    setErrors(tmpErrors);

    return hasError;
  };

  const getUserProfile = async () => {
    const profile = await getJobProfile(sessionStorage.getItem("email"));

    if (profile) {
      if (profile.code !== "1012" && profile) {
        setData({ ...data, ...profile });
        setUpdate(true);
      }
    } else {
      setToastMessage({
        message: LABELS.ERROR.SOMETHNG_WENT_WRONG,
        type: "error",
      });
      setOpen(true);
    }
  };

  const saveProfile = async () => {
    if (update) {
      const updateResponse = await updateJobProfile({
        ...data,
        profileComplete: "Y",
        emailId: sessionStorage.getItem("email"),
      });

      if (
        updateResponse &&
        updateResponse.code === RESPONSE_CODE.SUCCESSFUL_PROFILE_UPDATE
      ) {
        setToastMessage({
          message: LABELS.SUCCESS.PROFILE_UPDATED,
          type: "success",
        });
        setOpen(true);
      } else {
        setToastMessage({
          message: LABELS.ERROR.SOMETHNG_WENT_WRONG,
          type: "error",
        });
        setOpen(true);
      }
    } else {
      const createResponse = await createJobProfile(data, false, true);

      if (
        createResponse &&
        createResponse.code === RESPONSE_CODE.SUCCESSFUL_PROFILE_CREATION
      ) {
        setToastMessage({
          message: LABELS.SUCCESS.PROFILE_CREATED,
          type: "success",
        });
        setOpen(true);
      } else {
        setToastMessage({
          message: LABELS.ERROR.SOMETHNG_WENT_WRONG,
          type: "error",
        });
        setOpen(true);
      }
    }
  };

  const getResume = async () => {
    const response = await getUserResume(sessionStorage.getItem("email"));
    setResume(response);
  };

  useEffect(() => {
    getUserProfile();
    getResume();
  }, []);
  const onSubmit = async (evt) => {
    evt.preventDefault();
    if (!validateBeforeSubmit()) {
      await saveProfile();
    }
  };

  const onPrevious = async (evt) => {
    evt.preventDefault();
  };

  const getIconStyle = (filename) => {
    const extension = filename.split(".").pop().toLowerCase();
    return defaultStyles[extension] || defaultStyles.txt;
  };

  const [update, setUpdate] = useState(false);
  console.log(onInputChangeHandler);
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item lg={11}>
          <JSManageProfileTabs
            valueOf={valueOf}
            data={data}
            errors={errors}
            onInputChangeHandler={onInputChangeHandler}
            setData={setData}
            setErrors={setErrors}
            resume={resume}
            toastMessage={toastMessage}
            open={open}
            handleClose={handleClose}
            onPrevious={onPrevious}
            getResume={getResume}
            getIconStyle={getIconStyle}
          />
        </Grid>
      </Grid>
    </>
  );
}
