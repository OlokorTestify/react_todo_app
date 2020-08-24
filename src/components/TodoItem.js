import React from "react";
import PropTypes from "prop-types";

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
    <div
      style={getStyle()}
      onClick={() => {
        props.history.push(`/edit/${id}`);
      }}
    >
      <p>
        <input type="checkbox" onChange={() => props.markComplete(id)} />{" "}
        {title}
        <button onClick={() => props.delTodo(id)} style={btnStyle}>
          x
        </button>
      </p>
    </div>
  );
};
TodoItem.protoType = {
  todo: PropTypes.object.isRequired,
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

export default TodoItem;
