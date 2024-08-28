/* eslint-disable react/prop-types */
export default function TaskManager({ handleChange, inputValue, handleEditChange, editingTask, handleEditSubmit, handleSubmit }) {
  return (
    <div className="container">
      <div className="tasks">
        <h1 className="tasks-title">Tasks Today</h1>
      </div>
      <div className="input">
        {!editingTask && (
          <input
            type="input"
            value={inputValue}
            onChange={handleChange}
            className="input-value"
            placeholder="add your task here"
          />
        )}
        {editingTask && (
          <input
            type="input"
            value={editingTask.text}
            onChange={handleEditChange}
            className="input-value"
            placeholder="add your task here"
          />
        )}

        <button
          type="submit"
          className="input-add"
          onClick={editingTask ? handleEditSubmit : handleSubmit}
        >
          {editingTask ? "edit" : "add"}
        </button>
      </div>
    </div>
  );
}
