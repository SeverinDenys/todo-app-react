import { useEffect, useState } from "react";

import Task from "./Task";
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(
    /[018]/g,
    (c) =>
      (
        +c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] &
          (15 >> (+c / 4)))
      ).toString(16)
  );
}

function Tasks() {
  const [inputValue, setInputValue] = useState("");

  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(storedTasks || []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTasks = [
      ...tasks,
      {
        text: inputValue,
        id: uuidv4(),
        isChecked: false,
        isEditing: false,
      },
    ];
    setTasks(newTasks);
    setInputValue("");
  };

  const deleteTask = (idToRemove) => {
    // 2 variant solution
    const newTaskList = tasks.filter(
      (task) => task.id !== idToRemove
    );

    setTasks(newTaskList);
  };

  const toggleTask = (idToChange, isChecked) => {
    const newTask = tasks.map((item) => {
      if (item.id === idToChange) {
        return {
          ...item,
          isChecked: isChecked,
        };
      } else return item;
    });
    setTasks(newTask);
  };

  const editTask = (idToEdit, isEditing) => {
    const editedTask = tasks.map((itemToEdit) => {
      if (itemToEdit.id === idToEdit) {
        return {
          ...itemToEdit,
          isEditing: isEditing,
        };
      } else return itemToEdit;
    });
    setTasks(editedTask);
    console.log("Edited Tasks:", editedTask);
  };

  return (
    <>
      <div className="container">
        <div className="tasks">
          <h1 className="tasks-title">Tasks Today</h1>
        </div>
        <div className="input">
          <input
            type="input"
            value={inputValue}
            onChange={handleChange}
            className="input-value"
            placeholder="add your task here"
          />

          <button
            type="submit"
            className="input-add"
            onClick={handleSubmit}
          >
            +
          </button>
        </div>
      </div>
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          index={index}
          toggleTask={toggleTask}
          editTask={editTask}
          inputValue={inputValue}
        />
      ))}
    </>
  );
}

export default Tasks;
