import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import About from "./components/Pages/about";
import Header from "./components/Layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./components/UpdateTodo";
import "./App.css";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);

  const apiCall = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
      );
      setTodos(res.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const markComplete = (id) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodo);
  };

  const delTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const newTodos = [...todos.filter((todo) => todo.id !== id)];
      return setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (title) => {
    try {
      setApiLoading(true);
      const res = await axios.post(
        `https://jsonplaceholder.typicode.com/todos`,
        {
          title,
          completed: false,
        },
      );
      setApiLoading(false);
      const newTodo = [...todos, res.data];
      setTodos(newTodo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="App">
        <div className="container">
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <>
                  <AddTodo {...props} AddTodo={addTodo} loading={apiLoading} />
                  <Todos
                    {...props}
                    data={todos}
                    markComplete={markComplete}
                    delTodo={delTodo}
                  />
                </>
              )}
            />
            <Route path="/about" component={About} />
            <Route
              path="/edit/:todo_id"
              render={(props) => (
                <>
                  <UpdateTodo {...props} todos={todos} setTodos={setTodos} />
                </>
              )}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;
