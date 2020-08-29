import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { updateTodo, getTodo } from "../store/actions/todo";

const UpdateTodo = (props) => {
  useEffect(() => {
    const id = props.match.params.todo_id;
    props.getTodo(id);
  }, []);

  const todoSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Error STUPID")
      .max(6, "excessive")
      .required("please fill this field!!"),
  });

  const handleSubmit = async ({ title, completed }, { setSubmitting }) => {
    const id = props.match.params.todo_id;
    props.updateTodo({ id, title, completed });
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: props.todo.title,
          completed: props.todo.completed,
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
      {props.loading ? <div>Loading...</div> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.todo.loading,
    todo: state.todo.todo,
  };
};

const mapDispatchToProps = {
  updateTodo,
  getTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTodo);
