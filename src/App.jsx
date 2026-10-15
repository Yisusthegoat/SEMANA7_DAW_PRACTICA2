import { useCallback, useContext, useReducer, useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeContext } from './contexts/theme-context';
import tasksReducer, { demoTasks, initialState } from './hooks/useTasksReducer';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';

function Dashboard() {
  const [state, dispatch] = useReducer(tasksReducer, { ...initialState, items: demoTasks });
  const [showManager, setShowManager] = useState(true);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const completed = state.items.filter((task) => task.completed).length;
  const total = state.items.length;
  const pending = total - completed;

  const handleRemove = useCallback((id) => dispatch({ type: 'REMOVE', payload: id }), []);
  const handleToggle = useCallback((id) => dispatch({ type: 'TOGGLE', payload: id }), []);

  function handleAdd(title) {
    const id = crypto.randomUUID();
    dispatch({ type: 'ADD', payload: { id, title } });
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#main">
            <span className="brand-symbol">
              <GraduationCap size={24} aria-hidden="true" />
            </span>
            Académico<span className="brand-dot">.</span>
          </a>
          <span className="header-divider" />
          <span className="header-caption">Tu espacio para avanzar</span>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Activar tema oscuro' : 'Activar tema claro'}
          >
            {theme === 'light' ? (
              <Moon size={18} aria-hidden="true" />
            ) : (
              <Sun size={18} aria-hidden="true" />
            )}
            <span>{theme === 'light' ? 'Tema oscuro' : 'Tema claro'}</span>
          </button>
        </div>
      </header>

      <main id="main" className="main-content">
        <div className="breadcrumb">
          <LayoutDashboard size={15} aria-hidden="true" />
          Mi espacio<span>/</span>
          <strong>Dashboard</strong>
        </div>
        <section className="page-heading">
          <div>
            <p className="eyebrow">ORGANIZA. ENFÓCATE. AVANZA.</p>
            <h1>
              Tu próximo logro empieza aquí<span>.</span>
            </h1>
            <p>Tus tareas académicas, en orden. Tu mente, en lo que importa.</p>
          </div>
          <span className="workspace-badge">
            <span />
            Espacio personal
          </span>
        </section>
        <TaskStats total={total} pending={pending} completed={completed} />

        <div className="workspace-grid">
          <section className="manager-card" aria-labelledby="manager-title">
            <div className="section-heading">
              <div>
                <h2 id="manager-title">
                  <BookOpen size={21} aria-hidden="true" />
                  Mis tareas
                </h2>
                <p>Un lugar para organizar todo lo que viene.</p>
              </div>
              <button
                className="button subtle"
                type="button"
                onClick={() => setShowManager((current) => !current)}
                aria-expanded={showManager}
                aria-controls="task-manager"
              >
                {showManager ? (
                  <EyeOff size={16} aria-hidden="true" />
                ) : (
                  <Eye size={16} aria-hidden="true" />
                )}
                <span>{showManager ? 'Ocultar gestor' : 'Mostrar gestor'}</span>
              </button>
            </div>
            {showManager ? (
              <div id="task-manager">
                <TaskForm onAdd={handleAdd} />
                <TaskFilters
                  filter={state.filter}
                  sort={state.sort}
                  counts={{ all: total, pending, completed }}
                  onFilter={(value) => dispatch({ type: 'FILTER', payload: value })}
                  onSort={(value) => dispatch({ type: 'SORT', payload: value })}
                />
                <TaskList
                  tasks={state.items}
                  filter={state.filter}
                  sort={state.sort}
                  onRemove={handleRemove}
                  onToggle={handleToggle}
                />
              </div>
            ) : (
              <div id="task-manager" className="empty-state">
                <EyeOff size={30} aria-hidden="true" />
                <h3>Una pausa para enfocarte</h3>
                <p>Tus tareas siguen aquí. Muestra el gestor cuando quieras continuar.</p>
              </div>
            )}
          </section>

          <aside className="sidebar" aria-label="Tu espacio de estudio">
            <div className="focus-card">
              <div className="focus-top">
                <span className="focus-icon">
                  <Sparkles size={20} aria-hidden="true" />
                </span>
                <span>UN PASO A LA VEZ</span>
              </div>
              <h2>
                El progreso se
                <br />
                construye cada día.
              </h2>
              <p>
                No necesitas hacerlo todo hoy.
                <br />
                Empieza con una tarea y sigue adelante.
              </p>
              <div className="focus-art" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="art-step step-one" />
                <div className="art-step step-two" />
                <div className="art-step step-three">
                  <ArrowUpRight size={37} />
                </div>
                <span className="art-spark">✦</span>
              </div>
              <span className="focus-bottom">Cada tarea cuenta.</span>
            </div>
            <div className="demo-note">
              <span className="demo-label">
                <span />
                DATOS DE DEMOSTRACIÓN
              </span>
              <h3>Este espacio es tuyo</h3>
              <p>
                Empiezas con 5 tareas de ejemplo. Puedes completarlas, eliminarlas y agregar las
                tuyas.
              </p>
              <p className="note-small">
                Las tareas se reinician al recargar. Tu preferencia de tema se conserva.
              </p>
            </div>
          </aside>
        </div>
        <footer className="site-footer">
          <span>
            <GraduationCap size={16} aria-hidden="true" />
            Académico · Hecho para avanzar
          </span>
          <span>Menos pendientes, más posibilidades.</span>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
