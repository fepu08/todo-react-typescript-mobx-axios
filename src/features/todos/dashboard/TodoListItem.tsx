import React from "react";
import { Button, Form } from "react-bootstrap";
import { Todo } from "../../../app/models/todo";

interface Props {
  todo: Todo;
}

const checkOnClick = () => {
  console.log("update");
};

const TodoListItem = ({ todo }: Props) => {
  const { id, title, created_at, done } = todo;
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{new Date(created_at).toLocaleDateString()}</td>
      <td>
        <Form.Check
          type="checkbox"
          id={"done"}
          label={"done"}
          onClick={checkOnClick}
        />
      </td>
      <td>
        <Button variant="primary" className="text-white">
          <i className="fas fa-edit" />
        </Button>
      </td>
      <td>
        <Button variant="danger">
          <i className="fas fa-trash" />
        </Button>
      </td>
    </tr>
  );
};

export default TodoListItem;
