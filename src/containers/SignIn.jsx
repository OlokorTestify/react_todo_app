import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userLogin } from "../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth);

  const signInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Please enter your password"),
  });

  const handleSubmit = async ({ email, password }, { setSubmitting }) => {
    try {
      await dispatch(userLogin({ email, password }));
      props.history.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "test@gmail.com", password: "Srey67***" }}
        onSubmit={handleSubmit}
        validationSchema={signInSchema}
      >
        {({ isSubmitting }) => (
          <>
            <Form>
              <Field type="email" name="email" placeholder="email" />
              <Field type="password" name="password" placeholder="password" />
              <ErrorMessage name="email" component="div" />
              <ErrorMessage name="password" component="Sdiv" />
              <button type="submit" disabled={isSubmitting}>
                Sign In
              </button>
            </Form>
          </>
        )}
      </Formik>
      {userState.loading ? <div>Loading...</div> : null}
      <div>{userState.message}</div>
    </>
  );
};

export default SignIn;
