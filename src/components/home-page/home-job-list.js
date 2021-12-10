import {
  CategoryOutlined,
  EmailOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";

import makeStyles from "@mui/styles/makeStyles";
import Link from 'next/link'
import CssBaseline from '@material-ui/core/CssBaseline';
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
import csc, { Country, State, City } from "country-state-city";
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

const styles = makeStyles((theme) => ({
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
}));

const HomeListItem = (props) => {
  const router = useRouter();
  const jobs = props.jobs || [];
  const selectedJob = props.selectedJob || props.jd;
  const [errors, setErrors] = useState({});
  const [pageOfItems, setPageOfItems] = useState([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cities, setCities] = useState([]);
  const [cityOpts, setCityOpts] = useState([]);
  const [open, setOpen] = useState(false);




  useEffect(() => {
    setPage(0);
    if (jobs.length > 0) {
      setPageOfItems(jobs.slice(0, rowsPerPage));
    }
  }, [jobs, rowsPerPage]);

  useEffect(() => {
    let cts = [];

    setCities([]);
  }, []);


  const selectJob = props.selectJob;
  const handleChangePage = (evt, newPage) => {
    setPage(newPage);
    setPageOfItems(
      jobs.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + parseInt(rowsPerPage)
      )
    );
    selectJob(null);
  };

  const handleChangeRowsPerPage = (evt) => {
    setPage(0);
    setRowsPerPage(parseInt(evt.target.value));
    setPageOfItems(jobs.slice(0, parseInt(evt.target.value)));
  };

  const saveJobClickHandler = () => {
    if (!sessionStorage.getItem("jobseekerIsLoggedIn")) {
      return history.push("/jobseeker/login");
    }
  };

  const applyJobClickHandler = () => {
    if (!sessionStorage.getItem("jobseekerIsLoggedIn")) {
      return history.push("/jobseeker/login");
    }
  };

  const onFindJobsBtnHandler = () => { };



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
  const classes = styles()


  return (
    <>
      <CssBaseline />
      <Hidden only={["xs", "sm"]}>
        <SearchBar onFindJobsBtnHandler={onFindJobsBtnHandler} />
      </Hidden>
      <main>
        <Grid container className="jobseeker-home main-padded-container">
          <Grid
            item
            md={4}
            xs={12}

          >
            <Typography className="page-header large" display="block">
              Latest jobs
            </Typography>
            <div className="cards">
              {jobs && jobs?.map((job) => (
                <Link href={`/jobdetail/${job.jobID}`} key={job.jobID} prefetch={false}>
                  <a key={job.jobID}>
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
                  </a>
                </Link>

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
                  count={jobs?.length || 0}
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
          {selectedJob && Object.keys(selectedJob).length ? (
            <Grid item md={8} className="partition desktop-right">
              <JobDetailHeader
                job={selectedJob}
                onCloseClickHandler={() => {
                  router.push(`/`, undefined, { shallow: false });
                }}
              />
              <Divider component="div" className="divider" />
              <JobDetailComponent
                job={selectedJob}
              />
            </Grid>
          ) : null}
          <Grid
            item
            md={4}
            xs={12}
            className={`${classes.search} ${selectedJob ? 'job-selected' : ""
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
                  error={errors?.category}
                >
                  <OutlinedInput
                    name="category"
                    id="search-category"
                    onChange={onSubscribeDataChange}
                    className="inputwithoutRightBorder"
                    value={subscribeData?.category}
                    required
                    type="text"
                    placeholder="Skill or Job Title"

                  />
                  {errors?.category ? (
                    <FormHelperText id="search-email-text">
                      {errors?.category}
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} className="searchbar-input2-col">
                {/* <FormControl fullWidth variant="outlined" size="small">
                  <Autocomplete
                    name="locationDetails"
                    id="search-location-auto"
                    className="inputwithoutRightBorder"
                    required
                    options={cityOpts}
                    getOptionLabel={(option) =>
                      `${option?.name}, ${option?.country}`
                    }
                    type="text"
                    size="small"
                    placeholder="City, Country"
                    onInputChange={(evt, value) => {
                      setCityOpts(
                        cities?.filter((ct) =>
                          ct?.name?.toLowerCase().includes(value?.toLowerCase())
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

                        }}
                      />
                    )}
                  />
                </FormControl> */}
              </Grid>
              <Grid item xs={12} className="searchbar-input2-col">
                <FormControl
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={errors?.email}
                >
                  <OutlinedInput
                    name="email"
                    id="search-email"
                    onChange={onSubscribeDataChange}
                    className="inputwithoutRightBorder"
                    value={subscribeData?.email}
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
                      {errors?.email}
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
      </main>
    </>
  );
};
export default withStyles(styles)(HomeListItem);
