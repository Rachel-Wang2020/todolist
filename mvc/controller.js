import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = ((model, view) => {
  const state = new model.State();

  const addTodo = () => {
    const inputbox = document.querySelector(view.domstr.inputbox);

    inputbox.addEventListener("click", (event) => {
      event.preventDefault();
      const input = document.getElementById("input_text");
      if (input.value.trim() !== "") {
        const newtodo = new model.Todo(input.value);

        model.addTodo(newtodo).then((todo) => {
          console.log(todo);
          state.todolist = [todo, ...state.todolist];
        });
        input.value = "";
      }
    });
  };

  const deleteTodo = () => {
    const container = document.querySelector(view.domstr.container);

    container.addEventListener("click", (event) => {
      if (event.target.className === "deletebtn") {
        const span = event.target.parentNode.getElementsByTagName("span")[0];

        state.todolist = state.todolist.filter((todo) => {
          return +todo.id !== +span.id;
        });
        model.deleteTodo(span.id);
      }
    });
  };

  const completedTodo = () => {
    const container = document.querySelector(view.domstr.container);
    // const completedtodolist_container = document.querySelector(view.domstr.completedtodolist_container)
    container.addEventListener("click", (event) => {
      if (event.target.className === "completedbtn") {
        // console.log(event.target.className)
        // console.log(`span: ${event.target.isChecked}`)
        // console.log(`eventtarget1: ${event.target.classList}`)

        const span = event.target.parentNode.getElementsByTagName("span")[0];
        console.log(event.target.parentNode);
        span.classList.toggle("checked");
        // console.log(`completed? : ${todo.completed}`)
        state.todolist = state.todolist.map((todo) => {
          if (+todo.id === +span.id) {
            let completed_todo = { ...todo, completed: !todo.completed };
            // todo.completed = !todo.completed
            model.updateTodo(completed_todo);
            console.log(completed_todo);
            return completed_todo;
          }
          return todo;
        });
      }
    });
  };

  const editTodo = () => {
    const container = document.querySelector(view.domstr.container);
    container.addEventListener("click", (event) => {
      if (event.target.className === "editbtn") {
        const span = event.target.parentNode.getElementsByTagName("span")[0];

        const input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;
        console.log(input.value);
        input.className = "editInput";
        span.replaceWith(input);
        input.focus();
        input.addEventListener("keyup", (event) => {
          if (event.key === "Enter") {
            state.todolist.map((todo) => {
              if (+todo.id === +span.id) {
                input.replaceWith(span);
                span.textContent = event.target.value;
                todo.title = event.target.value;
                model.updateTodo(todo);
              }
            });
          }
        });
      }
    });
  };
  const init = () => {
    model.getTodos().then((todos) => {
      state.todolist = todos.reverse();
    });
  };

  const bootstrap = () => {
    init();
    deleteTodo();
    addTodo();
    completedTodo();
    editTodo();
  };

  return { bootstrap };
})(Model, View);
