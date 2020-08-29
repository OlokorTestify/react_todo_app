import * as types from "../actionTyes";
import axios from "axios";

export const markComplete = (id) => {
  return {
    type: types.MARK_COMPLETE,
    id,
  };
};

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

export const getTodo = (id) => {
  function request() {
    return {
      type: types.GET_TODO_REQUEST,
      loading: true,
    };
  }

  function success(todo) {
    return {
      type: types.GET_TODO_SUCCESS,
      loading: false,
      todo,
    };
  }

  function failure(error) {
    return {
      type: types.GET_TODO_FAILURE,
      loading: false,
      error,
    };
  }

  return async (dispatch) => {
    try {
      dispatch(request());
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
      );
      dispatch(success(res.data));
      return;
    } catch (error) {
      dispatch(failure(error));
      throw error.response.data;
    }
  };
};

export const delTodo = (id, todos) => {
  function request() {
    return {
      type: types.DELETE_TODO_REQUEST,
      loading: true,
    };
  }

  function success(id) {
    return {
      type: types.DELETE_TODO_SUCCESS,
      loading: false,
      id,
    };
  }

  function failure(error) {
    return {
      type: types.DELETE_TODO_FAILURE,
      loading: false,
      error,
    };
  }

  return async (dispatch) => {
    try {
      dispatch(request());
      const res = await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
      );
      dispatch(success(id));
    } catch (error) {
      dispatch(failure(error));
      throw error.response.data;
    }
  };
};

export const getAllTodos = () => {
  function request() {
    return {
      type: types.GET_ALL_TODOS_REQUEST,
      loading: true,
    };
  }

  function success(todos) {
    return {
      type: types.GET_ALL_TODOS_SUCCESS,
      loading: false,
      todos,
    };
  }

  function failure(error) {
    return {
      type: types.GET_ALL_TODOS_FAILURE,
      loading: false,
      error,
    };
  }

  return async (dispatch) => {
    try {
      dispatch(request());
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
      );
      dispatch(success(res.data));
      return;
    } catch (error) {
      dispatch(failure(error));
      throw error.response.data;
    }
  };
};
