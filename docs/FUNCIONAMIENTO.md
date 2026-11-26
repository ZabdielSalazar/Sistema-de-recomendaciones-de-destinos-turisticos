# Funcionamiento del recomendador turístico

Mapa inicial para Zabdi. Código observado el 26 de noviembre de 2026:
[588da3b8861f47d9b160ba3f29c16b0c784ac170](https://github.com/ZabdielSalazar/Sistema-de-recomendaciones-de-destinos-turisticos/commit/588da3b8861f47d9b160ba3f29c16b0c784ac170), main.
Solo se revisaron entradas HTML, scripts de conexión y contratos de datos; no se ejecutó la web.

| Proceso | Activador → resultado | Ficha |
| --- | --- | --- |
| Mapa de estados | Carga HTML y clic en estado → dibujo SVG y ficha local | [Mapa](funcionamiento/mapa.md) |
| Chat de recomendaciones | Enviar texto → filtrado por reglas sobre archivos TXT | [Chat](funcionamiento/chat.md) |

## Estado que importa al diagnosticar

El punto de entrada es Mapa con chatbot/index.html. **Referencia script_2.js,
pero ese archivo no existe en main**. Sí existe script.js con la lógica del chat:
no se puede dar por conectado por el solo hecho de estar versionado.
El mapa carga funciones_mapa_2.js; funciones_mapa.js y utilizados/ son variantes,
no la selección activa del HTML. Panel Administrador/index.html está vacío de lógica.

Solo se encontró main; no hay PR abierto, backend, manifiesto de dependencias,
CI ni configuración de despliegue en el árbol observado. No hay SHA publicado
verificable. Un servidor estático externo, si existe, no se infiere de GitHub.

## Checkpoint

Comparar este SHA con el nuevo main. Si cambian HTML, scripts activos, formato TXT
o coordenadas, actualizar únicamente la ficha correspondiente. El fallo de enlace
se documenta aquí sin modificar el código.
