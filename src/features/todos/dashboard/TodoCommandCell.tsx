import React from "react";

const TodoCommandCell = (props) => {
  const { dataItem } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.id === undefined;

  const validation = !!dataItem.title;

  return inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-grid-save-command"
        style={{ backgroundColor: "#28a745", color: "white" }}
        disabled={!validation}
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
      >
        Edit
      </button>
      <button
        style={{ backgroundColor: "red", color: "white" }}
        className="k-button k-grid-remove-command "
        onClick={() => props.remove(dataItem)}
      >
        Remove
      </button>
    </td>
  );
};

export default TodoCommandCell;
