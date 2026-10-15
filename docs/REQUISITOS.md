# Trazabilidad de la práctica

## TODO del código base revisado en imágenes

| Página / archivo original       | TODO identificado                                                        | Implementación final                                                                                                                                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3 / `contexts/ThemeContext.jsx` | Inicializar con almacenamiento, aplicar tema, persistir y exponer toggle | `ThemeProvider` llama al hook persistente, aplica `data-theme` y comparte toggle; objeto separado en `theme-context.js` por Fast Refresh.                                                                                    |
| 3 / `hooks/useTasksReducer.js`  | Definir acciones y casos inmutables                                      | Estado inicial con `items`, `filter`, `sort`; reducer exportado por defecto con ADD, REMOVE, TOGGLE, FILTER y SORT.                                                                                                          |
| 4 / `hooks/useLocalStorage.js`  | Implementar hook que recibe clave y valor predeterminado                 | Inicialización perezosa, JSON protegido, efecto de escritura y setter funcional nativo.                                                                                                                                      |
| 4 / `components/TaskList.jsx`   | Derivar lista, estabilizar handlers y enfocar input                      | `useMemo` queda en lista; callbacks en Dashboard para llegar estables hasta TaskItem; ref, autofocus y shortcut pasan a TaskForm, donde está el input. Se corrige también el input directamente dentro del `ul` del ejemplo. |
| 5 / `App.jsx`                   | Conectar dispatch, handlers, lista y controles                           | `Dashboard` conecta acciones, estadísticas y visibilidad; `App` envuelve en ThemeProvider.                                                                                                                                   |

## Requisitos de la solicitud

| Nº  | Requisito             | Código / documentación / evidencia                                                                          |
| --- | --------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1   | Tema y alcance        | Dashboard en `App.jsx`; ejemplos en reducer y aviso visible.                                                |
| 2   | Leer PDF y TODO       | Las seis páginas revisadas; tabla anterior.                                                                 |
| 3   | Entorno y scripts     | `package.json`, lockfile, configuración Vite/ESLint; versiones en README.                                   |
| 4   | Arquitectura          | Archivos principales conservados y auxiliares en `src/components`.                                          |
| 5   | Reducer               | `useTasksReducer.js`; inmutabilidad y acciones probadas en `App.test.jsx`.                                  |
| 6   | Estado local          | `TaskForm.jsx` y visibilidad en Dashboard; razones en README.                                               |
| 7   | Contexto              | `ThemeContext.jsx`, `theme-context.js`, consumidor en App.                                                  |
| 8   | Hook personalizado    | `useLocalStorage.js`; contrato y errores en README y tests.                                                 |
| 9   | Efectos y limpieza    | Storage, proveedor y TaskForm; prueba del mismo listener con StrictMode y tres remontajes.                  |
| 10  | Referencia y foco     | `TaskForm.jsx`; comprobaciones automáticas de montaje, alta y Alt+N.                                        |
| 11  | Memoización           | TaskList, TaskItem y handlers en App; explicación y comparación pendiente en VALIDACION.                    |
| 12  | Interfaz              | CSS responsive, temas, semántica, labels, controles nativos, vacío y validación; revisión visual pendiente. |
| 13  | Lint y build          | Ambos ejecutados correctamente, dev con HTTP 200; resultados en README.                                     |
| 14  | Recorridos            | Nueve tests cubren los once recorridos y casos adicionales; recarga física pendiente.                       |
| 15  | Profiler y evidencias | `VALIDACION.md`, `evidencias/README.md`; sin métricas ni capturas inventadas.                               |
| 16  | README                | Entorno, estructura, hooks, estado, Mermaid, decisiones y resultados.                                       |
| 17  | GitHub y ADESA        | `.gitignore`, instrucciones adaptadas al remoto existente y WinRAR en README; no publicación.               |
| 18  | Entrega               | Proyecto implementado, pruebas y build; pendientes explícitos en documentación y respuesta final.           |

## Alcance de la verificación

Los tests usan React real sobre DOM simulado JSDOM y eventos de Testing Library. La prueba de persistencia desmonta y reinicializa App conservando localStorage: valida el contrato de arranque, pero no representa una captura de una recarga de Chrome. La prueba del shortcut cuenta invocaciones reales del listener y compara funciones registradas/retiradas; no es una captura de consola del navegador. No se realizaron mediciones de React DevTools.
