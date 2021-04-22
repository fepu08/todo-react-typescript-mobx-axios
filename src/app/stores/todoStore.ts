import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Todo, TodoFormValues } from "../models/todo";
import { store } from "./store";

export default class TodoStore {
  todos: Todo[] = [];
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTodos(todos: Todo[] | [] = []) {
    this.todos = todos;
  }

  loadTodos = async (userId: string) => {
    this.loadingInitial = true;
    try {
      const result = await agent.Todos.getByUser(userId);
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

  loadTodosOfCurrentUser = () => {
    this.loadTodos(store.userStore.user!.id);
  };

  setLoadingInitial(state: boolean) {
    this.loadingInitial = state;
  }

  addTodo = async (todo: TodoFormValues) => {
    try {
      await agent.Todos.create(todo);
    } catch (err) {
      console.log(err);
    }
  };
}
