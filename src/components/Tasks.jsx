import { useEffect, useState } from "react";

import Task from "./Task";
import TaskManager from "./TaskManager";

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

  const [editingTask, setIditingTask] = useState("null");

  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(storedTasks || []);

  const [sortingOptions, setSortingOptions] = useState([
    {
      text: "By creation Date: from old to new",
      value: "1",
      selected: false,
    },
    {
      text: "By creation Date: from new to old",
      value: "2",
      selected: true,
    },
    {
      text: "By priority from High to Low",
      value: "3",
      selected: false,
    },
    {
      text: "BBy priority from Low to High",
      value: "4",
      selected: false,
    },
    {
      text: "By completion: Done first",
      value: "5",
      selected: false,
    },
    {
      text: "By completion: Undone first",
      value: "6",
      selected: false,
    },
  ]);

  const onSortingSelectChange = (event) => {
    changeOptionState(event.target.value);
  };

  const changeOptionState = (selectedValue) => {
    const changedOptionStates = sortingOptions.map((option) => {
      return {
        ...option,
        selected: option.value === selectedValue,
      };
    });
    console.log("Updated sorting options:", changedOptionStates);
    setSortingOptions(changedOptionStates);
  };

  const changePriorityTask = (idToChange, newPriority) => {
    console.log(idToChange, newPriority);
    const updatedPriorityTasks = tasks.map((task) => {
      if (task.id === idToChange) {
        return { ...task, priority: newPriority };
      } else {
        return task;
      }
    });
    setTasks(updatedPriorityTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // without line 27-28 the editing task text will not be displayed in input
    const oneEditingTask = tasks.find((element) => element.isEditing);
    setIditingTask(oneEditingTask);
  }, [tasks]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEditChange = (event) => {
    // allows to type in input
    setIditingTask({ ...editingTask, text: event.target.value });
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
        priority: "medium",
      },
    ];
    setTasks(newTasks);
    setInputValue("");
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    // перемапити всі таски і зробити мап який був раніше
    const updatedTasks = tasks.map((updatedTask) => {
      // якщо ітем ід = едітінг таск ід то заміняємо на едітінг таск
      if (updatedTask.id === editingTask.id) {
        return { ...editingTask, isEditing: false };
        // в іншому випадку повертаємо таску яка була
      } else {
        return updatedTask;
      }
    });

    setTasks(updatedTasks);
    setIditingTask(null);
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
    console.log("Edited Tasks:", editedTask);
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

      <div className="select">
        <select
          onChange={onSortingSelectChange}
          name="sorting"
          className="select"
        >
          {sortingOptions.map((sortingOption) => {
            return (
              <option
                key={sortingOption.value}
                selected={sortingOption.selected}
              >
                {sortingOption.text}
              </option>
            );
          })}
        </select>
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
          changePriorityTask={changePriorityTask}
        />
      ))}
    </>
  );
}

export default Tasks;
