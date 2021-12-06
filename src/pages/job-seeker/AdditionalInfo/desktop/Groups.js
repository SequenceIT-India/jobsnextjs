import {
  Grid,
  Button,
  IconButton,
  InputLabel,
  TextField,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect } from "react";
import classes from "./JsAdditionalInfo.module.scss";
import { LABELS } from "../../../../util/additional-info-labels";
import "date-fns";
import moment from "moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { AddCircleOutline, Close } from "@mui/icons-material";
import DateFnsUtils from "@date-io/date-fns";
import { CustomCheckbox } from "../../../../util/CustomInputField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { updateAdditionalInfoGrpsMember } from "../../../../service/profile";
import { YEARMONTHFORMAT } from "../../../../util/constants";

const Groups = ({
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
    const tmpGrps = data.grpsmembered.map((loc) => {
      return loc.recordType !== "D" && loc.recordType !== "I"
        ? { ...loc, recordType: "U" }
        : loc;
    });
    setData({
      ...data,
      grpsmembered: tmpGrps
    });
  }, []);
  
  const submit = async () => {
    const response = await updateAdditionalInfoGrpsMember({
      grpsmembered: data.grpsmembered,
      emailId: sessionStorage.getItem("email"),
    });

    if (response.code === "1009") {
      const tmpAwards = data.grpsmembered
        .filter((loc) => loc.recordType !== "D")
        .map((loc) => {
          return { ...loc, recordType: "U" };
        });
      setData({
        ...data,
        grpsmembered: tmpAwards,
      });
      next();
    }
  };

  const addNew = () => {
    setData({
      ...data,
      grpsmembered: [...data.grpsmembered, { recordType: "I", uptdTS: new Date(), oldAwardTitle: null, oldAwardedDate: null}],
    });

    setErrors({
      ...errors,
      grpsmembered: [...errors.grpsmembered, {}],
    });
  };

  const remove = (index) => () => {
    let tmpAwards = data.grpsmembered;
    let tmpErr = errors.grpsmembered;
    if (tmpAwards[index].recordType === "I") {
      tmpAwards = [...tmpAwards.slice(0, index), ...tmpAwards.slice(index + 1)];
      tmpErr = [...tmpErr.slice(0, index), ...tmpErr.slice(index + 1)];
    } else {
      tmpAwards[index].recordType = "D";
      tmpErr[index] = {};
    }

    setData({
      ...data,
      grpsmembered: tmpAwards,
    });

    setErrors({
      ...errors,
      grpsmembered: tmpErr,
    });
  };



  return (
    <>
      <div className={classes["title-div"]}>
        {matches && (
          <ArrowBackIcon className={classes["go-back"]} onClick={goBack} />
        )}
        <span>{LABELS.PLACE_HOLDER.GROUPS_MEMBERED}</span>
      </div>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item lg={12} md={12} sm={12} xs={11}>
          {data.grpsmembered.map((grp, idx) => {
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
                      name={`grpsmembered.${idx}.groupsMemName`}
                      id={`grpsmembered.${idx}.groupsMemName`}
                      onChange={onInputChangeHandler(
                        `grpsmembered.${idx}.groupsMemName`
                      )}
                      InputProps={{
                        className: classes["text_field"],
                      }}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.TITLE}`}
                      value={valueOf(data, `grpsmembered.${idx}.groupsMemName`)}
                      size="small"
                      helperText={valueOf(
                        errors,
                        `grpsmembered.${idx}.groupsMemName`
                      )}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12} className="field">
                    <InputLabel className={classes["input-label"]}>
                      {LABELS.PLACE_HOLDER.GROUPS_MEMBERED_URL}
                    </InputLabel>
                    <TextField
                      className={classes["text-field"]}
                      name={`grpsmembered.${idx}.url`}
                      id={`grpsmembered.${idx}.url`}
                      onChange={onInputChangeHandler(
                        `grpsmembered.${idx}.url`
                      )}
                      InputProps={{
                        className: classes["text_field"],
                      }}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.GROUPS_MEMBERED_URL}`}
                      value={valueOf(data, `grpsmembered.${idx}.url`)}
                      size="small"
                      helperText={valueOf(errors, `grpsmembered.${idx}.url`)}
                      inputProps={{
                        maxLength: 250,
                      }}
                    />
                  </Grid>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={12} sm={6} className="field">
                      <InputLabel className={classes["input-label"]}>
                        {LABELS.PLACE_HOLDER.FROM}
                      </InputLabel>
                      <DatePicker
                        className={classes["text-field"]}
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        openTo="year"
                        views={["year", "month"]}
                        placeholder={`Enter ${LABELS.PLACE_HOLDER.FROM}`}
                        value={
                          data.grpsmembered[idx].fromDate
                            ? moment(
                                data.grpsmembered[idx].fromDate,
                                YEARMONTHFORMAT
                              )
                            : null
                        }
                        onChange={(value) => {
                          const tmpGroups = data.grpsmembered;
                          tmpGroups[idx].fromDate =
                            moment(value).format(YEARMONTHFORMAT);
                          setData({ ...data, grpsmembered: tmpGroups });
                        }}
                        size="small"
                        inputVariant="outlined"
                        helperText={valueOf(
                          errors,
                          `grpsmembered.${idx}.fromDate`
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} className="field">
                      <InputLabel className={classes["input-label"]}>
                        {LABELS.PLACE_HOLDER.TO}
                      </InputLabel>
                      <DatePicker
                        className={classes["text-field"]}
                        disableToolbar
                        autoOk={true}
                        variant="inline"
                        placeholder={`Enter ${LABELS.PLACE_HOLDER.TO}`}
                        openTo="year"
                        views={["year", "month"]}
                        value={
                          data.grpsmembered[idx].toDate
                            ? moment(data.grpsmembered[idx].toDate, YEARMONTHFORMAT)
                            : null
                        }
                        onChange={(value) => {
                          const tmpGroups = data.grpsmembered;
                          tmpGroups[idx].toDate =
                            moment(value).format(YEARMONTHFORMAT);
                          setData({ ...data, grpsmembered: tmpGroups });
                        }}
                        minDate={
                          data.grpsmembered[idx].fromDate
                            ? moment(
                                data.grpsmembered[idx].fromDate,
                                YEARMONTHFORMAT
                              )
                            : null
                        }
                        size="small"
                        inputVariant="outlined"
                        helperText={valueOf(
                          errors,
                          `grpsmembered.${idx}.toDate`
                        )}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                  <Grid item xs={12} className="field-row">
                    <Grid
                      container
                      spacing={2}
                      justifyContent="space-between"
                      className={classes["field-row-container"]}
                    >
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                          control={
                            <CustomCheckbox
                              checked={data.grpsmembered[idx].activeMember}
                              onChange={(evt, checked) => {
                                const tmpGroups = data.grpsmembered;
                                tmpGroups[idx].activeMember = checked;
                                if (checked) {
                                  tmpGroups[idx].toDate = null;
                                }
                                setData({
                                  ...data,
                                  grpsmembered: tmpGroups,
                                });
                              }}
                              name="alerts"
                            />
                          }
                          label={LABELS.PLACE_HOLDER.GROUPS_MEMBERED_ACTIVE}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} className="field">
                    <InputLabel className={classes["input-label"]}>
                      {LABELS.PLACE_HOLDER.DESCRIPTION}
                    </InputLabel>
                    <TextField
                      className={classes["text-field"]}
                      name={`grpsmembered.${idx}.description`}
                      id={`grpsmembered.${idx}.description`}
                      onChange={onInputChangeHandler(
                        `grpsmembered.${idx}.description`
                      )}
                      variant="outlined"
                      placeholder={`Enter ${LABELS.PLACE_HOLDER.DESCRIPTION}`}
                      value={valueOf(
                        data,
                        `grpsmembered.${idx}.description`
                      )}
                      size="small"
                      multiline
                      rows={4}
                      helperText={valueOf(
                        errors,
                        `grpsmembered.${idx}.description`
                      )}
                    />
                  </Grid>
                </Grid>
                {data.grpsmembered.length > 1 && (
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
            <Grid item sm={3} xs={6} className={classes["add-more-btn-grid"]}>
              <Button
                size="small"
                className={classes["add-more-btn"]}
                onClick={addNew}
              >
                <AddCircleOutline />
                Add Group
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

export default Groups;
