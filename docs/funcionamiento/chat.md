# Chat de recomendaciones por reglas

Propósito: proponer lugares, playas o lagos por ubicación y preferencias.
El código está en script.js, pero la entrada HTML apunta a un script inexistente:
el proceso está **presente en fuentes y no conectado en ese HTML**.
Referencia de código: [índice](../FUNCIONAMIENTO.md).

## Contratos locales

| Quién → quién | Entrada requerida y opcional | Resultado / fallos |
| --- | --- | --- |
| Botón Enviar o Enter → obtenerRespuesta() | Texto de #user-input; DOM con #chat-log. No autenticación | Lee texto, muestra consulta y resultado, vacía el input. Si script.js no se cargó: obtenerRespuesta no definida |
| script.js → archivos lugares.txt, playas.txt y lagos.txt | Un GET por archivo; sin body. Cabecera de estado: barra vertical + nombre + barra vertical. Registro: nombre*temperatura*distancia-; números no negativos con punto decimal, según regex de procesarLinea() | bancoDatos por categoría y estado con nombre, temperatura y ubicacionCentroCiudad. Línea no reconocida o carga fallida: consola; no error tipado para UI |
| procesarConsulta() → funciones de categoría | String normalizado; categoría obligatoria reconocida: lugar/sitio, playa o lago/laguna. Estado y preferencias son opcionales | Texto de recomendación o de ausencia de coincidencias. Selección aleatoria cuando corresponde |

## Reglas y límites que explican errores

- Se eliminan diacríticos y se pasa a minúsculas; algunos nombres de ciudades
  se sustituyen por el estado. La prioridad es lugar/sitio, luego playa, luego lago.
- Los sinónimos de cercanía se traducen a 15 y lejanía a 16; el filtro compara
  con la distancia almacenada. No son kilómetros obtenidos de un servicio en vivo.
- Temperatura y clima son reglas y datos estáticos. No hay IA generativa,
  búsqueda web de destinos, pronóstico actualizado ni selección de modelo.
- Las tres cargas arrancan por separado sin una barrera de «datos listos».
  currentEstado es global compartido entre categorías. Una consulta temprana
  o un registro antes de cabecera puede producir errores o resultados incompletos.
- No se comprueba response.ok al cargar TXT. Una página de error puede llegar
  al parser como texto; comprobar transporte antes de investigar las reglas.
- Algunas búsquedas aleatorias repiten while hasta hallar candidatos sin techo
  de iteraciones. Si ningún estado cumple, no hay garantía de terminación.
- mostrarMensaje() inserta HTML tras sustituciones de formato, también para la
  consulta del usuario. No tratar esa salida como texto escapado.

No hay tamaño máximo de consulta, timeout de carga, reintentos acotados,
idempotencia, cancelación o almacenamiento duradero implementados aquí.
Conversación y banco quedan en memoria/DOM hasta recargar.
Llamadas al modelo, tokens y RPM/TPM/RPD: cero/no aplican. No se midió rendimiento.
No se afirma ningún límite de plataforma o servidor externo.

| Síntoma | Primer archivo y comprobación |
| --- | --- |
| Enviar/Enter falla | index.html: src script_2.js frente a script.js existente |
| No hay candidatos | script.js, cargarYProcesarArchivo(): status/cuerpo y banco cargado; luego procesarLinea() |
| Se queda ocupado | obtenerInformacionLugar/Playa/Lago: bucles aleatorios y conjuntos vacíos |
| Respuesta incorrecta | procesarConsulta(), normalización, prioridad de categoría y filtro real |

Inspección estática; sin navegador ni pruebas funcionales en esta revisión.
Siguiente paso pequeño: decidir en otro encargo si script.js es la entrada deseada;
documentar después el resultado, sin dar esta propuesta por implementada.
