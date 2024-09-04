/* eslint-disable react/prop-types */
import RadioButtonGroup from "./RadioButtonGroup";

// Style for the strikethrough effect
const strikeThroughStyle = {
  textDecoration: "line-through",
  color: "red",
};

function Task({
  task,
  deleteTask,
  toggleTask,
  editTask,
  changePriorityTask,
}) {
  const checkHandler = () => {
    toggleTask(task.id, !task.isChecked);
  };

  const editHandler = () => {
    editTask(task.id, !task.isEditing);
  };

  // const changeContainerBG = {
  //   background: task.isEditing ? "yellow" : "white",
  // };

  const handleClick = () => {
    deleteTask(task.id);
  };

  // const handlePriorityChange = () => {
  //   changePriorityTask(task.id); // how to get the priority value?)
  // };

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
            <span style={strikeThroughStyle}>{task.text} </span> // is there a way to use it just with help of css and not adding it to jsx
          ) : (
            task.text /// why like this and not {task.text} ?
          )}
        </p>
        <RadioButtonGroup
          changePriorityTask={changePriorityTask}
          taskId={task.id}
          priority={task.priority}
        />
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

      {/* <RadioButtonGroup /> */}
    </>
  );
}

export default Task;
