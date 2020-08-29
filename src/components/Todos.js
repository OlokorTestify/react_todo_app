import React from "react";
import { connect } from "react-redux";
import TodoItem from "./TodoItem";

const Todos = (props) => {
  return props.todos.map((todo) => {
    return <TodoItem key={todo.id} data={todo} history={props.history} />;
  });
};

const mapStateToProps = (state) => {
  return {
    todos: state.todo.todos,
  };
};

export default connect(mapStateToProps, null)(Todos);
