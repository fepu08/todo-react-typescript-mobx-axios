import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Todo, TodoFormValues } from "../models/todo";

export default class TodoStore {
  todos: Todo[] = [];
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTodos(todos: Todo[] | [] = []) {
    this.todos = todos;
  }

  loadTodos = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Todos.get();
      runInAction(() => {
        this.todos = result;
      });
      this.setLoadingInitial(false);
    } catch (err) {
      console.log(err);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };

  setLoadingInitial(state: boolean) {
    this.loadingInitial = state;
  }

  addTodo = async (todo: TodoFormValues) => {
    try {
      await agent.Todos.create(new TodoFormValues(todo));
      this.loadTodos();
    } catch (err) {
      console.log(err);
    }
  };
}
