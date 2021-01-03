import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardTodo from "../components/CardTodo";
import { read } from "../requests";

function SingleTodo(props) {
  const [todo, setTodo] = useState({});
  const [run, setRun] = useState(false);

  const loadSingleTodo = (todoId) => {
    read(todoId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTodo(data);
      }
    });
  };

  useEffect(() => {
    const todoId = props.match.params.todoId;
    loadSingleTodo(todoId);
  }, [props, run]);

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="text-center">
          <Link to="/" className="btn btn-primary">
            <i className="fas fa-home mr-3"></i>
            Back to Home
          </Link>
        </div>
        <div className="mt-5">
          <CardTodo todo={todo} single={true} setRun={setRun} run={run} />
        </div>
      </div>
    </div>
  );
}

export default SingleTodo;
