import * as types from "../actionTyes";
import axios from "axios";

// const createTodo = (payload) => {
//   return {
//     type: types.CREATE_TODO,
//     todo: payload
//   };
// };

export const createTodo = (todo) => {
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

// dispatch(updateTodo(todo))
export const updateTodo = ({ title, completed, id }) => {
  function request() {
    return {
      type: types.UPDATE_TODO_REQUEST,
      loading: true,
    };
  }

  function success(todo) {
    return {
      type: types.UPDATE_TODO_SUCCESS,
      loading: false,
      todo,
    };
  }

  function failure(error) {
    return {
      type: types.UPDATE_TODO_FAILURE,
      loading: false,
      error,
    };
  }

  return async (dispatch) => {
    try {
      dispatch(request());
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          title,
          completed,
        },
      );
      dispatch(success(res.data));
    } catch (error) {
      dispatch(failure(error));
      throw error.response.data;
    }
  };
};
