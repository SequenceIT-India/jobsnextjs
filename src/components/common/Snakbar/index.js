import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../redux/actions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({ error, severity, open }) => {
  const dispatch = useDispatch();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;

    dispatch(showSnackbar(null, "", false));
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackBar;
