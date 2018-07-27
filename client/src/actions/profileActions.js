// REGISTER
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_PROFILE, GET_PROFILE, GET_ERRORS } from "./types";
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      //set token to localstorage
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);

      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log user out

export const logoutUser = () => dispatch => {
  //remove token
  localStorage.removeItem("jwtToken");
  //remove auth
  setAuthToken(false);

  //set current user to {}
  dispatch(setCurrentUser({}));
};
