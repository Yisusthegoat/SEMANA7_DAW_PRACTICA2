import { memo } from 'react';
import { Trash2, Check } from 'lucide-react';

const TaskItem = memo(function TaskItem({ task, onRemove, onToggle }) {
  return (
    <li className={`task-item${task.completed ? ' is-completed' : ''}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Completar: ${task.title}`}
        />
        <span className="check-visual" aria-hidden="true">
          {task.completed && <Check size={14} strokeWidth={3} />}
        </span>
        <span className="task-title">{task.title}</span>
      </label>
      <span className={`status ${task.completed ? 'done' : 'pending'}`}>
        <span />
        {task.completed ? 'Completada' : 'Pendiente'}
      </span>
      <button
        type="button"
        className="icon-button delete"
        onClick={() => onRemove(task.id)}
        aria-label={`Eliminar: ${task.title}`}
        title="Eliminar tarea"
      >
        <Trash2 size={17} aria-hidden="true" />
      </button>
    </li>
  );
});

export default TaskItem;
