/* eslint-disable no-unused-vars */
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdditionalInfo } from "../../../../service/profile";
import { jsCreateProfileLabels } from "../../../../util/additional-info-fields";
import { LABELS } from "../../../../util/additional-info-labels";
import { validateField } from "../../../../util/helper";
import colors from "../../../../vars.module.scss";
import JsAdditionalInfoTabs from "./JsAdditionalInfoTabs";



const useStyles = makeStyles((theme) => ({
  gridRoot: {
    minHeight: "100vh",
  },
  jobsTitleDiv: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.25rem",
    justifyContent: "space-between",
    [theme.breakpoints.between("xs", "md")]: {
      paddingRight: "0.75rem",
    },
  },
  titleDiv: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    color: colors.primaryDarkColor,
    marginLeft: "1rem",
    fontWeight: 500,
    [theme.breakpoints.between("xs", "md")]: {
      fontSize: "small",
      padding: "0px 0.75rem",
      marginLeft: 0,
    },
  },
  subtitle: {
    color: colors.disableColor,
    marginTop: "0.75rem",
    fontSize: 16,
    fontWeight: 400,
    marginBottom: "1rem",
    [theme.breakpoints.between("xs", "md")]: {
      fontSize: "small",
      padding: "0px 0.75rem",
    },
  },
  profileLink: {
    marginRight: "1rem",
    fontWeight: 400,
    [theme.breakpoints.between("xs", "md")]: {
      fontSize: "small",
      padding: "0px 0.75rem",
      marginRight: 0,
    },
  },
  link: {
    color: colors.textLightColor,
    textDecoration: "none",
  },
  rightArrowIcon: {
    width: 15,
    color: colors.textLightColor,
    [theme.breakpoints.between("xs", "md")]: {
      width: 10,
    },
  },
  divider: {
    [theme.breakpoints.between("xs", "md")]: {
      width: "85%",
      padding: "0px 0.75rem",
      margin: "auto",
    },
  },
}));

const JsAdditionalInfo = () => {
  const [data, setData] = useState({
    awards: [
      {
        awardDate: null,
        awardTitle: null,
        description: null,
        awardedBy: null,
        oldAwardTitle: null,
        oldAwardedDate: null,
        uptdTS: new Date(),
        recordType: "I",
      },
    ],
    certifications: {
      applicable: false,
      certifications: [],
    },
    certApply: false,
    changeReason: null,
    coverLetter: "",
    crtdTS: null,
    disabilities: [
      {
        disabilityCode: "",
        otherDesc: "",
      },
    ],
    emailId: sessionStorage.getItem("email"),
    ethnicity: null,
    gender: null,
    grpsmembered: [
      {
        activeMember: false,
        description: "",
        fromDate: null,
        groupsMemName: "",
        toDate: null,
        uptdTS: null,
        url: "",
        recordType: "I",
      },
    ],
    preferredLocations: {
      applicable: false,
      jobLocations: [],
    },
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
        recordType: "I",
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
        recordType: "I",
      },
    ],
    securityClearance: [
      {
        clearanceCode: 0,
        otherDesc: "",
      },
    ],
    securityClearanceFlag: true,
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
        recordType: "I",
      },
    ],
    certifications: {
      applicable: false,
      certifications: [],
    },
    changeReason: "",
    coverLetter: "",
    crtdTS: null,
    disability: false,
    emailId: sessionStorage.getItem("email"),
    ethnicity: null,
    gender: null,
    preferredLocations: {
      applicable: false,
      jobLocations: [],
    },
    grpsmembered: [
      {
        activeMember: false,
        crtdTS: null,
        description: "",
        fromDate: null,
        groupsMemberedNum: 0,
        title: "",
        toDate: null,
        uptdTS: null,
        recordType: "I",
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
    securityClearance: [
      {
        clearanceCode: 0,
        otherDesc: "",
      },
    ],
    securityClearanceFlag: true,
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

  const [update, setUpdate]= useState(false);
  
  const [open, setOpen] = useState(false);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [toastMessage, setToastMessage] = useState({
    message: "",
    type: "success",
  });

  const getAdditionalInfoData = async() => {
    const response = await getAdditionalInfo(sessionStorage.getItem('email'));
    if (response) {
      if (response.code !== "1012" && response && response?.status !== 404) {
        setData({ ...data, ...response, certifications : { applicable: response.certifications.length > 0, certifications: response.certifications} });
        setUpdate(true);
      }
    } else {
      setToastMessage({
        message: LABELS.ERROR.SOMETHNG_WENT_WRONG,
        type: "error",
      });
      setOpen(true);
    }
  }

  useEffect(()=> {
    getAdditionalInfoData();
  }, [])

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const classes = useStyles();

  const onChange = (evt, value) => {
    setData({ ...data, changeReason: value ? value.key : null });
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
      <Grid className={classes.gridRoot} container justifyContent="center">
        <Grid item lg={11} md={11} xs={11}>
          <div className={classes.jobsTitleDiv}>
            <div className={classes.titleDiv}>
              <Typography className={classes.profileLink} variant="body1">
                <Link className={classes.link} to="/jobseeker/homepage">
                  Home
                </Link>
              </Typography>
              <ArrowForwardIosIcon className={classes.rightArrowIcon} />
              <Typography className={classes.title} variant="h6">
                Additional Information
              </Typography>
            </div>
          </div>
          <JsAdditionalInfoTabs
            valueOf={valueOf}
            onInputChangeHandler={onInputChangeHandler}
            data={data}
            errors={errors}
            onChange={onChange}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            setData={setData}
            setErrors={setErrors}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JsAdditionalInfo;
