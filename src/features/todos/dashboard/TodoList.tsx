import { observer } from "mobx-react-lite";
import React from "react";
import { Spinner } from "react-bootstrap";
import { Todo } from "../../../app/models/todo";
import { useStore } from "../../../app/stores/store";

interface Props {
  todos: Todo[];
}

const TodoList = ({ todos }: Props) => {
  const { todoStore } = useStore();
  const { loadingInitial } = todoStore;

  if (loadingInitial)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Spinner animation="border" role="status" className="my-4"></Spinner>
        <h6>Loading Content ... </h6>
      </div>
    );

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
