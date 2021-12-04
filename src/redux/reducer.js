import { combineReducers } from "redux";

const authReducer = (
  state = {
    token: '',
    email: '',
  },
  action
) => {
  switch (action.type) {
    case "LOGIN": {
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("email", action.payload.email);

      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
      };
    }
    case "LOGOUT": {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("isEmployee");
      return {
        ...state,
        email: null,
        token: null,
      };
    }
    case "SNACKBAR": {
      return {
        ...state,
        snackbar: {
          error: action.payload?.message ?? null,
          severity: action.payload?.severity ?? "",
          open: action.payload?.open,
        },
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
