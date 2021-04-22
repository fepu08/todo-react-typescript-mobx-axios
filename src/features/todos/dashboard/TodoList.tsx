import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";

const TodoList = () => {
  const {
    todoStore: { todos },
  } = useStore();

  if (todos === []) return <h3>Please create a TODO first</h3>;
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default observer(TodoList);
