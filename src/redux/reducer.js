import { combineReducers } from "redux";
import Cookies from 'js-cookie';
const authReducer = (
  state = {
    token: Cookies.get('token'),
    email: Cookies.get('email')
  },
  action
) => {
  switch (action.type) {
    case "LOGOUT": {
      Cookies.remove('token', { path: '/', domain: '.onebigtech.com' });
      Cookies.remove('email', { path: '/', domain: '.onebigtech.com' });
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
