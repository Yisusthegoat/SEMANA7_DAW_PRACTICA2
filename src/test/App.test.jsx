import { StrictMode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { useLocalStorage } from '../hooks/useLocalStorage';
import tasksReducer, { demoTasks, initialState } from '../hooks/useTasksReducer';

function mount() {
  return render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
function rows() {
  return within(screen.getByRole('list', { name: 'Lista de tareas' })).getAllByRole('listitem');
}
function expectCounts(total, pending, completed) {
  expect(screen.getByTestId('total-count')).toHaveTextContent(String(total));
  expect(screen.getByTestId('pending-count')).toHaveTextContent(String(pending));
  expect(screen.getByTestId('completed-count')).toHaveTextContent(String(completed));
}

describe('Dashboard: recorridos funcionales', () => {
  it('rechaza vacío y espacios; agrega, limpia y enfoca; completa, revierte y elimina', async () => {
    const user = userEvent.setup();
    mount();
    const input = screen.getByLabelText('¿Qué tienes por hacer?');
    expect(input).toHaveFocus();
    expectCounts(5, 3, 2);
    await user.click(screen.getByRole('button', { name: 'Agregar tarea' }));
    expect(screen.getByRole('alert')).toHaveTextContent('no puede estar vacío');
    await user.type(input, '   ');
    await user.click(screen.getByRole('button', { name: 'Agregar tarea' }));
    expectCounts(5, 3, 2);
    await user.clear(input);
    await user.type(input, '  Analizar requisitos  ');
    await user.click(screen.getByRole('button', { name: 'Agregar tarea' }));
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
    expectCounts(6, 4, 2);
    const checkbox = screen.getByRole('checkbox', { name: 'Completar: Analizar requisitos' });
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expectCounts(6, 3, 3);
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expectCounts(6, 4, 2);
    await user.click(screen.getByRole('button', { name: 'Eliminar: Analizar requisitos' }));
    expect(screen.queryByText('Analizar requisitos')).not.toBeInTheDocument();
    expectCounts(5, 3, 2);
  });

  it('filtra los tres estados y ordena en ambas direcciones sin alterar contadores', async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole('button', { name: /^Pendientes/ }));
    expect(rows()).toHaveLength(3);
    expect(screen.getAllByRole('checkbox').every((box) => !box.checked)).toBe(true);
    await user.click(screen.getByRole('button', { name: /^Completadas/ }));
    expect(rows()).toHaveLength(2);
    expect(screen.getAllByRole('checkbox').every((box) => box.checked)).toBe(true);
    await user.click(screen.getByRole('button', { name: /^Todas/ }));
    expect(rows()).toHaveLength(5);
    const ascending = rows().map((row) => row.querySelector('.task-title').textContent);
    expect(ascending).toEqual([...ascending].sort((a, b) => a.localeCompare(b, 'es')));
    await user.selectOptions(screen.getByLabelText('Ordenar tareas'), 'desc');
    expect(rows().map((row) => row.querySelector('.task-title').textContent)).toEqual(
      [...ascending].reverse(),
    );
    await user.selectOptions(screen.getByLabelText('Ordenar tareas'), 'asc');
    expect(rows()[0]).toHaveTextContent(ascending[0]);
    expectCounts(5, 3, 2);
  });

  it('muestra vacío general y vacío de filtro', async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole('button', { name: /^Completadas/ }));
    for (const box of screen.getAllByRole('checkbox')) await user.click(box);
    expect(screen.getByText('No hay tareas que coincidan con este filtro.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^Todas/ }));
    for (const button of screen.getAllByRole('button', { name: /^Eliminar:/ }))
      await user.click(button);
    expect(screen.getByText('Agrega tu primera tarea y empieza a avanzar.')).toBeInTheDocument();
    expectCounts(0, 0, 0);
  });

  it('conserva el tema tras desmontar y volver a inicializar la aplicación', async () => {
    const user = userEvent.setup();
    const view = mount();
    await user.click(screen.getByRole('button', { name: 'Activar tema oscuro' }));
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(JSON.parse(localStorage.getItem('academico.theme'))).toBe('dark');
    view.unmount();
    mount();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    await user.click(screen.getByRole('button', { name: 'Activar tema claro' }));
    expect(JSON.parse(localStorage.getItem('academico.theme'))).toBe('light');
  });

  it('retira el mismo listener, conserva tareas y no duplica Alt+N en montajes repetidos', async () => {
    const add = vi.spyOn(window, 'addEventListener');
    const remove = vi.spyOn(window, 'removeEventListener');
    const debug = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const user = userEvent.setup();
    const view = mount();
    await user.type(screen.getByLabelText('¿Qué tienes por hacer?'), 'Persistir al ocultar');
    await user.click(screen.getByRole('button', { name: 'Agregar tarea' }));
    for (let cycle = 0; cycle < 3; cycle++) {
      await user.click(screen.getByRole('button', { name: 'Ocultar gestor' }));
      expect(screen.queryByLabelText('¿Qué tienes por hacer?')).not.toBeInTheDocument();
      debug.mockClear();
      fireEvent.keyDown(window, { key: 'n', altKey: true });
      expect(debug).not.toHaveBeenCalled();
      await user.click(screen.getByRole('button', { name: 'Mostrar gestor' }));
      expect(screen.getByText('Persistir al ocultar')).toBeInTheDocument();
      screen.getByRole('button', { name: 'Ocultar gestor' }).focus();
      debug.mockClear();
      fireEvent.keyDown(window, { key: 'n', altKey: true });
      expect(screen.getByLabelText('¿Qué tienes por hacer?')).toHaveFocus();
      expect(debug).toHaveBeenCalledTimes(1);
    }
    view.unmount();
    const registered = add.mock.calls.filter(([name]) => name === 'keydown').map(([, fn]) => fn);
    const retired = remove.mock.calls.filter(([name]) => name === 'keydown').map(([, fn]) => fn);
    expect(registered.length).toBeGreaterThan(3);
    expect(retired).toEqual(registered);
  });
});

describe('Reducer: pureza e inmutabilidad', () => {
  it('mantiene referencias no modificadas y no acepta títulos vacíos, IDs repetidos ni controles inválidos', () => {
    const items = demoTasks.map((task) => Object.freeze({ ...task }));
    const state = Object.freeze({ ...initialState, items: Object.freeze(items) });
    const next = tasksReducer(state, { type: 'TOGGLE', payload: 'demo-1' });
    expect(next.items[0]).not.toBe(state.items[0]);
    expect(next.items[1]).toBe(state.items[1]);
    expect(state.items[0].completed).toBe(false);
    expect(tasksReducer(state, { type: 'ADD', payload: { id: 'x', title: '   ' } })).toBe(state);
    expect(
      tasksReducer(state, { type: 'ADD', payload: { id: 'demo-1', title: 'Duplicado' } }),
    ).toBe(state);
    expect(tasksReducer(state, { type: 'FILTER', payload: 'invalid' })).toBe(state);
    expect(tasksReducer(state, { type: 'SORT', payload: 'invalid' })).toBe(state);
    expect(tasksReducer(state, { type: 'UNKNOWN' })).toBe(state);
  });
});

describe('useLocalStorage: contrato y errores', () => {
  it('recupera JSON, admite setter funcional y persiste', () => {
    localStorage.setItem('count', '2');
    const { result } = renderHook(() => useLocalStorage('count', 0));
    expect(result.current[0]).toBe(2);
    act(() => result.current[1]((previous) => previous + 1));
    expect(localStorage.getItem('count')).toBe('3');
  });
  it('tolera JSON corrupto y acceso/escritura denegados', () => {
    localStorage.setItem('broken', '{');
    const first = renderHook(() => useLocalStorage('broken', 'fallback'));
    expect(first.result.current[0]).toBe('fallback');
    first.unmount();
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const second = renderHook(() => useLocalStorage('denied', 'safe'));
    expect(second.result.current[0]).toBe('safe');
    act(() => second.result.current[1]('new'));
    expect(second.result.current[0]).toBe('new');
    expect(warn).toHaveBeenCalled();
  });
  it('normaliza un tema guardado de tipo incorrecto sin romper la interfaz', () => {
    localStorage.setItem('academico.theme', '{"unexpected":true}');
    mount();
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });
});
