import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import TodoInputForm from "../form/TodoInputForm";
import TodoList from "./TodoList";

const TodoDashboard = () => {
  const { todoStore } = useStore();
  const { todos, loadTodos } = todoStore;

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return (
    <>
      <h1>Todos</h1>
      <TodoInputForm />
      <hr />
      <TodoList todos={todos} />
    </>
  );
};

export default observer(TodoDashboard);
