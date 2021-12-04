import {
  CategoryOutlined,
  EmailOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Hidden,
  InputAdornment,
  OutlinedInput,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import withStyles from "@mui/styles/withStyles";
import csc from "country-state-city";
import { default as React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import JobCard from "./gl-job-card";
import JobDetailComponent from "./gl-job-detail-component";
import JobDetailHeader from "./gl-job-detail-header";
import SearchBar from "./gl-search-bar";
import TablePaginationActions from "./gl-table-pagination";
import EmailSubscriptionModal from "../modal/EmailSubscriptionModal";
import { latestJobs } from "../../data/jobs";
import {
  DoubleByteCharacters,
  EmojiRegex,
  validateField,
} from "../../util/helper";
import style from "./gl-home.module.scss";
import axios from "axios";

const styles = (theme) => ({
  jobList: {
    [theme.breakpoints.up("sm")]: {
      marginBottom: "70px",
    },
  },
  search: {
    [theme.breakpoints.up("sm")]: {
      marginBottom: "45px",
    },
  },
  subscribeForm: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "575px",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "425px",
    },
  },
  subscribeBtn: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
});
const HomeListItem = (props) => {
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState({});
  const [pageOfItems, setPageOfItems] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedJob, setSelectedJob] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cities, setCities] = useState([]);
  const [cityOpts, setCityOpts] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const auth = useSelector((stateItem) => stateItem?.["auth"]);
  const snackbar = auth?.snackbar;

  useEffect(() => {
    async function fetchGeoLocation() {
      await axios
        .get("https://geolocation-db.com/json/", {
          method: "GET",
        })
        .then((res) => {
          console.log(res?.data, "location");
          let response = JSON.stringify(res?.data);
          sessionStorage.setItem("ip", response.IPv4);
          sessionStorage.setItem("country_code", response.country_code);
        });
    }
    fetchGeoLocation();
  }, []);
  const getJobs = async () => {
    // const response = await getDefaultJobs();

    const response = await { data: latestJobs };

    if (response) {
      setJobs(response.data);
    }
  };

  useEffect(() => {
    setPage(0);
    if (jobs.length > 0) {
      setPageOfItems(jobs.slice(0, rowsPerPage));
    }
  }, [jobs, rowsPerPage]);

  useEffect(() => {
    let cts = [];
    csc &&
      csc?.getAllCountries().forEach((cntry) => {
        cts = [
          ...cts,
          ...csc.getStatesOfCountry(cntry.id).map((city) => {
            city.country = cntry.name;
            return city;
          }),
        ];
      });
    setCities(cts);
    getJobs();
  }, []);

  const handleChangePage = (evt, newPage) => {
    setPage(newPage);
    setPageOfItems(
      jobs.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + parseInt(rowsPerPage)
      )
    );
    setSelectedJob(null);
  };

  const handleChangeRowsPerPage = (evt) => {
    setPage(0);
    setRowsPerPage(parseInt(evt.target.value));
    setPageOfItems(jobs.slice(0, parseInt(evt.target.value)));
  };

  const saveJobClickHandler = () => {
    if (!sessionStorage.getItem("jobseekerIsLoggedIn")) {
      return router.push("/jobseeker/login");
    }
  };

  const applyJobClickHandler = () => {
    if (!sessionStorage.getItem("jobseekerIsLoggedIn")) {
      return router.push("/jobseeker/login");
    }
  };

  const onFindJobsBtnHandler = () => {};

  const selectJob = (job) => {
    setSelectedJob(job);
  };

  const [subscribeData, setSubsribeData] = useState({});

  const onSubscribeDataChange = (evt) => {
    const repValue = evt.target.value
      .replace(DoubleByteCharacters, "")
      .replace(EmojiRegex, "");
    setSubsribeData({ ...subscribeData, [evt.target.name]: repValue });
    setErrors({
      ...errors,
      [evt.target.name]: validateField(
        evt.target.name,
        repValue,
        evt.target.type,
        evt.target.required,
        true
      ),
    });
  };

  const subscribeBtnOnClickHandler = () => {
    setOpen(true);
  };

  const onCloseHandler = () => {
    setOpen(false);
  };

  const { classes } = props;

  return (
    <>
      <Hidden only={["xs", "sm"]}>
        <SearchBar onFindJobsBtnHandler={onFindJobsBtnHandler} />
      </Hidden>
      <Grid container className="jobseeker-home main-padded-container">
        <Grid
          item
          md={4}
          xs={12}
          className={`${
            selectedJob ? null : classes.jobList
          } desktop-left partition`}
        >
          <Typography className="page-header large" display="block">
            Latest jobs
          </Typography>
          <div className="cards">
            {pageOfItems.map((job) => (
              <>
                <Hidden only={["xs", "sm"]}>
                  <JobCard
                    selectJob={selectJob}
                    selectedJob={selectedJob}
                    saveJobClickHandler={saveJobClickHandler}
                    applyJobClickHandler={applyJobClickHandler}
                    showDeleteBtn={false}
                    isLandingPage={true}
                    job={job}
                  />
                </Hidden>
                <Hidden only={["md", "lg", "xl"]}>
                  <JobCard
                    selectJob={selectJob}
                    selectedJob={selectedJob}
                    saveJobClickHandler={saveJobClickHandler}
                    applyJobClickHandler={applyJobClickHandler}
                    showDeleteBtn={false}
                    isLandingPage={true}
                    job={job}
                    showDrawer={true}
                  />
                </Hidden>
              </>
            ))}
          </div>
          <Grid
            container
            justifyContent="flex-start"
            className="pagination-container"
          >
            <Grid item lg={12}>
              <TablePagination
                component="div"
                count={jobs.length}
                page={page}
                rowsPerPageOptions={[10, 25, 50, 100]}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </Grid>
          </Grid>
        </Grid>
        <Hidden only={["xs", "sm"]}>
          {selectedJob ? (
            <Grid item md={8} className="partition desktop-right">
              <JobDetailHeader
                job={selectedJob}
                onCloseClickHandler={() => {
                  setSelectedJob(null);
                }}
              />
              <Divider component="div" className="divider" />
              <JobDetailComponent
                job={selectedJob}
                setSelectedJob={setSelectedJob}
              />
            </Grid>
          ) : (
            ""
          )}
        </Hidden>
        <Grid
          item
          md={4}
          xs={12}
          className={`${classes.search} ${
            selectedJob ? "job-selected" : ""
          } partition desktop-right`}
        >
          <Typography className="page-header" display="block">
            Subscribe for new jobs
          </Typography>
          <Grid
            container
            spacing={2}
            className={`${classes.subscribeForm} subscribe-form`}
          >
            <Grid item xs={12} className="searchbar-input2-col">
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                error={errors.category}
              >
                <OutlinedInput
                  name="category"
                  id="search-category"
                  onChange={onSubscribeDataChange}
                  className="inputwithoutRightBorder"
                  value={subscribeData.category}
                  required
                  type="text"
                  placeholder="Skill or Job Title"
                  startAdornment={
                    <InputAdornment position="start">
                      <CategoryOutlined className="icon" />
                    </InputAdornment>
                  }
                />
                {errors.category ? (
                  <FormHelperText id="search-email-text">
                    {errors.category}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} className="searchbar-input2-col">
              <FormControl fullWidth variant="outlined" size="small">
                <Autocomplete
                  name="locationDetails"
                  id="search-location-auto"
                  className="inputwithoutRightBorder"
                  required
                  options={cityOpts}
                  getOptionLabel={(option) =>
                    `${option.name}, ${option.country}`
                  }
                  type="text"
                  size="small"
                  placeholder="City, Country"
                  onInputChange={(evt, value) => {
                    setCityOpts(
                      cities.filter((ct) =>
                        ct.name.toLowerCase().includes(value.toLowerCase())
                      )
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="locationDetails"
                      variant="outlined"
                      id="search-location"
                      className="inputwithoutRightBorder"
                      required
                      placeholder="City, Country"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnOutlined className="icon" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} className="searchbar-input2-col">
              <FormControl
                fullWidth
                variant="outlined"
                size="small"
                error={errors.email}
              >
                <OutlinedInput
                  name="email"
                  id="search-email"
                  onChange={onSubscribeDataChange}
                  className="inputwithoutRightBorder"
                  value={subscribeData.email}
                  required
                  type="email"
                  placeholder="Email"
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailOutlined className="icon" />
                    </InputAdornment>
                  }
                />
                {errors.email ? (
                  <FormHelperText id="search-email-text">
                    {errors.email}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} className="findjobs-btn-col">
              <Button
                onClick={subscribeBtnOnClickHandler}
                className={`${classes.subscribeBtn} subscribe-btn`}
              >
                Subscribe
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                display="block"
                xs={12}
                align="left"
              >
                {" "}
                By creating a job alert, you agree to our Terms. You can change
                your consent settings at any time by unsubscribing or as
                detailed in our terms.{" "}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <EmailSubscriptionModal
        title={"Manage Email Subscription"}
        open={open}
        handleClose={onCloseHandler}
      />
    </>
  );
};

export default withStyles(styles)(HomeListItem);
