// Profile
import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

//GET CURRENT PROFILE

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(error => dispatch({ type: GET_PROFILE, payload: {} }));
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => {
      console.log(res);
      history.push("/dashboard");
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure?")) {
    axios
      .delete("/api/profile")
      .then(res => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .catch(err=>dispatch({type:GET_ERRORS,payload:err}))
  }
};