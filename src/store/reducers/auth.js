import * as types from "../actionTyes";

function checkAuth() {
  if (localStorage.getItem("isLoggedIn")) {
    return true;
  } else {
    return false;
  }
}

const initialState = {
  message: "",
  loading: false,
  error: null,
  user: null,
  isLoggedIn: checkAuth(),
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      return {
        ...state,
        message: action.message,
        loading: action.loading,
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        message: "login successful",
      };
    case types.LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.error,
        loading: false,
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        message: action.message,
      };
    default:
      return state;
  }
}

export default authReducer;
