import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "popper.js";
import "jquery";
import "bootstrap";
import "./sass/main.scss";

import Header from "./Layout/Header";
import Home from "./pages/Home";
import SingleTodo from "./pages/SingleTodo";
import EditTodo from "./pages/EditTodo";

function App() {
  return (
    <BrowserRouter>
      <div className="app bg-info">
        <div className="container">
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/todo/:todoId" exact component={SingleTodo} />
            <Route path="/todo/edit/:todoId" exact component={EditTodo} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
