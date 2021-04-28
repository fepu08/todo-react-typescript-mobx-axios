import { observer } from "mobx-react-lite";
import React from "react";
import TodoInputForm from "../form/TodoInputForm";
import TodoList from "./TodoList";

const TodoDashboard = () => {
  return (
    <>
      <h1>Todos</h1>
      <TodoInputForm />
      <hr />
      <TodoList />
    </>
  );
};

export default observer(TodoDashboard);
