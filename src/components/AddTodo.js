import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { createTodo } from "../store/actions/todo";
import * as Yup from "yup";

const Button = (props) => {
  return (
    <button type={props.type} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

const AddTodo = (props) => {
  const newTodoSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Error STUPID")
      .max(6, "excessive")
      .required("please fill this field!!"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    props.createTodo(values); // This is dispatching the action
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{ title: "" }}
        onSubmit={handleSubmit}
        validationSchema={newTodoSchema}
      >
        {({ isSubmitting }) => (
          <>
            <Form>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" />
              <Button type={"submit"} disabled={isSubmitting}>
                AddTodo
              </Button>
            </Form>
            {props.loading ? <p>Loading...</p> : null}
          </>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.todo.loading,
  };
};

const mapDispatchToProps = {
  createTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
