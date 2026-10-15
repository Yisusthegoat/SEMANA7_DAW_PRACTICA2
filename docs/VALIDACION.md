# Validación y evidencias

## Estado actual

Validación ejecutada el 15/10/2026: lint con cero advertencias, build correcto, nueve pruebas aprobadas y servidor dev con respuesta HTTP 200. Detalles en README y `src/test/App.test.jsx`. La interfaz no pudo inspeccionarse visualmente: Windows Computer Use detuvo la automatización porque no pudo determinar la URL con suficiente confianza. No se continuó automatizando Chrome.

Pendiente: revisión visual de escritorio/móvil, recarga física del navegador, capturas, React DevTools Profiler y entregas externas. No hay métricas ni imágenes de evidencia inventadas.

## Repetir comprobaciones automáticas

```powershell
npm ci
npm run lint -- --max-warnings 0
npm test
npm run build
npm run dev
```

Abrir la dirección indicada por Vite. Capturar por separado la terminal con lint y build terminados.

## Recorridos manuales

1. Recargar para comenzar con los cinco ejemplos. Confirmar 5 totales, 3 pendientes, 2 completadas y 40% de progreso.
2. Verificar foco inicial en “¿Qué tienes por hacer?”. Enviar vacío y luego solo espacios: aparece una explicación y los contadores no cambian.
3. Agregar `Analizar requisitos`. El título aparece recortado, quedan 6/4/2, el campo se vacía y conserva el foco.
4. Marcarla: 6/3/3. Volver a marcar: 6/4/2. Eliminarla: 5/3/2.
5. Probar Todas, Pendientes y Completadas. Deben verse 5, 3 y 2 filas; los contadores globales no cambian.
6. En Todas, ordenar A–Z y Z–A. Verificar inversión del orden y que no cambien las tareas ni los contadores.
7. Desmarcar todas las completadas bajo ese filtro: debe aparecer el vacío de filtro. Cambiar a Todas y eliminar todas: debe aparecer el vacío general y 0/0/0, con progreso 0%.
8. Recargar. Activar tema oscuro, capturar, recargar físicamente con Ctrl+R y confirmar que sigue oscuro. En DevTools → Application → Local Storage, la clave `academico.theme` debe contener `"dark"`. Repetir con claro. Las tareas vuelven a ejemplos, según lo documentado.
9. Añadir una tarea y ocultar/mostrar el gestor: debe conservar la tarea y el orden/filtro; el borrador sí se pierde. Confirmar autofocus al mostrarlo.
10. Probar navegación con Tab, Shift+Tab, Enter y Espacio. Cada control debe mostrar foco; el checkbox se alterna con Espacio. La eliminación se identifica por nombre accesible.
11. En DevTools, probar anchos 375, 768 y 1440 px y ambos temas. Revisar que no haya solapamientos, desbordamiento horizontal ni texto cortado; probar título de 180 caracteres.

## Cleanup verificable

1. Usar el servidor **dev**, abrir la consola de Chrome y habilitar nivel **Verbose/Detallado** para ver `console.debug`. Filtrar por `[gestor]`.
2. Recargar. StrictMode puede mostrar añadido → retirado → añadido durante el montaje inicial. Es esperado.
3. Limpiar la consola. Enfocar el botón “Ocultar gestor” y pulsar Alt+N: el foco debe ir al input y debe aparecer exactamente un mensaje `Alt+N: enfocar formulario`.
4. Ocultar el gestor: debe aparecer `cleanup: listener retirado`. Pulsar Alt+N: no debe aparecer el mensaje de foco de la aplicación.
5. Mostrarlo: se registra el listener; StrictMode puede repetir el ciclo inicial. Repetir ocultar/mostrar tres veces. Con el gestor visible, cada pulsación de Alt+N sigue produciendo un solo mensaje.
6. Capturar la secuencia y explicar que la misma función `handleKeyDown` se entrega a `addEventListener` y `removeEventListener`. En producción los diagnósticos no se incluyen.

Algunos sistemas reservan combinaciones de teclas. Si el sistema intercepta Alt+N, no interpretar esa ausencia como fuga del listener; repetir en otro navegador y contrastar con la prueba automatizada.

## React DevTools Profiler: medición pendiente

No fue posible utilizar React DevTools en esta sesión. Completar personalmente esta sección con resultados reales. No deducir rendimiento a partir de los nueve tests.

### Grabar la versión optimizada

1. Abrir la app en Chrome con React Developer Tools instalado desde la tienda oficial. Abrir DevTools → **Profiler**. Usar desarrollo en ambas versiones, con StrictMode activo en ambas.
2. En ajustes de DevTools, activar **Record why each component rendered while profiling**, si la versión instalada lo permite. Registrar versión del navegador, React DevTools, Node, viewport y modo dev.
3. Recargar para recuperar exactamente los cinco ejemplos. Dejar filtro Todas y orden ascendente. Esperar a que termine el arranque y el autofocus. No grabar el montaje inicial para esta comparación.
4. Pulsar **Record** (círculo), completar una sola vez `Diseñar el prototipo de la aplicación`, esperar a que se actualice la interfaz y pulsar **Stop**.
5. Seleccionar el commit de esa interacción. Revisar Flamegraph o Ranked, y **Why did this render?** en cada componente si está disponible.
6. Se espera trabajo en Dashboard, estadísticas, controles y lista; TaskItem de la tarea cambiada recibe un objeto nuevo. Las otras filas mantienen sus props y pueden quedar omitidas por memo. Verificarlo: no registrarlo como observado antes de medirlo. La escritura en el formulario, en otra grabación, debería actualizar TaskForm sin ejecutar Dashboard ni la lista.
7. Anotar commits, cantidad de TaskItem que renderizaron, duración de render del commit y duraciones por componente. Exportar el perfil real y capturar la pantalla.

### Comparación controlada base / optimizada

Hacerla después de guardar la versión final en un commit local. No publicar la variante temporal. La aplicación entregada permanece optimizada.

1. Registrar primero la versión optimizada anterior y su commit. Guardar respaldo del código o usar una rama local temporal.
2. Preparar una base con únicamente estos cambios: quitar el envoltorio `memo` de TaskItem, usar handlers corrientes de eliminar/completar en Dashboard y calcular la misma lista derivada sin `useMemo`. Conservar la lógica, CSS, dataset, StrictMode y comportamiento de las acciones.
3. Esperar a que termine Fast Refresh y **recargar**. Repetir exactamente el mismo estado inicial, filtro, orden e interacción. No comparar una grabación con StrictMode y otra sin él ni una versión dev con producción.
4. Grabar al menos cinco repeticiones por versión, recargando antes de cada una. Mantener mismo equipo, pestañas, viewport y throttling; alternar versiones si hace falta para reducir sesgos. Descartar y explicar grabaciones que incluyan montaje, HMR u otra interacción.
5. Comparar TaskItem renderizados y duraciones, además de commits. Puede haber igual número de commits en ambas versiones: las optimizaciones no prometen reducirlos. Con cinco tareas, una diferencia temporal pequeña puede ser ruido; no declarar mejora si no es consistente. Una prueba ampliada requiere el mismo conjunto fijo de tareas en ambas variantes y debe identificarse por separado.
6. Esta comparación global evalúa el conjunto de tres optimizaciones. Para atribuir un efecto a un hook específico, cambiar solo esa optimización entre dos versiones y repetir la medición. No atribuir automáticamente todo el ahorro a useMemo.
7. Restaurar la versión optimizada desde el respaldo o commit. Revisar `git diff` y volver a ejecutar lint, pruebas y build. Confirmar que la entrega usa React.memo, useMemo y los handlers useCallback originales.

### Hoja de resultados por completar

| Versión / repetición   | Estado e interacción                  | Commits   | TaskItem renderizados | Duración de render (ms) | Perfil/captura |
| ---------------------- | ------------------------------------- | --------- | --------------------- | ----------------------- | -------------- |
| Base / pendiente       | 5 ejemplos, Todas, asc, toggle demo-1 | Pendiente | Pendiente             | Pendiente               | Pendiente      |
| Optimizada / pendiente | Mismas condiciones                    | Pendiente | Pendiente             | Pendiente               | Pendiente      |

Agregar filas para cada repetición. Explicar con tus palabras qué cambió y qué no, indicando límites y variación de las mediciones. No usar capturas de otra aplicación ni valores hipotéticos.

## Capturas y entrega

La lista de nombres y contenido está en [evidencias/README.md](evidencias/README.md). Guardar las imágenes reales ahí, completar la hoja anterior y describir cada captura. README contiene los comandos adaptados al repositorio existente y la preparación del RAR con WinRAR. GitHub y ADESA requieren tu intervención; no se publicaron archivos.
