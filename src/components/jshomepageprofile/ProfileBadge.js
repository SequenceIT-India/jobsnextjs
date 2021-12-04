import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import makeStyles from "@mui/styles/makeStyles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import colors from "../../vars.module.scss";
import ImageCropModal from "../modal/ImageCropModal";
import { allowedExtensionsForImage } from "../../util/helper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  large: {
    margin: theme.spacing(2),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  smallBadge: {
    bottom: "25%",
  },
  input: {
    display: "none",
  },
  iconBtn: {
    backgroundColor: colors.primaryColor,
    "&:hover": {
      backgroundColor: colors.primaryColor,
    },
  },
  icon: {
    color: "white",
    fontSize: "smaller",
  },
}));

export default function ProfileBadge() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: "px",
    x: 130,
    y: 50,
    width: 100,
    height: 100,
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(
    "Image size must be less than or equal to 64kb."
  );

  const handleFileChange = (e) => {
    const allowedExtensions = allowedExtensionsForImage;
    const filePath = e.target.value;
    const file = e.target.files[0];
    const size = file.size / 1024;
    const maxAllowedFileSize = 64;
    setFile(URL.createObjectURL(file));
    if (size <= maxAllowedFileSize) {
      setError("");
      return;
    }
    if (size > maxAllowedFileSize) {
      setError(
        `Maximum file size exceed, This file size is:  ${Math.round(size)} KB`
      );
      return;
    }
    if (!allowedExtensions.exec(filePath)) {
      setError("Invalid Image Format. Allowed only .jpg | .jpeg | .png");
      return;
    }
  };

  function getCroppedImg() {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
  }

  const imageIconOnClickHandler = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFile("");
  };

  const uploadBtnClickHandler = () => {
    getCroppedImg();
    handleClose();
  };

  return (
    <div className={classes.root}>
      <Badge
        classes={{ anchorOriginBottomRightCircular: classes.smallBadge }}
        overlap="circular"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <>
            <IconButton
              onClick={imageIconOnClickHandler}
              className={classes.iconBtn}
              color="primary"
              size="large"
            >
              <PhotoCamera className={classes.icon} />
            </IconButton>
          </>
        }
      >
        <Avatar
          src={
            result !== null
              ? result
              : "https://material-ui.com/static/images/avatar/1.jpg"
          }
          className={classes.large}
        />
      </Badge>
      <ImageCropModal
        title={"Upload Image"}
        open={open}
        handleClose={handleClose}
        file={file}
        crop={crop}
        handleFileChange={handleFileChange}
        getCroppedImage={getCroppedImg}
        setCrop={setCrop}
        setImage={setImage}
        uploadBtnClickHandler={uploadBtnClickHandler}
        error={error}
      />
    </div>
  );
}
