import React, { useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { getAllTodos } from "./store/actions/todo";
import { useDispatch, useSelector } from "react-redux";
import About from "./components/Pages/about";
import Header from "./components/Layout/Header";
import Todos from "./components/Todos";
import SignIn from "./containers/SignIn.jsx";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./containers/UpdateTodo";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  return (
    <>
      <div className="App">
        <div className="container">
          <Header />
          <Switch>
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
                <Route
                  path="/signin"
                  render={(props) => (
                    <>
                      <SignIn {...props} />
                    </>
                  )}
                />
              </>
            )}
            <Route path="/about" component={About} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </div>
    </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: state.auth.isLoggedIn,
//   };
// };

// const mapDispatchToProps = {
//   getAllTodos,
// };

export default App;
