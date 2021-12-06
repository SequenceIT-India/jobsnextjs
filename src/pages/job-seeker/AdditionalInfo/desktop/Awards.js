import { Grid, Button, IconButton, InputLabel, TextField } from "@mui/material";
import React, { useEffect } from "react";
import classes from "./JsAdditionalInfo.module.scss";
import { LABELS } from "../../../../util/additional-info-labels";
import "date-fns";
import moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { AddCircleOutline, Close } from "@mui/icons-material";
import DateFnsUtils from "@date-io/date-fns";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { updateAdditionalInfoAwards } from "../../../../service/profile";
import { YEARMONTHFORMAT } from "../../../../util/constants";

const Awards = ({
  data,
  onInputChangeHandler,
  errors,
  setData,
  setErrors,
  valueOf,
  value,
  previous,
  next,
  goBack,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.only("xs"));

  useEffect(() => {
    const tmpAwards = data.awards.map((loc) => {
      return loc.recordType !== "D" && loc.recordType !== "I"
        ? { ...loc, recordType: "U" }
        : loc;
    });
    setData({
      ...data,
      awards: tmpAwards
    });
  }, []);

  const submit = async () => {
    const response = await updateAdditionalInfoAwards({
      awards: data.awards,
      emailId: sessionStorage.getItem("email"),
    });

    if (response.code === "1009") {
      const tmpAwards = data.awards
        .filter((loc) => loc.recordType !== "D")
        .map((loc) => {
          return { ...loc, recordType: "U" };
        });
      setData({
        ...data,
        awards: tmpAwards,
      });
      next();
    }
  };

  const addNew = () => {
    setData({
      ...data,
      awards: [...data.awards, { recordType: "I", uptdTS: new Date(), oldAwardTitle: null, oldAwardedDate: null}],
    });

    setErrors({
      ...errors,
      awards: [...errors.awards, {}],
    });
  };

  const remove = (index) => () => {
    let tmpAwards = data.awards;
    let tmpErr = errors.awards;
    if (tmpAwards[index].recordType === "I") {
      tmpAwards = [...tmpAwards.slice(0, index), ...tmpAwards.slice(index + 1)];
      tmpErr = [...tmpErr.slice(0, index), ...tmpErr.slice(index + 1)];
    } else {
      tmpAwards[index].recordType = "D";
      tmpErr[index] = {};
    }

    setData({
      ...data,
      awards: tmpAwards,
    });

    setErrors({
      ...errors,
      awards: tmpErr,
    });
  };

  return (
    <>
      <div className={classes["title-div"]}>
        {matches && (
          <ArrowBackIcon className={classes["go-back"]} onClick={goBack} />
        )}
        <span>{LABELS.PLACE_HOLDER.AWARDS}</span>
      </div>
      <Grid container spacing={4} justifyContent="center">
        <Grid item lg={12} md={12} xs={11} sm={12}>
          {data.awards.map((award, idx) => {
            return (
              <div key={idx} className={classes["repeat-item"]}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  className={classes["field-row-container"]}
                >
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className={classes["field"]}
                  >
                    <InputLabel className={classes["input-label"]}>
                      {LABELS.PLACE_HOLDER.TITLE}
                    </InputLabel>
                    <TextField
                      className={classes["text-field"]}
                      name={`awards.${idx}.awardTitle`}
                      id={`awards.${idx}.awardTitle`}
                      onChange={onInputChangeHandler(
                        `awards.${idx}.awardTitle`
                      )}
                      InputProps={{
                        className: classes["text_field"],
                      }}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.TITLE}`}
                      value={valueOf(data, `awards.${idx}.awardTitle`)}
                      size="small"
                      helperText={valueOf(errors, `awards.${idx}.awardTitle`)}
                    />
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item lg={5} xs={12} sm={6} md={6}>
                      <InputLabel className={classes["input-label"]}>
                        {LABELS.PLACE_HOLDER.CERT_AWARDED_ON}
                      </InputLabel>
                      <DatePicker
                        className={classes["text-field"]}
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        openTo="year"
                        views={["year", "month"]}
                        placeholder={`Enter ${LABELS.PLACE_HOLDER.CERT_AWARDED_ON}`}
                        value={
                          data.awards[idx].awardDate
                            ? moment(data.awards[idx].awardDate, YEARMONTHFORMAT)
                            : null
                        }
                        onChange={(value) => {
                          const tmpCerts = data.awards;
                          tmpCerts[idx].awardDate =
                            moment(value).format(YEARMONTHFORMAT);
                          setData({ ...data, awards: tmpCerts });
                        }}
                        size="small"
                        inputVariant="outlined"
                        helperText={valueOf(errors, `awards.${idx}.awardDate`)}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Grid item lg={12} md={12} xs={12} sm={12}>
                    <InputLabel className={classes["input-label"]}>
                      {LABELS.PLACE_HOLDER.AWARDED_BY}
                    </InputLabel>
                    <TextField
                      InputProps={{
                        className: classes["text_field"],
                      }}
                      className={classes["text-field"]}
                      name={`awards.${idx}.awardedBy`}
                      id={`awards.${idx}.awardedBy`}
                      onChange={onInputChangeHandler(`awards.${idx}.awardedBy`)}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.AWARDED_BY}`}
                      value={valueOf(data, `awards.${idx}.awardedBy`)}
                      size="small"
                      helperText={valueOf(errors, `awards.${idx}.awardedBy`)}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <InputLabel className={classes["input-label"]}>
                      {LABELS.PLACE_HOLDER.DESCRIPTION}
                    </InputLabel>
                    <TextField
                      className={classes["text-field"]}
                      name={`awards.${idx}.description`}
                      id={`awards.${idx}.description`}
                      onChange={onInputChangeHandler(
                        `awards.${idx}.description`
                      )}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.DESCRIPTION}`}
                      value={valueOf(data, `awards.${idx}.description`)}
                      size="small"
                      multiline
                      rows={4}
                      helperText={valueOf(errors, `awards.${idx}.description`)}
                    />
                  </Grid>
                </Grid>
                {data.awards.length > 1 && (
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
          <Grid
            container
            spacing={4}
            className={classes["field-row-container"]}
          >
            <Grid
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className={classes["add-more-btn-grid"]}
            >
              <Button
                size="small"
                className={classes["add-more-btn"]}
                onClick={addNew}
              >
                <AddCircleOutline />
                Add Award
              </Button>
            </Grid>
          </Grid>
        </Grid>
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

export default Awards;
