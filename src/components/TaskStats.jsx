import { CheckCheck, ClipboardList, Clock3, TrendingUp } from 'lucide-react';

export default function TaskStats({ total, pending, completed }) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return (
    <section className="stats-grid" aria-label="Resumen de tareas" aria-live="polite">
      <article className="stat-card">
        <div>
          <span className="stat-label">Tareas totales</span>
          <strong data-testid="total-count">
            {total}
            <span>en tu agenda</span>
          </strong>
        </div>
        <span className="stat-icon indigo">
          <ClipboardList size={22} aria-hidden="true" />
        </span>
      </article>
      <article className="stat-card">
        <div>
          <span className="stat-label">Pendientes</span>
          <strong data-testid="pending-count">
            {pending}
            <span>por completar</span>
          </strong>
        </div>
        <span className="stat-icon amber">
          <Clock3 size={22} aria-hidden="true" />
        </span>
      </article>
      <article className="stat-card">
        <div>
          <span className="stat-label">Completadas</span>
          <strong data-testid="completed-count">
            {completed}
            <span>¡buen trabajo!</span>
          </strong>
        </div>
        <span className="stat-icon green">
          <CheckCheck size={22} aria-hidden="true" />
        </span>
      </article>
      <article className="stat-card progress-card">
        <div>
          <span className="stat-label">Tu progreso</span>
          <strong>
            {percent}
            <span className="percent">%</span>
          </strong>
          <progress value={completed} max={total || 1} aria-label="Progreso de tareas" />
        </div>
        <span className="stat-icon violet">
          <TrendingUp size={22} aria-hidden="true" />
        </span>
      </article>
    </section>
  );
}
