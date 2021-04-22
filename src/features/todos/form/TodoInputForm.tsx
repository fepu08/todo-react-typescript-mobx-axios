import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { TodoFormValues } from "../../../app/models/todo";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

const TodoInputForm = () => {
  const { userStore, todoStore } = useStore();
  const [task, setTask] = useState("");

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    let newTodo: TodoFormValues = {
      id: uuid() as string,
      user_id: userStore.user!.id!,
      title: task,
    };
    todoStore.addTodo(newTodo);
  };

  return (
    <Form onSubmit={(e) => handleFormSubmit}>
      <Form.Group>
        <Form.Control
          type="task"
          value={task}
          placeholder="New Task"
          onChange={(e) => setTask(e.target.value)}
        />
      </Form.Group>
    </Form>
  );
};

export default observer(TodoInputForm);
