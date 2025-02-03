import { useEffect, useState } from "react";

import Task from "./Task";
import TaskManager from "./TaskManager";
import { TaskType } from "./../types";

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

  const [editingTask, setEditingTask] = useState<TaskType | null>(
    null
  );

  const storedTasks: TaskType[] = JSON.parse(
    localStorage.getItem("tasks") || "[]"
  ) as TaskType[];
  const [tasks, setTasks] = useState<TaskType[]>(storedTasks || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // without line 27-28 the editing task text will not be displayed in input
    const oneEditingTask = tasks.find((element) => element.isEditing);
    setEditingTask(oneEditingTask || null);
  }, [tasks]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleEditChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (editingTask) {
      setEditingTask({ ...editingTask, text: event.target.value });
    }
    // allows to type in input
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: TaskType = {
      text: inputValue,
      id: uuidv4(),
      isChecked: false,
      isEditing: false,
      index: tasks.length,
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setInputValue("");
  };

  const handleEditSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const updatedTasks = tasks.map((updatedTask) => {
      if (editingTask && updatedTask.id === editingTask.id) {
        return { ...editingTask, isEditing: false } as TaskType;
      }
      return updatedTask; // if condition is not satisfied - return updatedTask
    });

    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const deleteTask = (idToRemove: string) => {
    // 2 variant solution
    const newTaskList = tasks.filter(
      (task) => task.id !== idToRemove
    );

    setTasks(newTaskList);
  };

  const toggleTask = (idToChange: string, isChecked: boolean) => {
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

  const editTask = (idToEdit: string, isEditing: boolean) => {
    const editedTask = tasks.map((itemToEdit) => {
      // if (itemToEdit.id === idToEdit) {
      //   return {
      //     ...itemToEdit,
      //     isEditing: isEditing,
      //   };
      // } else {
      //   return { ...itemToEdit, isEditing: false };
      // }
      return {
        ...itemToEdit,
        isEditing: itemToEdit.id === idToEdit ? isEditing : false,
      };
    });
    setTasks(editedTask);
  };

  return (
    <>
      <TaskManager
        handleEditSubmit={handleEditSubmit}
        handleChange={handleChange}
        handleEditChange={handleEditChange}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        editingTask={editingTask}
      />

      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          index={index}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))}
    </>
  );
}

export default Tasks;
