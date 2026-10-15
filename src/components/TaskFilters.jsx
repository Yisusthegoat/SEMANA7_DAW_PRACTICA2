import { ArrowDownAZ } from 'lucide-react';

const filters = [
  ['all', 'Todas'],
  ['pending', 'Pendientes'],
  ['completed', 'Completadas'],
];

export default function TaskFilters({ filter, sort, counts, onFilter, onSort }) {
  return (
    <div className="task-toolbar">
      <div className="filters" role="group" aria-label="Filtrar tareas">
        {filters.map(([value, label]) => (
          <button
            type="button"
            key={value}
            aria-pressed={filter === value}
            onClick={() => onFilter(value)}
          >
            {label}
            <span>{counts[value]}</span>
          </button>
        ))}
      </div>
      <div className="sort-control">
        <ArrowDownAZ size={17} aria-hidden="true" />
        <label htmlFor="task-sort" className="sr-only">
          Ordenar tareas
        </label>
        <select id="task-sort" value={sort} onChange={(event) => onSort(event.target.value)}>
          <option value="asc">Título: A → Z</option>
          <option value="desc">Título: Z → A</option>
        </select>
      </div>
    </div>
  );
}
