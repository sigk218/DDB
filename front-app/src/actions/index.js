import {
    GET_USER_INFO,
  } from "./types";

  export const getUserInfo = () => async dispatch => {
    await dispatch({ type: GET_USER_INFO, payload: response.data.data });
  };