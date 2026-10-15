export const initialState = { items: [], filter: 'all', sort: 'asc' };

export const demoTasks = [
  { id: 'demo-1', title: 'Diseñar el prototipo de la aplicación', completed: false },
  { id: 'demo-2', title: 'Leer el capítulo de React Hooks', completed: true },
  { id: 'demo-3', title: 'Preparar la exposición de Sistemas', completed: false },
  { id: 'demo-4', title: 'Resolver la práctica de Estadística', completed: false },
  { id: 'demo-5', title: 'Subir el informe de investigación', completed: true },
];

// No genera IDs ni realiza efectos. Los objetos no modificados conservan su referencia.
export default function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const title = action.payload.title.trim();
      if (!title || state.items.some((task) => task.id === action.payload.id)) return state;
      return {
        ...state,
        items: [...state.items, { id: action.payload.id, title, completed: false }],
      };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((task) => task.id !== action.payload) };
    case 'TOGGLE':
      return {
        ...state,
        items: state.items.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task,
        ),
      };
    case 'FILTER':
      return ['all', 'pending', 'completed'].includes(action.payload)
        ? { ...state, filter: action.payload }
        : state;
    case 'SORT':
      return ['asc', 'desc'].includes(action.payload) ? { ...state, sort: action.payload } : state;
    default:
      return state;
  }
}
