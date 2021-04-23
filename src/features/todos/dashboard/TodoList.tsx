import { observer } from "mobx-react-lite";
import React from "react";
import { Todo } from "../../../app/models/todo";

interface Props {
  todos: Todo[];
}

const TodoList = ({ todos }: Props) => {
  if (todos.length < 1) return <h3>Please create a TODO first</h3>;
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default observer(TodoList);
