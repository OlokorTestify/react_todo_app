import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Please enter your password"),
  });

  const handleSubmit = async ({ email, password }, { setSubmitting }) => {
    try {
      setLoading(true);
      const userData = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        { email, password },
      );
      if (userData.data.email === email) {
        props.setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        setMessage("login successful");
        setLoading(false);
        return;
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={signInSchema}
      >
        {({ isSubmitting }) => (
          <>
            <Form>
              <Field type="email" name="email" placeholder="email" />
              <Field type="password" name="password" placeholder="password" />
              <ErrorMessage name="email" component="div" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Sign In
              </button>
            </Form>
          </>
        )}
      </Formik>
      {loading ? <div>Loading...</div> : null}
      <div>{message}</div>
    </>
  );
};

export default SignIn;
