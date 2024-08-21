/* eslint-disable react/prop-types */

function Task({ task, deleteTask }) {
  const handleClick = () => {
    deleteTask(task.id);
  };
  console.log(task);
  return (
    <div className="task-container">
      <p className="task-container-text">{task.text}</p>
      <div className="image-container">
        <img
          src="public/images/icons-edit.png"
          alt="Edit icon"
          className="icon"
        />
        <img
          src="public/images/icons-delete.png"
          alt="delete icon"
          className="icon"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Task;
