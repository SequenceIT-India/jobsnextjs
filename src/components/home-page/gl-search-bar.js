import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete } from "@mui/material";
import React, { useEffect, useState } from "react";
import { EmojiRegex } from "../../util/helper";
import styles from "./gl-search-bar.module.scss";
import LocationData from "./glJobLocationOptions";
import PropTypes from "prop-types";

const stylesEx = (theme) => ({
  findBtn: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
});

const SearchBar = (props) => {
  const { classes } = props;
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [jobDetailOptions, setJobDetailOptions] = useState([]);
  const [data, setData] = useState({
    jobDetails: "",
    locationDetails: "",
  });

  const onInputChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value.replace(EmojiRegex, ""),
    });
  };

  useEffect(() => {
    setJobDetailOptions([]);
  }, []);

  return (
    <Grid container justifyContent="center" className="searchbar-row">
      <Grid item xs={12} md={10}>
        <Grid container spacing={1} className="searchbar-inputs-row">
          <Grid item md={5} xs={12} className="searchbar-input1-col">
            <Autocomplete
              name="jobDetails"
              open={jobDetailsOpen}
              options={jobDetailOptions}
              onOpen={() => {
                setJobDetailsOpen(true);
              }}
              onClose={() => {
                setJobDetailsOpen(false);
              }}
              size="small"
              fullWidth
              id="jobDetailsSearhcField"
              popupIcon={""}
              onChange={onInputChangeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="jobDetails"
                  id="jobDetailsSearhcFieldInput"
                  value={data.jobDetails}
                  className="inputwithoutRightBorder"
                  variant="outlined"
                  placeholder="Job title, Skills, or Company"
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className="icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <LocationData />
          </Grid>
          <Grid item md={"auto"} xs={12} className="findjobs-btn-col">
            <Button
              onClick={props.onFindJobsBtnHandler}
              className={`${classes.findBtn} findjobs-btn`}
            >
              Find Jobs
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

SearchBar.propTypes = {
  onFindJobsBtnHandler: PropTypes.func.isRequired,
};

export default withStyles(stylesEx)(SearchBar);
