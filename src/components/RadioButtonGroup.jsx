/* eslint-disable react/prop-types */

export default function RadioButtonGroup({
  changePriorityTask,
  taskId,
  priority,
}) {
  console.log(taskId);
  console.log(priority);
  return (
    <div className="radioButtonGroup">
      <form>
        <input
          type="radio"
          name="options"
          value="high"
          id="priorityHigh"
          // onChange={() => {}} // функція заглушка
          onChange={() => changePriorityTask(taskId, "high")} // функція заглушка
          checked={priority === "high"}
        />
        <label htmlFor="priorityHigh">High</label>
        <input
          type="radio"
          name="options"
          value="medium"
          id="priorityMedium"
          onChange={() => changePriorityTask(taskId, "medium")}
          checked={priority === "medium"}
        />
        <label htmlFor="priorityMedium">Medium</label>
        <input
          type="radio"
          name="options"
          value="low"
          id="priorityLow"
          onChange={() => changePriorityTask(taskId, "low")}
          checked={priority === "low"}
        />
        <label htmlFor="priorityLow">Low</label>
      </form>
    </div>
  );
}
