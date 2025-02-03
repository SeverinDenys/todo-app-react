import { TaskType } from "./../types";

type TaskManagerProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  handleEditChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editingTask: TaskType | null;
  handleEditSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function TaskManager({
  handleChange,
  inputValue,
  handleEditChange,
  editingTask,
  handleEditSubmit,
  handleSubmit,
}: TaskManagerProps) {
  return (
    <div className="container">
      <div className="tasks">
        <h1 className="tasks-title">Tasks Today</h1>
      </div>

      {/* Обработчик onSubmit теперь на форме */}
      <form
        onSubmit={editingTask ? handleEditSubmit : handleSubmit}
      >
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
              placeholder="edit your task here"
            />
          )}

          {/* Кнопка отправки теперь без onClick */}
          <button
            type="submit"
            className="input-add"
          >
            {editingTask ? "edit" : "add"}
          </button>
        </div>
      </form>
    </div>
  );
}
