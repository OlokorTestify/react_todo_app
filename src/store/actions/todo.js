import * as types from "../actionTyes";
import axios from "axios";

dispatch(success(payload));
dispatch({
  type,
  payload,
});

// const createTodo = (payload) => {
//   return {
//     type: types.CREATE_TODO,
//     todo: payload
//   };
// };

const createTodo = (todo) => {
  function request() {
    return {
      type: types.CREATE_TODO_REQUEST,
      loading: true,
    };
  }

  function success(todo) {
    return {
      type: types.CREATE_TODO_SUCCESS,
      loading: false,
      todo,
    };
  }

  function failure(error) {
    return {
      type: types.CREATE_TODO_FAILURE,
      loading: false,
      error,
    };
  }

  return async (dispatch) => {
    try {
      dispatch(request());
      const res = await axios.post(
        `https://jsonplaceholder.typicode.com/todos`,
        todo,
      );
      dispatch(success(res.data));
    } catch (error) {
      dispatch(failure(error));
      throw error.response.data;
    }
  };
};
