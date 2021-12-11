/* eslint-disable no-param-reassign */
import Axios from 'axios';


/* Loader Show/Hide logic */
let count = 0;
const showLoader = (store) => {
  //store.dispatch(loader(true));
  count++;
};

const hideLoader = (store) => {
  if (count <= 1) {
    store.dispatch(loader(false));
    count = 0;
  } else {
    count--;
  }
};

/* Error Show/Hide logic */

/* Error Show/Hide logic */
const handleError = (store, err = null) => {
  // if (err) {
  //   if (err?.config?.url.includes('/login')) {
  //     const errorMsgToIgnore = [
  //       'Invalid Credentials',
  //       'User not found',
  //       'Invalid parameters',
  //     ];
  //     const { data = {} } = err;
  //     store.dispatch(
  //       showSnackbar(
  //         !data.message || errorMsgToIgnore.includes(data.message)
  //           ? 'Incorrect username or password'
  //           : data.message,
  //         ALERT.ERROR,
  //       ),
  //     );
  //   } else {
  //     //store.dispatch(errorHandler(err));
  //   }
  // }
};

/* Function to validate|prepare|modify error object */
const prepareErrorObject = (error) => {
  let err = (error?.response?.data ?? error) || new Error('Network Error');

  if (typeof err === 'object') {
    err.timestamp = Date.now();
    err.config = error?.config;
  } else {
    err = {};
    err.message = 'Something went wrong.';
    err.timestamp = Date.now();
  }
  return err;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {

  setupInterceptors: (store) => {
    // Requests interceptor
    Axios.interceptors.request.use(
      (config) => {
        const { silent = false } = config;

        config.timeout = 10000 * 5; // Wait for 5 seconds
        if (!silent) showLoader(store);
        config.headers.jwtToken = `jiuiuiiiiiiiiiiiiiiiiiiiiiii`;
        config.headers['Content-Type'] = 'application/json';
        config.headers.token = `ffsrewrw`;
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.crossdomain=true;
        console.log('config', config)
        return config;
      },
      (error) => {
        return Promise.resolve({ data: [], success: false, message: error ? error['response'] : null });
      }
    );

    // Response interceptor
    Axios.interceptors.response.use(
      (response) => {
        const { data = {}, config = {} } = response;
        const { skipErrorHandler = false } = config;

        if (data.status >= 400) {
          const err = prepareErrorObject(data);
          if (!skipErrorHandler) {
            handleError(store, err);
          }
        }
        return response;
      },
      (error) => {
        const err = prepareErrorObject(error);

        return Promise.resolve({ data: [], success: false, message: err.message });
      }
    );
  },
};
