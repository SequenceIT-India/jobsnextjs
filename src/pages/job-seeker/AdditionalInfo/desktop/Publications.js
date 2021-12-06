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
import { updateAdditionalInfoPublications } from "../../../../service/profile";
import { YEARMONTHFORMAT } from "../../../../util/constants";

const Publications = ({
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
    const tmpAwards = data.publications.map((loc) => {
      return loc.recordType !== "D" && loc.recordType !== "I"
        ? { ...loc, recordType: "U" }
        : loc;
    });
    setData({
      ...data,
      publications: tmpAwards
    });
  }, []);

  const submit = async () => {
    const response = await updateAdditionalInfoPublications({
      publications: data.publications,
      emailId: sessionStorage.getItem("email"),
    });

    if (response.code === "1009") {
      const tmpAwards = data.publications
        .filter((loc) => loc.recordType !== "D")
        .map((loc) => {
          return { ...loc, recordType: "U" };
        });
      setData({
        ...data,
        publications: tmpAwards,
      });
      next();
    }
  };

  const addNew = () => {
    setData({
      ...data,
      publications: [...data.publications, { recordType: "I", uptdTS: new Date(), oldAwardTitle: null, oldAwardedDate: null}],
    });

    setErrors({
      ...errors,
      publications: [...errors.publications, {}],
    });
  };

  const remove = (index) => () => {
    let tmpAwards = data.publications;
    let tmpErr = errors.publications;
    if (tmpAwards[index].recordType === "I") {
      tmpAwards = [...tmpAwards.slice(0, index), ...tmpAwards.slice(index + 1)];
      tmpErr = [...tmpErr.slice(0, index), ...tmpErr.slice(index + 1)];
    } else {
      tmpAwards[index].recordType = "D";
      tmpErr[index] = {};
    }

    setData({
      ...data,
      publications: tmpAwards,
    });

    setErrors({
      ...errors,
      publications: tmpErr,
    });
  };


  return (
    <>
      <div className={classes["title-div"]}>
        {matches && (
          <ArrowBackIcon className={classes["go-back"]} onClick={goBack} />
        )}
        <span>{LABELS.PLACE_HOLDER.PUBLICATIONS}</span>
      </div>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={12} md={12} xs={11} sm={12}>
          {data.publications.map((pub, idx) => {
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
                      name={`publications.${idx}.title`}
                      id={`publications.${idx}.title`}
                      onChange={onInputChangeHandler(
                        `publications.${idx}.title`
                      )}
                      InputProps={{
                        className: classes["text_field"],
                      }}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.TITLE}`}
                      value={valueOf(data, `publications.${idx}.title`)}
                      size="small"
                      helperText={valueOf(errors, `publications.${idx}.title`)}
                      inputProps={{
                        maxLength: 150,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className="field">
                    <InputLabel className={classes["input-label"]}>
                      {LABELS.PLACE_HOLDER.PUBLICATIONS_URL}
                    </InputLabel>
                    <TextField
                      InputProps={{
                        className: classes["text_field"],
                      }}
                      className={classes["text-field"]}
                      name={`publications.${idx}.url`}
                      id={`publications.${idx}.url`}
                      onChange={onInputChangeHandler(`publications.${idx}.url`)}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.PUBLICATIONS_URL}`}
                      value={valueOf(data, `publications.${idx}.url`)}
                      size="small"
                      helperText={valueOf(errors, `publications.${idx}.url`)}
                    />
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={12} className="field">
                      <InputLabel className={classes["input-label"]}>
                        {LABELS.PLACE_HOLDER.PUBLICATIONS_DATE}
                      </InputLabel>
                      <DatePicker
                        className={classes["text-field"]}
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        placeholder={`Enter ${LABELS.PLACE_HOLDER.PUBLICATIONS_DATE}`}
                        openTo="year"
                        views={["year", "month"]}
                        value={
                          data.publications[idx].publicationDate
                            ? moment(
                                data.publications[idx].publicationDate,
                                YEARMONTHFORMAT
                              )
                            : null
                        }
                        onChange={(value) => {
                          const tmpPubs = data.publications;
                          tmpPubs[idx].publicationDate =
                            moment(value).format(YEARMONTHFORMAT);
                          setData({ ...data, publications: tmpPubs });
                        }}
                        size="small"
                        inputVariant="outlined"
                        helperText={valueOf(
                          errors,
                          `publications.${idx}.publicationDate`
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
                      name={`publications.${idx}.description`}
                      id={`publications.${idx}.description`}
                      onChange={onInputChangeHandler(
                        `publications.${idx}.description`
                      )}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.DESCRIPTION}`}
                      value={valueOf(data, `publications.${idx}.description`)}
                      size="small"
                      multiline
                      rows={4}
                      helperText={valueOf(
                        errors,
                        `publications.${idx}.description`
                      )}
                    />
                  </Grid>
                </Grid>
                {data.publications.length > 1 && (
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
                Add Publication
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
          <Grid item lg={12} xs={11} md={12} sm={12}>
            <Button
              disabled={value === 0}
              variant="outlined"
              className={classes["previous-btn"]}
              onClick={previous}
              size="small"
            >
              Previous
            </Button>
            <Button
              disabled={value === 6}
              variant="outlined"
              className={classes["next-btn"]}
              onClick={next}
              size="small"
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

export default Publications;
