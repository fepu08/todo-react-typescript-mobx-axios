import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../app/stores/store";

const TodoCommandCell = (props) => {
  const { todoStore } = useStore();
  const { loadingId } = todoStore;

  const { dataItem } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.id === undefined;

  const validation = !!dataItem.title;

  return inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-grid-save-command"
        style={{ backgroundColor: "#28a745", color: "white" }}
        disabled={!validation || loadingId === dataItem.id}
        onClick={() =>
          isNewItem ? props.add(dataItem) : props.update(dataItem)
        }
      >
        {isNewItem ? "Add" : "Update"}
      </button>
      <button
        className="k-button k-grid-cancel-command"
        onClick={() =>
          isNewItem ? props.discard(dataItem) : props.cancel(dataItem)
        }
      >
        {isNewItem ? "Discard" : "Cancel"}
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <button
        className="k-primary k-button k-grid-edit-command"
        onClick={() => props.edit(dataItem)}
        disabled={loadingId === dataItem.id}
      >
        Edit
      </button>
      <button
        style={{ backgroundColor: "#dc3545", color: "white" }}
        className="k-button k-grid-remove-command "
        onClick={() => props.remove(dataItem)}
        disabled={loadingId === dataItem.id}
      >
        Remove
      </button>
    </td>
  );
};

export default observer(TodoCommandCell);
