# Mapa y fichas de estados

Propósito: dibujar estados y mostrar ventanas informativas. Activador: cargar
Mapa con chatbot/index.html y seleccionar un estado. SHA y límites de revisión:
[índice](../FUNCIONAMIENTO.md).

## Contratos

Todo se resuelve en el navegador; no hay autenticación propia.

| Quién → quién | Requisito y entrada | Salida y errores |
| --- | --- | --- |
| HTML → funciones_mapa_2.js | DOM con los IDs abreviados BC, BCS, YUC, QRO, etc. | Registro de eventos y creación de ventanas por estado |
| XMLHttpRequest → coordenadas_estados.txt | GET relativo desde la misma carpeta, sin cuerpo ni campos opcionales. Se exige status 200 y JSON con claves de estado como jalisco, yucatan o bajaCalifornia; valor string para atributo SVG d | Cada valor se asigna al path con ID correspondiente. Otro HTTP: error de consola. JSON inválido o ID ausente: excepción no normalizada |
| Clic/funciones de estado → DOM | ID de estado y elementos de ventana creados por el script | Panel con contenido e imágenes predefinidas; no consulta datos de un proveedor turístico |

coordenadas_estados.txt tiene extensión TXT, pero su consumidor exige JSON.
No confundir QRO (Quintana Roo en esta implementación) con una abreviatura nueva.
El HTML conserva atributos id repetidos en varios paths: comprobar el DOM real
si una selección no encuentra el estado esperado.

## Datos, límites y evidencia

Las coordenadas, textos e imágenes se solicitan como archivos de la web.
Algunas fichas contienen imágenes externas: su carga depende de esos destinos;
no demuestra conexión a una API. No hay modelos, tokens, llamadas de inferencia,
RPM/TPM/RPD, cuotas comerciales ni fallback. Una solicitud XHR de coordenadas por
carga; no se configura timeout ni reintento propio. No hay limpieza, persistencia
de usuario o cancelación de aplicación observada. Recargar reinicia el DOM.

| Síntoma | Primer archivo y comprobación |
| --- | --- |
| Mapa vacío | funciones_mapa_2.js: respuesta de coordenadas, JSON y coincidencia de claves/IDs |
| Ficha no aparece | index.html y función del estado: ID efectivo del DOM y evento |
| Imagen rota | Ruta de imagen de la ficha; distinguir recurso local de host externo |
| Modificar un script no cambia la página | Revisar los dos src activos del HTML; funciones_mapa.js no es el activo |

Evidencia: lectura estática de HTML y del inicio/contratos de funciones_mapa_2.js.
No se acredita funcionamiento de cada estado ni disponibilidad de imágenes.
Siguiente paso: una revisión separada del enlace de scripts y del DOM, antes de
atribuir fallos a hosting o datos.
