/* eslint-disable react/prop-types */

import { useState } from "react";

// Style for the strikethrough effect
const strikethroughStyle = {
  textDecoration: "line-through",
  color: "red",
};

function Task({ task, deleteTask }) {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  const handleClick = () => {
    deleteTask(task.id);
  };
  console.log(task);
  return (
    <div className="task-container">
      <p className="task-container-text">
        <input
          type="checkbox"
          className="checkbox"
          onChange={checkHandler}
        />
        {/* <p>The checkbox is {isChecked ? "checked" : "unchecked"}</p> */}

        {/* {isChecked ? task.text : "unchecked"} */}

        {/* {isChecked ? task.text : task.text.style.textDecoration = "line-through"} Why this doesn't work? */}

        {isChecked ? (
          <span style={strikethroughStyle}>{task.text} </span> // is there a way to use it just with help of css and not adding it to jsx
        ) : (
          task.text /// why like this and not {task.text} ?
        )}

        {/* {task.text} */}
      </p>
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
