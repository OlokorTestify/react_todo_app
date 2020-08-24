import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
    new_todo: Yup.string()
      .min(3, "Error STUPID")
      .max(6, "excessive")
      .required("please fill this field!!"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    props.AddTodo(values.new_todo);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{ new_todo: "" }}
        onSubmit={handleSubmit}
        validationSchema={newTodoSchema}
      >
        {({ isSubmitting }) => (
          <>
            <Form>
              <Field type="text" name="new_todo" />
              <ErrorMessage name="new_todo" component="div" />
              <Button type={"submit"} disabled={isSubmitting}>
                AddTodo
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default AddTodo;
