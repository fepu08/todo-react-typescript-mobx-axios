import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Todo, TodoFormValues } from "../models/todo";

export default class TodoStore {
  todos: Todo[] = [];
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTodos = (todos: Todo[] | [] = []) => {
    this.todos = todos;
  };

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
      // I loading all of the todos again
      // because the backend add the id to the new todo
      this.loadTodos();
    } catch (err) {
      console.log(err);
    }
  };

  editTodo = async (todo: Todo) => {
    try {
      await agent.Todos.edit(todo);
      runInAction(() => {
        let index = this.todos.findIndex((item) => item.id === todo.id);
        this.todos[index] = todo;
      });
    } catch (err) {
      console.log(err);
    }
  };

  deleteTodo = async (id: number) => {
    try {
      await agent.Todos.delete(id);
      runInAction(() => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      });
    } catch (err) {
      console.log(err);
    }
  };
}
