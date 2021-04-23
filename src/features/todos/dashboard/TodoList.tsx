import { observer } from "mobx-react-lite";
import React from "react";
import { Todo } from "../../../app/models/todo";
import { useStore } from "../../../app/stores/store";
import LoadingInitial from "../../../app/layout/LoadingInitial";

interface Props {
  todos: Todo[];
}

const TodoList = ({ todos }: Props) => {
  const { todoStore } = useStore();
  const { loadingInitial } = todoStore;

  if (loadingInitial) return <LoadingInitial />;

  if (todos.length < 1 && !loadingInitial)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <i className="fas fa-trophy fa-10x" />
        <h3>Everything is done</h3>
      </div>
    );
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default observer(TodoList);
