import React from "react";
import { Link } from "next/link";
import { Chip, Divider, Grid, IconButton, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import classes from "./JsAlerts.module.scss";
import { alerts } from "./AlertsData";
import CustomSwitch from "../../../components/switch/CustomSwitch";

const JsAlerts = () => {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        className={classes["alerts-grid"]}
      >
        <Grid item lg={6} xs={12}>
          <div className={classes["routing-and-action-btns"]}>
            <div className={classes.title}>
              <Link className={classes.link} to="/jobseeker/homepage">
                Home
              </Link>
              <ArrowForwardIosIcon className={classes["forward-arrow-icon"]} />
              <span className={classes["section-title"]}>Alerts</span>
            </div>
          </div>
          <Divider className={classes.divider} />
          <div className={classes["alerts-div"]}>
            {alerts.map((alert) => (
              <div key={alert.id}>
                <div className={classes.alert}>
                  <div className={classes["alert-data"]}>
                    <div className={classes["alert-details-div"]}>
                      <div className={classes["alert-name-div"]}>
                        <span className={classes["alert-name"]}>
                          {alert.alertName}
                        </span>
                        <EditIcon className={classes.editIcon} />
                      </div>
                      <div className={classes["location-div"]}>
                        <Chip
                          variant="outlined"
                          label={alert.role}
                          className={classes["chip"]}
                        />
                        <Chip
                          variant="outlined"
                          label={`${alert.city}, ${alert.state}`}
                          className={classes["chip"]}
                        />
                      </div>
                    </div>
                    <div className={classes["alert-actions-div"]}>
                      <div className={classes["switch"]}>
                        <CustomSwitch />
                        <span className={classes.time}>
                          Updated: {alert.updatedDate}
                        </span>
                      </div>
                      <div className={classes["date-range"]}>
                        <div className={classes["daily"]}>
                          <Button
                            variant={alert.daily ? "contained" : "outlined"}
                            className={
                              alert.daily ? classes.contained : classes.outlined
                            }
                          >
                            <TodayIcon className={classes.rangeIcon} />
                            <span className={classes.range}>Daily</span>
                          </Button>
                        </div>
                        <div className={classes["weekly"]}>
                          <Button
                            variant={!alert.daily ? "contained" : "outlined"}
                            className={
                              !alert.daily
                                ? classes.contained
                                : classes.outlined
                            }
                          >
                            <DateRangeIcon className={classes.rangeIcon} />
                            <span className={classes.range}>Weekly</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes["delete-icon-div"]}>
                    <IconButton size="large">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
                <Divider className={classes.divider} />
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default JsAlerts;
