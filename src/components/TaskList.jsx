import { useMemo } from 'react';
import { ListChecks, SearchX } from 'lucide-react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, filter, sort, onRemove, onToggle }) {
  const processedTasks = useMemo(() => {
    const filtered = tasks.filter(
      (task) => filter === 'all' || (filter === 'completed' ? task.completed : !task.completed),
    );
    // filter devuelve un arreglo nuevo: sort no modifica el estado del reducer.
    return filtered.sort(
      (a, b) =>
        (sort === 'asc' ? 1 : -1) * a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }),
    );
  }, [tasks, filter, sort]);

  if (!processedTasks.length) {
    const empty = tasks.length === 0;
    const Icon = empty ? ListChecks : SearchX;
    return (
      <div className="empty-state" role="status">
        <Icon size={32} aria-hidden="true" />
        <h3>{empty ? 'Un nuevo comienzo' : 'Todo despejado por aquí'}</h3>
        <p>
          {empty
            ? 'Agrega tu primera tarea y empieza a avanzar.'
            : 'No hay tareas que coincidan con este filtro.'}
        </p>
      </div>
    );
  }
  return (
    <>
      <ul className="task-list" aria-label="Lista de tareas">
        {processedTasks.map((task) => (
          <TaskItem key={task.id} task={task} onRemove={onRemove} onToggle={onToggle} />
        ))}
      </ul>
      <div className="list-footer">
        <span>
          {processedTasks.length} de {tasks.length} tareas
        </span>
        <span>Haz espacio para tus próximos logros.</span>
      </div>
    </>
  );
}
