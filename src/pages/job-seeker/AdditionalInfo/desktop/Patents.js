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
import { updateAdditionalInfoPatents } from "../../../../service/profile";
import { YEARMONTHFORMAT } from "../../../../util/constants";

const Patents = ({
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
    const tmpAwards = data.patents.map((loc) => {
      return loc.recordType !== "D" && loc.recordType !== "I"
        ? { ...loc, recordType: "U" }
        : loc;
    });
    setData({
      ...data,
      patents: tmpAwards
    });
  }, []);

  const submit = async () => {
    const response = await updateAdditionalInfoPatents({
      patents: data.patents,
      emailId: sessionStorage.getItem("email"),
    });

    if (response.code === "1009") {
      const tmpAwards = data.patents
        .filter((loc) => loc.recordType !== "D")
        .map((loc) => {
          return { ...loc, recordType: "U" };
        });
      setData({
        ...data,
        patents: tmpAwards,
      });
      next();
    }
  };

  const addNew = () => {
    setData({
      ...data,
      patents: [...data.patents, { recordType: "I", uptdTS: new Date(), oldAwardTitle: null, oldAwardedDate: null}],
    });

    setErrors({
      ...errors,
      patents: [...errors.patents, {}],
    });
  };

  const remove = (index) => () => {
    let tmpAwards = data.patents;
    let tmpErr = errors.patents;
    if (tmpAwards[index].recordType === "I") {
      tmpAwards = [...tmpAwards.slice(0, index), ...tmpAwards.slice(index + 1)];
      tmpErr = [...tmpErr.slice(0, index), ...tmpErr.slice(index + 1)];
    } else {
      tmpAwards[index].recordType = "D";
      tmpErr[index] = {};
    }

    setData({
      ...data,
      patents: tmpAwards,
    });

    setErrors({
      ...errors,
      patents: tmpErr,
    });
  };



  return (
    <>
      <div className={classes["title-div"]}>
        {matches && (
          <ArrowBackIcon className={classes["go-back"]} onClick={goBack} />
        )}
        <span>{LABELS.PLACE_HOLDER.PATENTS}</span>
      </div>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={11}>
          {data.patents.map((ptnt, idx) => {
            return (
              <div className={classes["repeat-item"]}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  className={classes["field-row-container"]}
                >
                  <Grid item xs={12} className={classes["field"]}>
                    <InputLabel className={classes["input-label"]}>
                      {LABELS.PLACE_HOLDER.TITLE}
                    </InputLabel>
                    <TextField
                      className={classes["text-field"]}
                      name={`patents.${idx}.title`}
                      id={`patents.${idx}.title`}
                      InputProps={{
                        className: classes["text_field"],
                      }}
                      onChange={onInputChangeHandler(`patents.${idx}.title`)}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.TITLE}`}
                      value={valueOf(data, `patents.${idx}.title`)}
                      size="small"
                      helperText={valueOf(errors, `patents.${idx}.title`)}
                      inputProps={{
                        maxLength: 150,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className="field">
                    <InputLabel className={classes["input-label"]}>
                      {LABELS.PLACE_HOLDER.PATENT_NUMBER}
                    </InputLabel>
                    <TextField
                      className={classes["text-field"]}
                      name={`patents.${idx}.patentNum`}
                      id={`patents.${idx}.patentNum`}
                      onChange={onInputChangeHandler(
                        `patents.${idx}.patentNum`
                      )}
                      InputProps={{
                        className: classes["text_field"],
                      }}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.PATENT_NUMBER}`}
                      value={valueOf(data, `patents.${idx}.patentNum`)}
                      size="small"
                      helperText={valueOf(errors, `patents.${idx}.patentNum`)}
                      inputProps={{
                        maxLength: 75,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className="field">
                    <InputLabel className={classes["input-label"]}>
                      {LABELS.PLACE_HOLDER.PATENT_URL}
                    </InputLabel>
                    <TextField
                      InputProps={{
                        className: classes["text_field"],
                      }}
                      name={`patents.${idx}.url`}
                      className={classes["text-field"]}
                      id={`patents.${idx}.url`}
                      onChange={onInputChangeHandler(`patents.${idx}.url`)}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.PATENT_URL}`}
                      value={valueOf(data, `patents.${idx}.url`)}
                      size="small"
                      helperText={valueOf(errors, `patents.${idx}.url`)}
                    />
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={12} className="field">
                      <InputLabel className={classes["input-label"]}>
                        {LABELS.PLACE_HOLDER.PATENT_DATE}
                      </InputLabel>
                      <DatePicker
                        disableToolbar
                        className={classes["text-field"]}
                        autoOk={true}
                        variant="inline"
                        placeholder={`Enter ${LABELS.PLACE_HOLDER.PATENT_DATE}`}
                        openTo="year"
                        views={["year", "month"]}
                        value={
                          data.patents[idx].patentDate
                            ? moment(data.patents[idx].patentDate, YEARMONTHFORMAT)
                            : null
                        }
                        onChange={(value) => {
                          const tmpPatents = data.patents;
                          tmpPatents[idx].patentDate =
                            moment(value).format(YEARMONTHFORMAT);
                          setData({ ...data, patents: tmpPatents });
                        }}
                        size="small"
                        inputVariant="outlined"
                        helperText={valueOf(
                          errors,
                          `patents.${idx}.patentDate`
                        )}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Grid item xs={12} className="field">
                    <InputLabel className={classes["input-label"]}>
                      {LABELS.PLACE_HOLDER.DESCRIPTION}
                    </InputLabel>
                    <TextField
                      className={classes["text-field"]}
                      name={`patents.${idx}.description`}
                      id={`patents.${idx}.description`}
                      onChange={onInputChangeHandler(
                        `patents.${idx}.description`
                      )}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.DESCRIPTION}`}
                      value={valueOf(data, `patents.${idx}.description`)}
                      size="small"
                      multiline
                      rows={4}
                      helperText={valueOf(errors, `patents.${idx}.description`)}
                    />
                  </Grid>
                </Grid>
                {data.patents.length > 1 && (
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
            justifyContent="flex-end"
            className={classes["field-row-container"]}
          >
            <Grid
              item
              sm={12}
              xs={12}
              md={12}
              lg={12}
              className={classes["add-more-btn-grid"]}
            >
              <Button
                size="small"
                className={classes["add-more-btn"]}
                onClick={addNew}
              >
                <AddCircleOutline />
                Add Patent
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
          <Grid item lg={12} xs={11}>
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

export default Patents;
