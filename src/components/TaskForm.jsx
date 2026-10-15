import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    function handleKeyDown(event) {
      if (event.altKey && !event.ctrlKey && !event.metaKey && event.key.toLowerCase() === 'n') {
        event.preventDefault();
        inputRef.current?.focus();
        if (import.meta.env.DEV) console.debug('[gestor] Alt+N: enfocar formulario');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    if (import.meta.env.DEV) console.debug('[gestor] listener añadido');
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (import.meta.env.DEV) console.debug('[gestor] cleanup: listener retirado');
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) {
      setError('Escribe un título; no puede estar vacío ni contener solo espacios.');
      inputRef.current?.focus();
      return;
    }
    onAdd(title.trim());
    setTitle('');
    setError('');
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="task-form" noValidate>
      <div className="label-line">
        <label htmlFor="task-title">¿Qué tienes por hacer?</label>
        <span className="shortcut">
          <kbd>Alt</kbd> + <kbd>N</kbd>
        </span>
      </div>
      <div className="input-group">
        <input
          id="task-title"
          ref={inputRef}
          value={title}
          maxLength={180}
          placeholder="Por ejemplo: preparar la exposición del viernes"
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) setError('');
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'task-error' : 'task-hint'}
          autoComplete="off"
        />
        <button className="button primary" type="submit">
          <Plus size={18} aria-hidden="true" />
          Agregar tarea
        </button>
      </div>
      {error ? (
        <p id="task-error" className="error" role="alert">
          {error}
        </p>
      ) : (
        <p id="task-hint" className="hint">
          Un pequeño paso hoy, un objetivo menos para mañana.
        </p>
      )}
    </form>
  );
}
