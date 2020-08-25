import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

const UpdateTodo = (props) => {
  const [existingTodo, setExistingTodo] = useState({});
  const [apiLoading, setApiLoading] = useState(false);

  const apiCall = async () => {
    const id = props.match.params.todo_id;
    setApiLoading(true);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
    setExistingTodo(res.data);
    setApiLoading(false);
    return;
  };

  useEffect(() => {
    apiCall();
  }, []);

  const todoSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Error STUPID")
      .max(6, "excessive")
      .required("please fill this field!!"),
  });

  const handleSubmit = async ({ title, completed }, { setSubmitting }) => {
    const id = props.match.params.todo_id;
    try {
      setApiLoading(true);
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          title,
          completed,
        },
      );
      const newTodos = [...props.todos, res.data];
      props.setTodos(newTodos);
      setSubmitting(false);
      setApiLoading(false);
      props.history.push("/");
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: existingTodo.title,
          completed: existingTodo.completed,
        }}
        onSubmit={handleSubmit}
        validationSchema={todoSchema}
      >
        {({ isSubmitting }) => (
          <>
            <Form>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" />
              <button type={"submit"} disabled={isSubmitting}>
                UpdateTodo
              </button>
            </Form>
          </>
        )}
      </Formik>
      {apiLoading ? <div>Loading...</div> : null}
    </>
  );
};

export default UpdateTodo;
