/* eslint-disable react/prop-types */

import { TaskType } from "./../types";

type TaskProps = {
  task: TaskType;
  deleteTask: (idToRemove: string) => void;
  toggleTask: (idToChange: string, isChecked: boolean) => void;
  editTask: (idToEdit: string, isEditing: boolean) => void;
  index: number;
};

// Style for the strikethrough effect
const strikeThroughStyle = {
  textDecoration: "line-through",
  color: "red",
};

function Task({ task, deleteTask, toggleTask, editTask }: TaskProps) {
  const checkHandler = () => {
    toggleTask(task.id, !task.isChecked);
  };

  const editHandler = () => {
    editTask(task.id, !task.isEditing);
  };

  const handleClick = () => {
    deleteTask(task.id);
  };

  return (
    <>
      <div
        className={`task-container ${
          task.isEditing ? "task-container-editing" : ""
        }`}
      >
        <p className="task-container-text">
          <input
            type="checkbox"
            checked={task.isChecked}
            className="checkbox"
            onChange={checkHandler}
          />

          {task.isChecked ? (
            <span style={strikeThroughStyle}>{task.text} </span>
          ) : (
            task.text
          )}
        </p>

        <div className="image-container">
          <img
            src="public/images/icons-edit.png"
            alt="Edit icon"
            className="icon"
            onClick={editHandler}
          />
          <img
            src="public/images/icons-delete.png"
            alt="delete icon"
            className="icon"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
}

export default Task;
