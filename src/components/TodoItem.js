import React from "react";
import { delTodo, markComplete } from "../store/actions/todo";
import { connect } from "react-redux";

const TodoItem = (props) => {
  const getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: props.data.completed ? "line-through" : "none",
    };
  };
  const { id, title } = props.data;
  return (
    <div style={getStyle()} key={props.key}>
      <p>
        <input type="checkbox" onChange={() => props.markComplete(id)} />{" "}
        {title}
        <button onClick={() => props.delTodo(id)} style={btnStyle}>
          x
        </button>
        <button
          onClick={() => {
            props.history.push(`/edit/${id}`);
          }}
        >
          EDIT
        </button>
      </p>
    </div>
  );
};

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

const mapDispatchToProps = {
  delTodo,
  markComplete,
};

export default connect(null, mapDispatchToProps)(TodoItem);
