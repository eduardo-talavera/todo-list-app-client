import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { read, updateTodo } from "../requests";
import Swal from "sweetalert2";

function EditTodo(props) {
  const [todo, setTodo] = useState({
    name:"",
    title:""
  });

  const loadSingleTodo = (todoId) => {
    read(todoId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setTodo(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    const todoId = props.match.params.todoId;
    loadSingleTodo(todoId);
  }, [props]);

  const clickSubmit = (e) => {
    e.preventDefault();
    const { id } = todo;
    updateTodo(id, todo).then(data => {
      if (data.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.error,
        });
      } else {
        props.history.push(`/todo/${id}`)
        Swal.fire("Success", data.msg, "success");
      }
    })
  }

  const handleChange = (name) => (event) => {
    setTodo({ ...todo, [name]: event.target.value });
  };

  const formTodo = () => (
    <div className="mt-5">
      <form onSubmit={clickSubmit}>
        <div className="mb-3">
          <label className="form-label text-white h5">task title</label>
          <input
            type="text"
            className="form-control"
            value={todo.name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-white h5">assing to</label>
          <input
            type="text"
            className="form-control"
            value={todo.title}
            onChange={handleChange("title")}
          />
        </div>
        <div className="text-center mt-5">
          <button type="submit" className="btn btn-success">
            <i className="fas fa-save mr-3"></i>
            Save
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
       <div className="text-center">
          <Link to="/" className="btn btn-primary">
            <i className="fas fa-home mr-3"></i>
            Back to Home
          </Link>
       </div>

        {formTodo()}
      </div>
    </div>
  );
}

export default withRouter(EditTodo);
