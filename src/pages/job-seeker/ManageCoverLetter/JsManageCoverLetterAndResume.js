import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, Grid } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ContentState, EditorState } from "draft-js";

import classes from "./JsManageCoverLetter.module.scss";

import ManageCoverLetterData from "./ManageCoverLetterData";
import ManageResumesData from "./ManageResumesData";
import { coverLetters, resumes } from "./Data";
import CreateCoverLetterModal from "../../../components/modal/CreateCoverLetterModal";
import ConfirmationModal from "../../../components/modal/ConfirmationModal";
import { validateField, getDate } from "../../../util/helper";
import ViewCoverLetterModal from "../../../components/modal/ViewCoverLetterModal";
import UploadResumeModal from "../../../components/modal/UploadResumeModal";
import { getUserResume } from "../../../service/profile";

const JsManageCoverLetterAndResume = () => {
  const [rows, setRows] = useState(coverLetters);
  const [value, setValue] = useState("");
  const [deleteResume, setDeleteResume] = useState(null);
  const [resumeValue, setResumeValue] = useState("");
  const [resumeRows, setResumeRows] = useState(resumes);
  const [coverLetterModalIsOpen, setCoverLetterModalIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteCoverLetter, setDeleteCoverLetter] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [errors, setErrors] = useState({});
  const [viewCoverLetterModalIsOpen, setViewCoverLetterModalIsOpen] =
    useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [coverLetter, setCoverLetter] = useState("");
  const [id, setId] = useState(null);
  const [resumeModal, setResumeModal] = useState(false);
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState(null);
  const [names, setNames] = useState({
    coverLetterName: "",
    resumeName: "",
  });

  const getResume = async () => {
    const response = await getUserResume(sessionStorage.getItem("email"));
    setResume(response);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const editClickHandler = () => {
    setIsDisabled(false);
  };

  const updateCoverLetter = (id) => {
    const coverLetters = [...rows];
    coverLetters[id] = {
      sno: id,
      cLName: names.coverLetterName,
      lastModified: getDate(),
    };
    setRows(coverLetters);
    setViewCoverLetterModalIsOpen(false);
  };

  useEffect(() => {
    let unique = rows.some((item) => names.coverLetterName === item.cLName);
    if (unique) {
      if (names.coverLetterName === coverLetter) {
        return;
      }
      setErrors({ coverLetterName: "Cover letter name must be unique" });
    }
  }, [coverLetter, names.coverLetterName, rows]);

  const onChange = (prop) => (event) => {
    setErrors({
      ...errors,
      [prop]: validateField(
        event.target.name,
        event.target.value,
        event.target.type,
        event.target.required,
        true
      ),
    });
    setNames({ ...names, [prop]: event.target.value });
  };

  const onClearClickHandler = () => {
    setNames({ ...names, coverLetterName: "" });
    setEditorState(EditorState.createEmpty());
    setErrors({});
  };

  const radioOnChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const resumeOnChangeHandler = (event) => {
    setResumeValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteCoverLetter(null);
    setDeleteResume(null);
  };

  const deleteCoverLetterHandler = (id) => {
    setDeleteCoverLetter(id);
    setOpen(true);
    setMessage("Do you want to delete this cover letter ?");
  };

  const deleteResumeHandler = (id) => {
    setDeleteResume(id);
    setOpen(true);
    setMessage("Do you want to delete this resume ?");
  };

  const yesBtnOnClickHandler = () => {
    if (deleteCoverLetter !== null) {
      let coverLetter = rows;
      let latestRows = [];
      coverLetter.filter((coverLetter) =>
        coverLetter.sno !== deleteCoverLetter
          ? latestRows.push(coverLetter)
          : ""
      );
      setRows(latestRows);
      setOpen(false);
      setViewCoverLetterModalIsOpen(false);
    }
    if (deleteResume !== null) {
      let resumes = resumeRows;
      let resumesAfterDeletion = [];
      resumes.filter((resume) =>
        resume.sno !== deleteResume ? resumesAfterDeletion.push(resume) : ""
      );
      setResumeRows(resumesAfterDeletion);
      setOpen(false);
      setResumeModal(false);
    }
  };

  const noBtnOnClickHandler = () => {
    setOpen(false);
  };

  const createNewCoverLetterHandler = () => {
    setCoverLetterModalIsOpen(true);
  };

  const onClose = () => {
    setNames({ coverLetterName: "" });
    setEditorState(EditorState.createEmpty());
    setCoverLetterModalIsOpen(false);
  };

  const closeResumeModal = () => {
    setResumeModal(false);
  };

  const saveBtnOnClickHandler = () => {
    let coverLetters = rows;

    if (coverLetters.length < 10) {
      let newCoverLetter = {
        sno: rows.length,
        cLName: names.coverLetterName,
        lastModified: getDate(),
      };
      coverLetters.push(newCoverLetter);
      setRows(coverLetters);
    }
    onClose();
  };

  const saveResumeHandler = () => {
    closeResumeModal();
  };

  const openViewCoverLetterModalHandler = (id) => {
    setNames({ ...names, coverLetterName: rows[id].cLName });
    setId(id);
    setEditorState(
      EditorState.createWithContent(ContentState.createFromText(rows[id].data))
    );
    setViewCoverLetterModalIsOpen(true);
    setCoverLetter(rows[id].cLName);
  };

  const closeViewCoverLetterModalHandler = () => {
    setNames({ ...names, coverLetterName: "" });
    setEditorState(EditorState.createEmpty());
    setErrors({});
    setViewCoverLetterModalIsOpen(false);
  };

  const createResumeHandler = () => {
    setResumeModal(true);
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          item
          lg={6}
          xs={12}
          className={classes["manage-cover-letter-grid"]}
        >
          <div className={classes["routing-and-action-btns"]}>
            <div className={classes["title"]}>
              <Link className={classes.link} to="/jobseeker/homepage">
                Home
              </Link>
              <ArrowForwardIosIcon className={classes["forward-arrow-icon"]} />
              <span className={classes["section-title"]}>
                Manage cover letter
              </span>
            </div>
            <div className={classes["action-btns"]}>
              <div className={classes["update-btn"]}>
                <Button
                  className={value !== "" ? classes["btns"] : ""}
                  variant={value !== "" ? "contained" : "outlined"}
                  size="small"
                  disabled={value === ""}
                >
                  Update
                </Button>
              </div>
              <div className={classes["create-btn"]}>
                <Button
                  className={classes["btns"]}
                  variant="contained"
                  size="small"
                  onClick={createNewCoverLetterHandler}
                >
                  Create new letter
                </Button>
              </div>
            </div>
          </div>
          <ManageCoverLetterData
            value={value}
            rows={rows}
            radioOnChangeHandler={radioOnChangeHandler}
            deleteCoverLetterHandler={deleteCoverLetterHandler}
            viewCoverLetterHandler={openViewCoverLetterModalHandler}
          />
          <div className={classes["manage-resumes"]}>
            <div className={classes["title"]}>
              <span className={classes["section-title"]}>Manage Resumes</span>
            </div>
            <div className={classes["action-btns"]}>
              <div className={classes["update-btn"]}>
                <Button
                  className={resumeValue !== "" ? classes["btns"] : ""}
                  variant={resumeValue !== "" ? "contained" : "outlined"}
                  size="small"
                  disabled={resumeValue === ""}
                >
                  Update
                </Button>
              </div>
              <div className={classes["create-btn"]}>
                <Button
                  className={classes["btns"]}
                  variant="contained"
                  size="small"
                  onClick={createResumeHandler}
                >
                  Upload new resume
                </Button>
              </div>
            </div>
          </div>
          <ManageResumesData
            value={resumeValue}
            rows={resumeRows}
            radioOnChangeHandler={resumeOnChangeHandler}
            deleteResumeHandler={deleteResumeHandler}
          />
        </Grid>
      </Grid>
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        yesBtnClick={yesBtnOnClickHandler}
        noBtnClick={noBtnOnClickHandler}
        title={"Are you sure"}
        message={message}
      />
      <CreateCoverLetterModal
        open={coverLetterModalIsOpen}
        handleClose={onClose}
        onChange={onChange}
        onEditorStateChange={onEditorStateChange}
        onClearClickHandler={onClearClickHandler}
        coverLetterName={names.coverLetterName}
        editorState={editorState}
        errors={errors}
        saveBtnOnClickHandler={saveBtnOnClickHandler}
      />
      <ViewCoverLetterModal
        open={viewCoverLetterModalIsOpen}
        onClose={closeViewCoverLetterModalHandler}
        editorState={editorState}
        cLName={names.coverLetterName}
        onClearClickHandler={onClearClickHandler}
        onEditorStateChange={onEditorStateChange}
        errors={errors}
        onChange={onChange}
        isDisabled={isDisabled}
        editClickHandler={editClickHandler}
        coverLetter={coverLetter}
        deleteCoverLetterHandler={deleteCoverLetterHandler}
        id={id}
        updateCoverLetter={updateCoverLetter}
      />
      <UploadResumeModal
        open={resumeModal}
        handleClose={closeResumeModal}
        onChange={onChange}
        errors={errors}
        getResume={getResume}
        resume={resume}
        resumeName={names.resumeName}
        saveResumeHandler={saveResumeHandler}
      />
    </>
  );
};

export default JsManageCoverLetterAndResume;
