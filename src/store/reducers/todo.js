import * as types from "../actionTyes";

const initialState = {
  todos: [],
  todo: {},
  loading: false,
  error: null,
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.todo],
        loading: action.loading,
      };
    case types.CREATE_TODO_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case types.CREATE_TODO_FAILURE:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    case types.GET_TODO:
      return {
        ...state,
        todo: action.todo,
      };
      break;
    case types.GET_TODOS:
      return {
        ...state,
        todos: action.todos,
      };
      break;
    case types.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.todo],
        loading: action.loading,
      };
    case types.UPDATE_TODO_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case types.UPDATE_TODO_FAILURE:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    case types.DELETE_TODO:
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== action.id)],
      };
      break;
    default:
      return state;
  }
}

export default todoReducer;
