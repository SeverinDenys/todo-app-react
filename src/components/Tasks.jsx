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
  const [tasks, setTasks] = useState(storedTasks);
  // const [newTask, setNewTask] = useState([]);

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
      },
    ];
    setTasks(newTasks);
    setInputValue("");
  };
  // console.log("tasks text", tasks[0].text);
  const deleteTask = (idToRemove) => {
    // 1 todo
    // create new array based on tasks but without task id = id to remove
    // 1 variant solution
    setTasks(tasks.filter((task) => task.id !== idToRemove));

    // 2 variant solution
    // const newTaskList = tasks.filter(
    //   (task) => task.id !== idToRemove
    // );

    // console.log(setTasks(newTaskList)); // why on delete it shows undefined?

    // 2 todo
    // set new state
    // write const newTask that will save the value. ? Didn't understand the task
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
          key={index}
          task={task}
          deleteTask={deleteTask}
          index={index}
        />
      ))}
    </>
  );
}

export default Tasks;
