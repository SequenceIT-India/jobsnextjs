import React, { useState } from "react";
import { Button } from "@mui/material";

import classes from "./Settings.module.scss";
import DeleteAccountModal from "../../../components/modal/DeleteAccountModal";

import { showSnackbar, logoutAction } from "../../../redux/actions";

import { ERROR_MESSAGE } from "../../../util/Labels";

import { useDispatch } from "react-redux";
import JobsHornEncryptAndDecrypt from "../../../util/jhSecurityBuilder.js";

import { DATETIMEFORMAT, RESPONSE_CODE } from "../../../util/constants";
import { INFO } from "../../../util/Labels";
import {
  deleteUserAccountAPI,
} from "../../../service/profile";

const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const deleteAccountOnClickHandler = () => {
    setOpen(true);
  };

  const submitBtnClickHandler = async () => {
    if (password) {
      let aesJobsHorn = new JobsHornEncryptAndDecrypt();
      const output = aesJobsHorn.getFinalOutput({ password: password }, DATETIMEFORMAT, "CAND", false);
      const { timeStamp, saltRandom20Char, cipherText } = output;
      const updateResponse = await deleteUserAccountAPI({
        timeStamp: timeStamp.toString(),
        systemId: saltRandom20Char,
        dataSet: cipherText,
      });
      if (updateResponse.httpStatus === 200) {
        if (updateResponse?.data?.code !== "1014") {
          dispatch(showSnackbar(updateResponse?.data?.message, "warning"));
        }
        else {
          cancelBtnClickHandler();
          dispatch(logoutAction());
          dispatch(showSnackbar(updateResponse?.data?.message, "success"));
        }
      }
      else {
        dispatch(showSnackbar('Server Error', "error"));
      }
    };
  }
  const cancelBtnClickHandler = () => {
    setPassword("");
    setOpen(false);
  };

  return (
    <>
      <div className={classes["delete-account-section"]}>
        <span className={classes["section-title"]}>Delete Account</span>
        <span className={classes["delete-account-text"]}>
          {INFO.DELETE_ACCOUNT_MAIN_INFO}
        </span>
      </div>
      <Button
        className={classes["delete-account-btn"]}
        size={window.innerWidth >= 600 ? "medium" : "small"}
        variant="contained"
        onClick={deleteAccountOnClickHandler}
      >
        Delete account
      </Button>
      <DeleteAccountModal
        title={"Delete Account"}
        message={INFO.DELETE_ACCOUNT_SUB_INFO}
        open={open}
        password={password}
        passwordOnChangeHandler={passwordOnChangeHandler}
        handleClose={cancelBtnClickHandler}
        submitBtnClick={submitBtnClickHandler}
        cancelBtnClick={cancelBtnClickHandler}
      />
    </>
  );
};

export default DeleteAccount;
