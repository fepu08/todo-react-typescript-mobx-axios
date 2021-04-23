import { observer } from "mobx-react-lite";
import React from "react";
import { Todo } from "../../../app/models/todo";
import { useStore } from "../../../app/stores/store";
import LoadingInitial from "../../../app/layout/LoadingInitial";
import TodoDone from "./TodoDone";
import { Table } from "react-bootstrap";
import TodoListItem from "./TodoListItem";

interface Props {
  todos: Todo[];
}

const TodoList = ({ todos }: Props) => {
  const { todoStore } = useStore();
  const { loadingInitial } = todoStore;

  if (loadingInitial) return <LoadingInitial />;

  if (todos.length < 1 && !loadingInitial) return <TodoDone />;

  return (
    <Table striped bordered hover>
      <thead>
        <th>#</th>
        <th>Title</th>
        <th>Created at</th>
        <th>Done</th>
        <th>Edit</th>
        <th>Delete</th>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </tbody>
    </Table>
  );
};

export default observer(TodoList);
