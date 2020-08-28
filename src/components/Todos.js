import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TodoItem from "./TodoItem";

const Todos = (props) => {
  return props.todos.map((todo) => (
    <TodoItem
      key={todo.id}
      data={todo}
      markComplete={props.markComplete}
      delTodo={props.delTodo}
      history={props.history}
    />
  ));
};
Todos.propTypes = {
  data: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    todos: state.todo.todos,
  };
};

export default connect(mapStateToProps, null)(Todos);
