import React from "react";

import { Button, FormHelperText } from "@mui/material";

import ReactCrop from "react-image-crop";

import { useStyles } from "../modal/styles";
import "react-image-crop/dist/ReactCrop.css";

const Cropper = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.chooseFileDiv}>
      <div className={classes.chooseFileBtnDiv}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={props.handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            className={classes.chooseFileBtn}
            variant="contained"
            component="span"
          >
            Choose File
          </Button>
        </label>
      </div>
      <div className={classes.displayImageDiv}>
        {props.file && (
          <>
            <ReactCrop
              src={props.file}
              onImageLoaded={props.setImage}
              crop={props.crop}
              onChange={props.setCrop}
            />
            <FormHelperText error>{props.error}</FormHelperText>
            <div className={classes.uploadBtnDiv}>
              <Button
                disabled={props.error !== ""}
                variant="contained"
                color="primary"
                component="span"
                onClick={props.uploadBtnClickHandler}
                className={classes.uploadBtn}
              >
                Upload
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cropper;
