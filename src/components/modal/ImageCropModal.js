import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import { useStyles } from "./styles";
import Cropper from "../cropper/Cropper";

function ImageCropModal(props) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.paper}>
        <h2 className={classes.modalTitle} id="modal-title">
          {props.title}
        </h2>
        <Cropper
          file={props.file}
          crop={props.crop}
          handleFileChange={props.handleFileChange}
          getCroppedImage={props.getCroppedImg}
          setCrop={props.setCrop}
          setImage={props.setImage}
          error={props.error}
          uploadBtnClickHandler={props.uploadBtnClickHandler}
        />
      </div>
    </Modal>
  );
}

export default ImageCropModal;
