# Evidencias reales por obtener

Se conservan las salidas reales de las comprobaciones finales en `lint.txt`, `build.txt` y `tests.txt`. Son registros de terminal, no capturas de pantalla ni perfiles de React DevTools.

Esta carpeta se creó para tus capturas. Actualmente **no contiene capturas ni perfiles**: la automatización de Chrome quedó bloqueada antes de inspeccionar la interfaz. Las comprobaciones de terminal y DOM sí se ejecutaron, según README.

| Archivo sugerido             | Contenido que debes capturar                                                              |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| `01-dashboard-claro.png`     | Dashboard completo, ejemplos, contadores y tema claro.                                    |
| `02-dashboard-oscuro.png`    | La misma aplicación en oscuro.                                                            |
| `03-persistencia.png`        | Oscuro después de Ctrl+R, con Local Storage mostrando la clave y su JSON.                 |
| `04-eslint.png`              | Terminal con `npm run lint -- --max-warnings 0`, terminado sin errores ni advertencias.   |
| `05-build.png`               | Terminal con `npm run build` y build terminado.                                           |
| `06-tests.png`               | Terminal con nueve pruebas aprobadas.                                                     |
| `07-profiler-base.png`       | Profiler de la base con interacción y componentes visibles.                               |
| `08-profiler-optimizada.png` | Profiler bajo las mismas condiciones tras restaurar optimización.                         |
| `09-cleanup.png`             | Consola `[gestor]` con retiro al ocultar y una invocación por Alt+N tras varios montajes. |
| `10-movil.png`               | Dashboard a 375 px, sin desbordamiento, y controles operativos.                           |

Guardar también los perfiles exportados como `profiler-base.json` y `profiler-optimizada.json` si DevTools ofrece exportación. Usar nombres adicionales para cada repetición. No incluir información personal de otras pestañas, rutas sensibles ni tokens en las capturas. Añadir una breve explicación propia de cada evidencia. Consultar [VALIDACION](../VALIDACION.md) para la secuencia y condiciones de comparación.
