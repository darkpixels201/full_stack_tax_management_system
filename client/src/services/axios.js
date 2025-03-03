import Axios from 'axios';
import Config from '../common/config';

import {store} from "../store/store";
import { toast } from 'react-toastify';


const instance = Axios.create({
  baseURL: `${Config.BASE_URL}/api/`,
  // baseURL: `${Config.BASE_URL}/api/`,
  timeout: 30000,
});

// timeout of 30000ms exceeded

instance.interceptors.request.use(
  async (config) => {

    if (!navigator.onLine) {
      toast.error("Please check your internet connection.");
      return Promise.reject({ message: "No Internet Connection" });
    }
    
    const { tokens } = store?.getState()?.authReducer;
    console.log("Axios Token", tokens?.access_token);

    if (tokens) {
      config.headers["Authorization"] = tokens?.access_token;
    }

    // Dynamically set Content-Type based on data type
    if (config.data instanceof FormData) {
      // Let Axios set the correct boundary
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    config.headers.Accept = "application/json";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);


instance.interceptors.response.use(
  response =>
    new Promise(async (resolve, reject) => {
      if (!response) {
        // showErrorMsg("No response from server. Please contact to support.")
        // Toast.showWithGravity(
        //   "No response from server. Please contact to support.",
        //   Toast.LONG,
        //   Toast.BOTTOM
        // );
        reject();
      }
      // printLogs(response);
      resolve(response.data);
    }),
  error =>
    new Promise(async (resolve, reject) => {
      console.log('axios.error', error?.response?.data);
      toast.error(
        error?.response?.data?.message === "Unauthorized - Invalid token"
          ? "Your Session has Expired Please Login again"
          // : ""
          : error?.response?.data?.message
      );
      
      // console.log('axios.error', error?.response?.data?.message);
      if (
        error?.response?.data?.message ==
        'User Against this name already exists'
      ) {
        // showErrorMsg(error.message)
        // Toast.showWithGravity(
        //   error?.response?.data?.message,
        //   Toast.LONG,
        //   Toast.BOTTOM,
        // );
        resolve(error?.response?.data?.message);
      }
      if (error.message == 'Network Error') {
        // showErrorMsg(error.message)
        // Toast.showWithGravity(
        //   error.message,
        //   Toast.LONG,
        //   Toast.BOTTOM
        // );
        reject(error);
      } else if (!error.response) {
        // showErrorMsg("No response from server. Please contact to support.")
        // Toast.showWithGravity(
        //   "No response from server. Please contact to support.",
        //   Toast.LONG,
        //   Toast.BOTTOM
        // );
        reject(error);
      } else {
        // printLogs(error.response);
        const resMessage = error.response.data?.message;
        const resErrors = error.response.data?.errors;
        const resData = error.response.data;
        const resStatus = error.response.status;

        // if (resStatus == 500) {
        //   // Toast.showWithGravity(
        //   //   "Internal server error. Please contact to support.",
        //   //   Toast.LONG,
        //   //   Toast.BOTTOM
        //   // );
        //   // showErrorMsg("Internal server error. Please contact to support.");
        // } else if (resErrors) {
        //   // showErrorMsg(JSON.stringify(resErrors));
        //   // Toast.showWithGravity(
        //   //   JSON.stringify(resErrors),
        //   //   Toast.LONG,
        //   //   Toast.BOTTOM
        //   // );
        // } else if (typeof resMessage == 'string') {
        //   if (!resMessage.length) {
        //     // showErrorMsg("Internal Server Error. Please contact to support. Thanks.");
        //     // Toast.showWithGravity(
        //     //   "Internal Server Error. Please contact to support. Thanks.",
        //     //   Toast.LONG,
        //     //   Toast.BOTTOM
        //     // );
        //   } else if (resMessage === 'Unauthenticated.') {
        //     store.dispatch(logout());
        //     // showErrorMsg("Please login first.");
        //     Alert.alert('Required Login', 'Please login to continue.', [
        //       {text: 'Cancel'},
        //       {
        //         text: 'Login',
        //         onPress: () => {
        //           navigate(Routes.Login);
        //         },
        //       },
        //     ]);
        //   } else {
        //     // showErrorMsg(resMessage);
        //     // Toast.showWithGravity(
        //     //   resMessage,
        //     //   Toast.LONG,
        //     //   Toast.BOTTOM
        //     // );
        //   }
        // } else if (resData) {
        //   // showErrorMsg(JSON.stringify(resData));
        //   // Toast.showWithGravity(
        //   //   JSON.stringify(resData),
        //   //   Toast.LONG,
        //   //   Toast.BOTTOM
        //   // );
        // }
        reject(error);
      }
    }),
);

export default instance;
