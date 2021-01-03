import React, { useState, useEffect } from "react";
import CardTodo from "../components/CardTodo";
import { getTodos, createTodo } from "../requests";
import Swal from "sweetalert2";

function Home() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [run, setRun] = useState(false);

  const loadTodos = () => {
    getTodos().then((data) => {
      if (data.error) {
        console.log(error);
      } else {
        setTodos(data);
        console.log(data);
      }
    });
  };

  const showPopUp = () => {
    Swal.mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      showCancelButton: true,
      progressSteps: ["1", "2"],
    })
      .queue([
        {
          title: "Task title",
          text: "write a title",
        },
        {
          title: "Assing to someone the task",
          text: "write a name",
        },
      ])
      .then((result) => {
        if (result.value) {
          // const answers = JSON.stringify(result.value);
          const [title, name] = result.value;
          createTodo({ name, title }).then((data) => {
            if (data.error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.error,
              });
            } else {
              setRun(!run);
              Swal.fire("Success", data.msg, "success");
            }
          });
        }
      });
  };

  useEffect(() => {
    loadTodos();
  }, [run]);

  const clickSubmit = (e) => {
    e.preventDefault();
    const results = todos.filter(
      (todo) => todo.name.includes(search) || todo.title.includes(search)
    );
    if (!results.length) {
      setTimeout(() => {
        loadTodos();
      }, 1500);
    }
    setTodos(results);
    if (search.length === 0) {
      loadTodos();
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const searchForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="d-flex justify-content-between bg-white search-box">
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          placeholder="search by name or title"
        />
        <button type="submit" className="btn">
          <i className="fas fa-search mr-3"></i>
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8">
          <div className="d-md-flex justify-content-center mb-5">
            <div className="text-center mr-5">
              <button
                type="button"
                className="btn btn-primary mb-5"
                onClick={showPopUp}
              >
                <i className="fas fa-plus-circle mr-3"></i>
                Create a Todo
              </button>
            </div>
            {searchForm()}
          </div>
          {!todos.length ? (
            <h2 className="text-center text-white">there are no records yet</h2>
          ) : null}
          {todos.map((todo, index) => (
            <CardTodo key={index} todo={todo} setRun={setRun} run={run} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
