export const Api = (() => {
  const baseUrl = "http://localhost:3000";
  const todoPath = "todos";

  const getTodos = () =>
    fetch([baseUrl, todoPath].join("/")).then((response) => response.json());

  const addTodo = (newtodo) =>
    fetch([baseUrl, todoPath].join("/"), {
      method: "POST",
      body: JSON.stringify(newtodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((response) => response.json());

  const deleteTodo = (id) =>
    fetch([baseUrl, todoPath, id].join("/"), {
      method: "DELETE"
    });

  const updateTodo = (todo) =>
    fetch([baseUrl, todoPath, todo.id].join("/"), {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((response) => response.json());

  return {
    getTodos,
    deleteTodo,
    addTodo,
    updateTodo
  }; // <---------- Api
})();