import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { removeTodo, changeStatusTodo } from "../requests";
import Swal from "sweetalert2";
import moment from "moment";

function CardTodo({
  todo,
  single = false,
  edit = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
  history
}) {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(todo.completed);
  }, []);

  const changeStatus = () => {
    setStatus(!status);
    changeStatusTodo(todo.id, status).then((data) => {
      if (data.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.error,
        });
      } 
      setRun(!run);
    });
  };

  const deleteTodo = (idTodo) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          removeTodo(idTodo).then((data) => {
            if (data.error) {
              console.log(error);
            } else {
              setRun(!run);
              history.push('/');
              swalWithBootstrapButtons.fire("Deleted!", data.msg, "success");
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your todo is safe :)",
            "error"
          );
        }
      });
  };

  const actions = () => (
    <div className="actions">
      {!single && (
        <Link className="btn btn-primary" to={`/todo/${todo.id}`}>
          <i className="fas fa-eye"></i>
        </Link>
      )}
      <button
        onClick={() => {
          deleteTodo(todo.id);
        }}
        className="btn btn-danger ml-3"
      >
        <i className="fas fa-trash-alt"></i>
      </button>
      {!edit && (
        <Link className="btn btn-secondary ml-3" to={`/todo/edit/${todo.id}`}>
          <i className="fas fa-pen"></i>
        </Link>
      )}
      <button
        onClick={changeStatus}
        className={todo.completed ? "btn text-success ml-3" : "btn ml-3"}
      >
        {todo.completed ? (
          <i className="fas fa-check"></i>
        ) : (
          <i className="fas fa-clock"></i>
        )}
      </button>
    </div>
  );

  return (
    <div className="card-body bg-white text-center mt-3">
      <div className={single ? "" : "d-md-flex justify-content-between"}>
        <h5 className="card-title">{todo.title}</h5>
        {single && <p className="card-text">Assing to: {todo.name}</p>}
        {single && <p className="card-text">created at: {moment(todo.createtAt).fromNow()}</p>}
        {actions()}
      </div>
    </div>
  );
}

export default withRouter(CardTodo);
