import * as types from "../actionTyes";
import axios from "axios";

export const userLogin = ({ email, password }) => {
  function request() {
    return {
      type: types.LOGIN_USER_REQUEST,
      loading: true,
      message: "Please Wait...",
    };
  }

  function success() {
    return {
      type: types.LOGIN_USER_SUCCESS,
    };
  }

  function failure(error) {
    return {
      type: types.LOGIN_USER_FAILURE,
      error,
    };
  }

  return async (dispatch) => {
    try {
      dispatch(request());
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        { email, password },
      );
      localStorage.setItem("isLoggedIn", res.data.email);
      dispatch(success());
    } catch (error) {
      dispatch(failure(error));
      throw error.response.data;
    }
  };
};

export const logOut = () => {
  localStorage.removeItem("isLoggedIn");
  return {
    type: types.LOGOUT_USER,
    message: "logged out successfully...",
  };
};
