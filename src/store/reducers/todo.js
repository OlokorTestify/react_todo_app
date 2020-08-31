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

    case types.GET_TODO_SUCCESS:
      return {
        ...state,
        todo: action.todo,
        loading: action.loading,
      };
    case types.GET_TODO_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case types.GET_TODO_FAILURE:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };

    // case types.GET_All_TODOS:
    //   return {
    //     ...state,
    //     todos: action.todos,
    //   };
    //   break;
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

    case types.MARK_COMPLETE:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            todo.completed = !todo.completed;
          }
          return todo;
        }),
      };

    case types.GET_ALL_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.todos,
        loading: action.loading,
      };
    case types.GET_ALL_TODOS_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case types.GET_ALL_TODOS_FAILURE:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    case types.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== action.id)],
      };
    case types.DELETE_TODO_REQUEST:
      return {
        ...state,
        loading: action.loading,
      };
    case types.DELETE_TODO_FAILURE:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    default:
      return state;
  }
}

export default todoReducer;
