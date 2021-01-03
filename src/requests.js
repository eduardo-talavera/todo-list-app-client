import { API } from "./config";


export const createTodo =  async (todoData) => {
  return await fetch(`${API}/todos`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData)
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
}

export const getTodos =  async () => {
  return await fetch(`${API}/todos`, {
    method: "GET"
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
}

export const read =  async (idTodo) => {
  return await fetch(`${API}/todos/${idTodo}`, {
    method: "GET"
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
}

export const updateTodo =  async (idTodo, todoData) => {
  return await fetch(`${API}/todos/${idTodo}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
}

export const removeTodo = async (idTodo) => {
  return await fetch(`${API}/todos/${idTodo}`, {
    method: "DELETE"
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
}

export const changeStatusTodo = async (idTodo, todoData) => {
  return await fetch(`${API}/todos/${idTodo}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({completed: todoData})
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
}

