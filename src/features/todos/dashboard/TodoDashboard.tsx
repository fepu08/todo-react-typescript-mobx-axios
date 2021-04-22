// list todos
// add todo button
import React from "react";
import { Button } from "react-bootstrap";
import TodoList from "./TodoList";

const TodoDashboard = () => {
  return (
    <>
      <div className="d-ddddddflex justify-content-between my-3">
        <h1>Todos</h1>
      </div>
      <TodoList />
    </>
  );
};

export default TodoDashboard;
