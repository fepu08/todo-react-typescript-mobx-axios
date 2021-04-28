import React, { useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { Todo } from "../../../app/models/todo";
import { useStore } from "../../../app/stores/store";

interface Props {
  todo: Todo;
}

const TodoListItem = ({ todo }: Props) => {
  const { id, title, created_at, done } = todo;
  const { todoStore } = useStore();

  const checkOnClick = useCallback(() => {
    todoStore.editTodo({ ...todo, done: !done });
  }, [todo, todoStore, done]);

  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{new Date(created_at).toLocaleDateString()}</td>
      <td>
        <Form.Check
          type="checkbox"
          id={"done"}
          onChange={checkOnClick}
          checked={done}
        />
      </td>
      <td>
        <Button variant="primary" className="text-white mr-1">
          <i className="fas fa-edit" />
        </Button>
        <Button variant="danger" className="ml-1">
          <i className="fas fa-trash" />
        </Button>
      </td>
    </tr>
  );
};

export default TodoListItem;
