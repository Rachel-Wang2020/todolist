import { Api } from "./api.js";
import { View } from "./view.js";

export const Model = ((api, view) => {
    class State {
      #todolist = [];
  
      get todolist() {
        return this.#todolist;
      }
  
      set todolist(newtodos) {
        this.#todolist = newtodos;
  
        // const container = document.querySelector(view.domstr.container);
        // todolist_container
        const pendingtodolist_container = document.querySelector(
          view.domstr.pendingtodolist_container
        );
        const pendingtodo_tmp = view.createPendingTmp(this.#todolist);
        // console.log(pendingtodolist_container)
        view.render(pendingtodolist_container, pendingtodo_tmp);
        const completedtodolist_container = document.querySelector(
          view.domstr.completedtodolist_container
        );
        const completedtodo_tmp = view.createCompletedTmp(this.#todolist);
        view.render(completedtodolist_container, completedtodo_tmp);
      }
    }
    class Todo {
      constructor(title) {
        this.title = title;
        this.completed = false;
      }
    }
  
    const { getTodos, deleteTodo, addTodo, updateTodo } = api;
  
    return {
      getTodos,
      deleteTodo,
      addTodo,
      updateTodo,
      Todo,
      State
    };
  })(Api, View);
  