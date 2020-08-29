import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { getAllTodos } from "./store/actions/todo";
import { connect } from "react-redux";
import About from "./components/Pages/about";
import Header from "./components/Layout/Header";
import Todos from "./components/Todos";
import SignIn from "./containers/SignIn.jsx";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./containers/UpdateTodo";
import "./App.css";
import axios from "axios";

const App = (props) => {
  const auth = localStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(auth);

  useEffect(() => {
    props.getAllTodos();
  }, []);

  return (
    <>
      <div className="App">
        <div className="container">
          <Header isLoggedIn={isLoggedIn} />
          <Switch>
            <Route path="/about" component={About} />
            <Route
              path="/signin"
              render={(props) => (
                <>
                  <SignIn {...props} setIsLoggedIn={setIsLoggedIn} />
                </>
              )}
            />
            {isLoggedIn ? (
              <>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <>
                      <AddTodo {...props} />
                      <Todos {...props} />
                    </>
                  )}
                />
                <Route
                  path="/edit/:todo_id"
                  render={(props) => (
                    <>
                      <UpdateTodo {...props} />
                    </>
                  )}
                />
              </>
            ) : (
              <>
                <Redirect to="/signin" />
              </>
            )}
          </Switch>
        </div>
      </div>
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
  getAllTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
