import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import LoadingInitial from "../../../app/layout/LoadingInitial";
import TodoDone from "./TodoDone";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import TodoCommandCell from "./TodoCommandCell";

const TodoList = () => {
  const { todoStore, userStore } = useStore();
  const {
    loadingInitial,
    todos,
    setTodos,
    addTodo,
    editTodo,
    deleteTodo,
    loadTodos,
  } = todoStore;
  const editField = "inEdit";
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const CommandCell = (props) => (
    <TodoCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );

  const enterEdit = (dataItem) => {
    const newData = todos.map((item) =>
      item.id === dataItem.id ? { ...item, inEdit: true } : item
    );
    setTodos(newData);
  };

  const remove = async (dataItem) => {
    deleteTodo(dataItem.id);
  };

  const onItemChange = (e) => {
    const newData = todos.map((todo) =>
      todo.id === e.dataItem.id ? { ...todo, [e.field]: e.value } : { ...todo }
    );
    setTodos(newData);
  };

  const update = async (dataItem) => {
    delete dataItem.inEdit;
    editTodo(dataItem).then(() => setTodos(todos));
  };

  const add = (dataItem) => {
    setAddingNew(false);
    dataItem.inEdit = true;
    addTodo(dataItem);
  };

  const addNew = () => {
    if (addingNew) return;
    else {
      setAddingNew(true);
      const newDataItem = {
        id: undefined,
        userId: userStore.user.id,
        title: "",
        created_at: new Date(),
        inEdit: true,
      };
      setTodos([newDataItem, ...todos]);
    }
  };

  const discard = (dataItem) => {
    setAddingNew(false);
    const newData = [...todos];
    newData.splice(0, 1);
    setTodos(newData);
  };

  const cancel = (dataItem) => {
    const originalItem = todos.find((todo) => todo.id === dataItem.id);
    console.log(originalItem);
    setTodos(
      todos.map((todo) =>
        todo.id === originalItem.id
          ? {
              id: originalItem.id,
              userId: originalItem.userId,
              title: originalItem.title,
              created_at: originalItem.created_at,
              done: originalItem.done,
            }
          : todo
      )
    );
  };

  if (loadingInitial) return <LoadingInitial />;

  if (todos.length < 1 && !loadingInitial) return <TodoDone />;

  return (
    <>
      <Grid
        data={todos.map((todo) => ({
          ...todo,
          created_at: new Date(todo.created_at),
        }))}
        editField={editField}
        onItemChange={onItemChange}
      >
        <GridToolbar>
          <button
            title="Add new"
            className="k-button k-primary"
            onClick={addNew}
          >
            Add new
          </button>
        </GridToolbar>
        <Column field="id" title="ID" width="40px" editable={false} />
        <Column field="title" title="Task" editor="text" />
        <Column
          field="created_at"
          title="Created At"
          width="200px"
          editor="date"
          format="{0:yyyy-MM-dd}"
        />
        <Column width="100px" field="done" title="Done" editor="boolean" />
        <Column cell={CommandCell} width="200px" />
      </Grid>
    </>
  );
};

export default observer(TodoList);
