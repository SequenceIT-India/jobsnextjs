const loginAction = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

const logoutAction = (data) => {
  return {
    type: "LOGOUT",
  };
};
const showSnackbar = (message = "", severity = "", open = true) => {
  return {
    type: "SNACKBAR",
    payload: { message, severity, open },
  };
};
export { loginAction, logoutAction, showSnackbar };
