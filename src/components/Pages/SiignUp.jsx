import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUp = (props) => {
  const signUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character",
      ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={signUpSchema}
      >
        {({ isSubmitting }) => (
          <>
            <Form>
              <Field type="email" name="email" placeholder="email" />
              <Field type="password" name="password" placeholder="password" />
              <ErrorMessage name="email" component="div" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Signup
              </button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
