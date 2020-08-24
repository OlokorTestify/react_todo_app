import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

const Todos = ({ data, markComplete, delTodo, history }) => {
  return data.map((todo) => (
    <TodoItem
      key={todo.id}
      data={todo}
      markComplete={markComplete}
      delTodo={delTodo}
      history={history}
    />
  ));
};
Todos.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Todos;
