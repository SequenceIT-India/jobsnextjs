import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  InputLabel,
  FormControlLabel,
  IconButton,
  Button,
} from "@mui/material";
import { LABELS } from "../../../../util/additional-info-labels";
import { AddCircleOutline, Close } from "@mui/icons-material";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import moment from "moment";

import classes from "./JsAdditionalInfo.module.scss";
import DateFnsUtils from "@date-io/date-fns";
import { CustomCheckbox } from "../../../../util/CustomInputField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { updateAdditionalInfoCertification } from "../../../../service/profile";
import { YEARMONTHFORMAT } from "../../../../util/constants";

const Certifications = ({
  data,
  setData,
  valueOf,
  onInputChangeHandler,
  errors,
  setErrors,
  value,
  previous,
  next,
  goBack,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    const tmpCerts = data.certifications.certifications.map((cert) => {
      return cert.recordType !== "D" ? { ...cert, recordType: "U" } : cert;
    });
    setData({
      ...data,
      certifications: {
        ...data.certifications,
        certifications: tmpCerts,
      },
    });
  }, []);

  const submit = async () => {
    const response = await updateAdditionalInfoCertification({
      ...data.certifications,
      emailId: sessionStorage.getItem("email"),
    });

    if (response.code === "1009") {
      const tmpLocations = data.certifications.certifications
        .filter((loc) => loc.recordType !== "D")
        .map((loc) => {
          return { ...loc, recordType: "U" };
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

  const addNew = () => {
    setData({
      ...data,
      certifications: {
        ...data.certifications,
        certifications: [
          ...data.certifications.certifications,
          { recordType: "I", uptdTS: new Date() },
        ],
      },
    });

    setErrors({
      ...errors,
      certifications: {
        ...errors.certifications,
        certifications: [...errors.certifications.certifications, {}],
      },
    });
  };

  const remove = (index) => () => {
    let tmpCert = data.certifications.certifications;
    let tmpErr = errors.certifications.certifications;
    if (tmpCert[index].recordType === "I") {
      tmpCert = [...tmpCert.slice(0, index), ...tmpCert.slice(index + 1)];
      tmpErr = [...tmpErr.slice(0, index), ...tmpErr.slice(index + 1)];
    } else {
      tmpCert[index].recordType = "D";
      tmpErr[index] = {};
    }

    setData({
      ...data,
      certifications: {
        ...data.certifications,
        certifications: tmpCert,
      },
    });

    setErrors({
      ...errors,
      certifications: {
        ...errors.certifications,
        certifications: tmpErr,
      },
    })
  };

  return (
    <>
      <div className={classes["title-div"]}>
        {matches && (
          <ArrowBackIcon className={classes["go-back"]} onClick={goBack} />
        )}
        <span>Certifications</span>
      </div>
      <div className={classes["section-title"]}>
        <span>{LABELS.PLACE_HOLDER.PROFESSIONAL_CERT}</span>
      </div>
      <Grid container spacing={4} justifyContent="center">
        <Grid item lg={12} xs={11}>
          <FormControlLabel
            control={
              <CustomCheckbox
                checked={!data.certifications.applicable}
                onChange={(evt, checked) => {
                  setErrors({
                    ...errors,
                    certifications: {
                      certifications:  checked
                      ? []
                      : errors.certifications.certifications.length > 0
                      ? errors.certifications.certifications
                      : [{}],
                    }
                  })

                  setData({
                    ...data,
                    certifications: {
                      applicable: !checked,
                      certifications: checked
                        ? []
                        : data.certifications.certifications.length > 0
                        ? data.certifications.certifications
                        : [{ recordType: "I", uptdTS: new Date() }],
                    },
                  });
                }}
                name="not_applicable_certification"
              />
            }
            label={LABELS.PLACE_HOLDER.NOT_APPLICABLE}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} justifyContent="center">
        <Grid item lg={12} md={12} sm={12} xs={11}>
          {data.certifications.applicable &&
            data.certifications.certifications
              .filter((cert) => cert.recordType !== "D")
              .map((cert, idx) => {
                return (
                  <div key={idx} className={classes["repeat-item"]}>
                    <Grid
                      container
                      justifyContent="space-between"
                      className={classes["field-row-container"]}
                      spacing={2}
                    >
                      <Grid
                        item
                        lg={12}
                        md={12}
                        xs={12}
                        sm={12}
                        className={classes["field"]}
                      >
                        <InputLabel className={classes["input-label"]}>
                          {LABELS.PLACE_HOLDER.CERT_EXAM_CODE}
                        </InputLabel>
                        <TextField
                          className={classes["text-field"]}
                          name={`certifications.certifications.${idx}.examCode`}
                          id={`certifications.certifications.${idx}.examCode`}
                          onChange={onInputChangeHandler(
                            `certifications.certifications.${idx}.examCode`
                          )}
                          variant="outlined"
                          placeholder={`Enter ${LABELS.PLACE_HOLDER.CERT_EXAM_CODE}`}
                          value={valueOf(
                            data,
                            `certifications.certifications.${idx}.examCode`
                          )}
                          size="small"
                          helperText={valueOf(
                            errors,
                            `certifications.certifications.${idx}.examCode`
                          )}
                        />
                      </Grid>
                      <Grid
                        item
                        lg={12}
                        md={12}
                        xs={12}
                        sm={12}
                        className="field"
                      >
                        <InputLabel className={classes["input-label"]}>
                          {LABELS.PLACE_HOLDER.TITLE}
                        </InputLabel>
                        <TextField
                          className={classes["text-field"]}
                          name={`certifications.certifications.${idx}.examTitle`}
                          id={`certifications.certifications.${idx}.examTitle`}
                          onChange={onInputChangeHandler(
                            `certifications.certifications.${idx}.examTitle`
                          )}
                          variant="outlined"
                          placeholder={`Enter ${LABELS.PLACE_HOLDER.TITLE}`}
                          value={valueOf(
                            data,
                            `certifications.certifications.${idx}.examTitle`
                          )}
                          size="small"
                          helperText={valueOf(
                            errors,
                            `certifications.certifications.${idx}.examTitle`
                          )}
                        />
                      </Grid>
                      <Grid
                        item
                        lg={12}
                        md={12}
                        xs={12}
                        sm={12}
                        className="field"
                      >
                        <InputLabel className={classes["input-label"]}>
                          {LABELS.PLACE_HOLDER.CERT_ORG_NAME}
                        </InputLabel>
                        <TextField
                          className={classes["text-field"]}
                          name={`certifications.certifications.${idx}.orgName`}
                          id={`certifications.certifications.${idx}.orgName`}
                          onChange={onInputChangeHandler(
                            `certifications.certifications.${idx}.orgName`
                          )}
                          variant="outlined"
                          placeholder={`Enter ${LABELS.PLACE_HOLDER.CERT_ORG_NAME}`}
                          value={valueOf(
                            data,
                            `certifications.certifications.${idx}.orgName`
                          )}
                          size="small"
                          helperText={valueOf(
                            errors,
                            `certifications.certifications.${idx}.orgName`
                          )}
                        />
                      </Grid>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid
                          item
                          lg={6}
                          md={6}
                          sm={6}
                          xs={12}
                          className="field"
                        >
                          <InputLabel className={classes["input-label"]}>
                            {LABELS.PLACE_HOLDER.CERT_AWARDED_ON}
                          </InputLabel>
                          <DatePicker
                            className={classes["text-field"]}
                            disableToolbar
                            autoOk={true}
                            variant="inline"
                            placeholder={`Enter ${LABELS.PLACE_HOLDER.CERT_AWARDED_ON}`}
                            openTo="year"
                            views={["year", "month"]}
                            value={
                              data.certifications.certifications[idx]
                                .certifiedDate
                                ? moment(
                                    data.certifications.certifications[idx]
                                      .certifiedDate,
                                      YEARMONTHFORMAT
                                  )
                                : null
                            }
                            onChange={(value) => {
                              const tmpCerts =
                                data.certifications.certifications;
                              tmpCerts[idx].certifiedDate =
                                moment(value).format(YEARMONTHFORMAT);
                              setData({
                                ...data,
                                certifications: {
                                  ...data.certifications,
                                  certifications: tmpCerts,
                                },
                              });
                            }}
                            size="small"
                            inputVariant="outlined"
                            helperText={valueOf(
                              errors,
                              `certifications.certifications.${idx}.certifiedDate`
                            )}
                          />
                        </Grid>
                        <Grid
                          item
                          lg={6}
                          md={6}
                          sm={6}
                          xs={12}
                          className="field"
                        >
                          <InputLabel className={classes["input-label"]}>
                            {LABELS.PLACE_HOLDER.CERT_EXPIRES_ON}
                          </InputLabel>
                          <DatePicker
                            className={classes["text-field"]}
                            disableToolbar
                            autoOk={true}
                            variant="inline"
                            placeholder={`Enter ${LABELS.PLACE_HOLDER.CERT_EXPIRES_ON}`}
                            openTo="year"
                            minDate={
                              data.certifications.certifications[idx]
                                .certifiedDate
                                ? moment(
                                    data.certifications.certifications[idx]
                                      .certifiedDate,
                                      YEARMONTHFORMAT
                                  )
                                : null
                            }
                            views={["year", "month"]}
                            value={
                              data.certifications.certifications[idx].expiryDate
                                ? moment(
                                    data.certifications.certifications[idx]
                                      .expiryDate,
                                      YEARMONTHFORMAT
                                  )
                                : null
                            }
                            onChange={(value) => {
                              const tmpCerts = data.certifications.certifications;
                              tmpCerts[idx].expiryDate =
                                moment(value).format(YEARMONTHFORMAT);
                                setData({
                                  ...data,
                                  certifications: {
                                    ...data.certifications,
                                    certifications: tmpCerts,
                                  },
                                });
                            }}
                            size="small"
                            inputVariant="outlined"
                            error={valueOf(
                              errors,
                              `certifications.certifications.${idx}.expiryDate`
                            )}
                            helperText={valueOf(
                              errors,
                              `certifications.certifications.${idx}.expiryDate`
                            )}
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </Grid>
                    {data.certifications.certifications.filter(cert => cert.recordType !== "D").length > 1 && (
                      <IconButton
                        edge="start"
                        className={classes["delete-item"]}
                        color="inherit"
                        arial-label="delete item"
                        onClick={remove(idx)}
                        size="large"
                      >
                        <Close className="delete-icon" />
                      </IconButton>
                    )}
                  </div>
                );
              })}
          {data.certifications.applicable && (
            <Grid
              container
              spacing={4}
              className={classes["field-row-container"]}
            >
              <Grid
                item
                lg={12}
                md={12}
                xs={12}
                sm={12}
                className={classes["add-more-btn-grid"]}
              >
                <Button
                  size="small"
                  className={classes["add-more-btn"]}
                  onClick={addNew}
                >
                  <AddCircleOutline />
                  Add Certificate
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      {!matches ? (
        <Grid
          container
          justifyContent="center"
          className={classes["btns-grid"]}
        >
          <Grid item lg={12} md={12} xs={11} sm={12}>
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

export default Certifications;
