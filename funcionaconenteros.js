document.addEventListener('DOMContentLoaded', function () {
  // Inicializar el chat cuando la página esté cargada
  iniciarChat();
});
// Datos de lugares por estado
const bancoDatos = {
  lugares: {},
  playas: {},
  lagos: {}
};

function procesarLinea(linea, categoria) {
  const [, estado] = linea.match(/\|(\w+)\|/) || [];
  const [, nombre, temperatura, ubicacion] = linea.match(/([^|]+)\*(\d+)\*(\d+)/) || [];
  const [, nombreObjeto, temperaturaObjeto, ubicacionObjeto] = linea.match(/([^|]+)\*(\d+)\*(\d+)-/) || [];

  if (estado) {
    // Nuevo estado
    currentEstado = estado.trim();
    if (!bancoDatos[categoria][currentEstado]) {
      bancoDatos[categoria][currentEstado] = [];
    }
  } else if (nombreObjeto) {
    // Nuevo objeto en el estado actual
    bancoDatos[categoria][currentEstado].push({
      nombre: nombreObjeto.trim(),
      temperatura: parseFloat(temperaturaObjeto),
      ubicacionCentroCiudad: parseFloat(ubicacionObjeto)
    });
  } else if (nombre) {
    // Estado original
    bancoDatos[categoria][nombre.trim()] = [];
  } else {
    console.error(`Error al procesar la línea: ${linea}`);
  }
}

let currentEstado = null;

async function cargarYProcesarArchivo(archivo, categoria) {
  try {
    let datos;

    if (typeof window === 'undefined') {
      const fs = require('fs');
      datos = fs.readFileSync(archivo, 'utf-8');
    } else {
      const respuesta = await fetch(archivo);
      datos = await respuesta.text();
    }

    const lineas = datos.split('\n');

    lineas.forEach((linea, index) => {
      //console.log(`Procesando línea ${index + 1}: ${linea}`);
      procesarLinea(linea, categoria);
    });
  } catch (error) {
    console.error(`Error al cargar o procesar el archivo ${archivo}: ${error.message}`);
  }
}

cargarYProcesarArchivo('lugares.txt', 'lugares');
cargarYProcesarArchivo('playas.txt', 'playas');
cargarYProcesarArchivo('lagos.txt', 'lagos');

console.log(bancoDatos);
console.log(bancoDatos.lugares);













//Funcion para mostrar mensaje principal
function iniciarChat() {
  // Puedes hacer configuraciones adicionales aquí si es necesario
  mostrarMensaje("¡Hola Soy tu ChatBot! \nPuedo ayudarte a encontrar los mejores *(Lugares, Playas, Lagos)= de México según tus gustos. Puedes probar con &'Dime una playa cálida'# o &'Dime que lugar cerca del centro de Jalisco puedo visitar'#");
}
// Función para mostrar mensajes en el chat 
function mostrarMensaje(mensaje) {
  const chatLog = document.getElementById('chat-log');
  const mensajeDiv = document.createElement('div');
  //mensajeDiv.innerHTML = mensaje.replace(/\n/g, '<br>');
  mensaje = mensaje.replace(/&/g, '<em>').replace(/\#/g, '</em>').replace(/\n/g, '<br>').replace(/\*/g, '<strong>').replace(/\=/g, '</strong>');
  mensajeDiv.innerHTML = mensaje;
  chatLog.appendChild(mensajeDiv);
  // Desplazar hacia abajo para mostrar el último mensaje
  chatLog.scrollTop = chatLog.scrollHeight;
}
//----------------------------------Reglas del Sistema Experto------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const reglasTemperatura = [
  {
    condicion: (lugar) => lugar.temperatura < 16,
    respuesta: 'Si prefieres temperaturas más frescas, podrías explorar lugares como '
  },
  {
    condicion: (lugar) => lugar.temperatura >= 35,
    respuesta: 'Te recomendaría visitar lugares con temperaturas muy altas, como '
  },
  {
    condicion: (lugar) => lugar.temperatura >=16 && lugar.temperatura <= 34,
    respuesta: 'Te recomendaría visitar lugares con temperaturas cálidas, como '
  }
];

const reglasSinonimosClima = [
  {
    condicion: (sinonimo) => ["frio", "fria", "helado", "helada", "baja", "bajo"].includes(sinonimo),
    respuesta: 22
  },
  {
    condicion: (sinonimo) => ["calida", "calido", "templado", "caliente", "caluroso", "alta", "alto"].includes(sinonimo),
    respuesta: 23
  }
];


const reglasUbicacion = [
  {
    condicion: (sinonimo) => ["cerca", "cercano", "cercana", "centrico", "centrica", "dentro", "adentro"].includes(sinonimo),
    respuesta: 15
  },
  {
    condicion: (sinonimo) => ["lejos", "alejado", "alejada", "fuera", "afueras", "lejano", "lejana", "apartado","apartada", "alejada"].includes(sinonimo),
    respuesta: 16
  }
];

// Obtener la respuesta de la entrada del usuario
function obtenerRespuesta() {
  const userInput = document.getElementById('user-input').value;
  mostrarMensaje(`\nTú: ${userInput}`);
  // Manda a llamar a la función de procesamiento de entrada del usuario
  const respuesta = procesarConsulta(userInput);
  mostrarMensaje(`Chatbot: ${respuesta}`);
  // Limpiar el campo de entrada
  document.getElementById('user-input').value = '';
}


//Procesa el input del usuario (consulta es lo que puso el usuario)
function procesarConsulta(consulta) {
  // Convertir la consulta a minúsculas para hacerla insensible a mayúsculas
  const consultaMin = consulta.toLowerCase();
  const pregEstado = buscarEstado(consulta);
  //console.log(pregEstado);
  // Verificar si la consulta se refiere a playas o lagos
  if (consultaMin.includes('lugar') || consultaMin.includes('lugares') || consultaMin.includes('sitios') || consultaMin.includes('sitio')) {

    return obtenerInformacionLugar(consultaMin);
  } else if (consultaMin.includes('playa') || consultaMin.includes('playas')) {
    return obtenerInformacionPlaya(consultaMin);
  }else if (consultaMin.includes('lago') || consultaMin.includes('lagos') || consultaMin.includes('laguna') || consultaMin.includes('lagunas')) {
    return obtenerInformacionLago(consultaMin);
  } else {
    return 'Lo siento, no puedo responder a esa pregunta. ¿Puedes preguntar solamente sobre lugares playas o lagos?';
  }
}




function obtenerInformacionLugar(consulta) {
  const estadoDelObjeto = obtenerEstadoDesdeConsulta(consulta);
  //console.log(estadoDelObjeto); //sirve para saber si tenemos un estado cuando el usuario lo escribe
  // Utiliza el banco de datos (bancoDatos.playas) para obtener detalles sobre lugares
  const lugaresEnEstado = bancoDatos.lugares[estadoDelObjeto];
  const clima = aplicarReglasSinonimosClima(consulta);
  const ubicacion = aplicarReglasSinonimosUbicacion(consulta);
  //console.log(ubicacion);
  //si el usuario consulto una playa sin estado en específico, devuelve un lugar aleatorio. ejemplo: dime un lugar
  if (!lugaresEnEstado) {
    const estadosConLugares = Object.keys(bancoDatos.lugares);
    let estadoAleatorio = estadosConLugares[Math.floor(Math.random() * estadosConLugares.length)];
    let lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];



    if(ubicacion==16){
      let ubicacionesLejanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad >= ubicacion);
      let hastaQueEncuentreUnEstado = ubicacionesLejanas.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estadosConLugares[Math.floor(Math.random() * estadosConLugares.length)];
        //console.log(estadoAleatorio);
          lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
          ubicacionesLejanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad >= ubicacion);
        hastaQueEncuentreUnEstado = ubicacionesLejanas.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lugarSeleccionado = ubicacionesLejanas[Math.floor(Math.random() * ubicacionesLejanas.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoAleatorio}`;
    }
    else if(ubicacion==15){
      let ubicacionesCercanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad <= ubicacion);
      let hastaQueEncuentreUnEstado = ubicacionesCercanas.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estadosConLugares[Math.floor(Math.random() * estadosConLugares.length)];
        //console.log(estadoAleatorio);
          lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
            ubicacionesCercanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad >= ubicacion);
          hastaQueEncuentreUnEstado = ubicacionesCercanas.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lugarSeleccionado = ubicacionesCercanas[Math.floor(Math.random() * ubicacionesCercanas.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoAleatorio}`;
    }

    if(clima==23){
      let lugaresCalientes = lugaresEnEstado.filter((lugar) => lugar.temperatura >= clima);
      let hastaQueEncuentreUnEstado = lugaresCalientes.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estadosConLugares[Math.floor(Math.random() * estadosConLugares.length)];
        //console.log(estadoAleatorio);
          lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
          lugaresCalientes = lugaresEnEstado.filter((lugar) => lugar.temperatura >= clima);
        hastaQueEncuentreUnEstado = lugaresCalientes.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lugarSeleccionado = lugaresCalientes[Math.floor(Math.random() * lugaresCalientes.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoAleatorio}`;
    }
    else if(clima==22){
      let playasFrias = lugaresEnEstado.filter((lugar) => lugar.temperatura <= clima);
      let hastaQueEncuentreUnEstado = playasFrias.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estadosConLugares[Math.floor(Math.random() * estadosConLugares.length)];
        //console.log(estadoAleatorio);
          lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
        playasFrias = lugaresEnEstado.filter((lugar) => lugar.temperatura >= clima);
        hastaQueEncuentreUnEstado = playasFrias.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lugarSeleccionado = playasFrias[Math.floor(Math.random() * playasFrias.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoAleatorio}`;
    }
    const lugarAleatorio = lugaresEnEstado[Math.floor(Math.random() * lugaresEnEstado.length)];
    return `Te recomendaría visitar ${lugarAleatorio.nombre} en ${estadoAleatorio}`;
  }
  else {

    // Seleccionar una playa aleatoria para simplificar
    if(ubicacion==16){
      const ubicacionesLejanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad >= ubicacion);
      if (ubicacionesLejanas.length === 0) {
        return 'No tengo lugares lejanos (mas de 16 km) para recomendar en este estado.';
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lugarSeleccionado = ubicacionesLejanas[Math.floor(Math.random() * ubicacionesLejanas.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    else if(ubicacion==15){
      const ubicacionesCercanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad <= ubicacion);
      if (ubicacionesCercanas.length === 0) {
        return 'No hay lugares cercanos a 15km a la redonda.';
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lugarSeleccionado = ubicacionesCercanas[Math.floor(Math.random() * ubicacionesCercanas.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }

    // Entra si se pregunta por una playa con estado
    const lugarSeleccionado = lugaresEnEstado[Math.floor(Math.random() * lugaresEnEstado.length)];
    // Aplicar reglas de temperatura
//Esta linea de abajo buscar un lugar por su precio
   // const respuestaTemperatura = aplicarReglasTemperatura(lugarSeleccionado);
   // return `${respuestaTemperatura}${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    return `${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
  }
}



// Función para obtener información cuando en la consulta hay alguna playa
function obtenerInformacionPlaya(consulta) {
// Implementar lógica para buscar información sobre playas
  const pregEstado = buscarEstado(consulta);
  console.log(pregEstado);
  const estadoDelObjeto = obtenerEstadoDesdeConsulta(consulta);
  //console.log(estado); //sirve para saber si tenemos un estado cuando el usuario lo escribe
  // Utiliza el banco de datos (bancoDatos.playas) para obtener detalles sobre playas
  const playasEnEstado = bancoDatos.playas[estadoDelObjeto];
  const clima = aplicarReglasSinonimosClima(consulta);
  //const ubicacion = aplicarReglasSinonimosUbicacion(consulta);
  //si el usuario consulto una playa sin estado en específico, devuelve una playa aleatoria. ejemplo: dime una playa
  if (!playasEnEstado) {
    const estadosConPlayas = Object.keys(bancoDatos.playas);
    let estadoAleatorio = estadosConPlayas[Math.floor(Math.random() * estadosConPlayas.length)];
    let playasEnEstado = bancoDatos.playas[estadoAleatorio];
    //aqui entra si se busco una playa con clima caliente, sin especificar el estado, ejemplo: dime una playa caliente
    if(clima==23){
      let playasCalientes = playasEnEstado.filter((playa) => playa.temperatura >= clima);
      let hastaQueEncuentreUnEstado = playasCalientes.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estadosConPlayas[Math.floor(Math.random() * estadosConPlayas.length)];
        //console.log(estadoAleatorio);
        playasEnEstado = bancoDatos.playas[estadoAleatorio];
        playasCalientes = playasEnEstado.filter((playa) => playa.temperatura >= clima);
        hastaQueEncuentreUnEstado = playasCalientes.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const playaSeleccionada = playasCalientes[Math.floor(Math.random() * playasCalientes.length)];
      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}`;
    }
    else if(clima==22){
      let playasFrias = playasEnEstado.filter((playa) => playa.temperatura <= clima);
      let hastaQueEncuentreUnEstado = playasFrias.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estadosConPlayas[Math.floor(Math.random() * estadosConPlayas.length)];
        //console.log(estadoAleatorio);
        playasEnEstado = bancoDatos.playas[estadoAleatorio];
        playasFrias = playasEnEstado.filter((playa) => playa.temperatura >= clima);
        hastaQueEncuentreUnEstado = playasFrias.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const playaSeleccionada = playasFrias[Math.floor(Math.random() * playasFrias.length)];
      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}`;
    }
    if (pregEstado === 'undefined'){
    const playaAleatoria = playasEnEstado[Math.floor(Math.random() * playasEnEstado.length)];
    return `Te recomendaría visitar ${playaAleatoria.nombre} en ${estadoAleatorio}`;
    } 
    return `No hay playas en ${pregEstado}`;
  }
  else {
    // Seleccionar una playa aleatoria para simplificar
    console.log(clima);
    if(clima==23){
      const playasCalientes = playasEnEstado.filter((playa) => playa.temperatura >= clima);
      if (playasCalientes.length === 0) {
        return 'No hay playas con temperatura menor a 22 grados en este estado.';
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const playaSeleccionada = playasCalientes[Math.floor(Math.random() * playasCalientes.length)];
      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoDelObjeto}`;
    }
    else if(clima==22){
      const playasFrias = playasEnEstado.filter((playa) => playa.temperatura <= clima);
      if (playasFrias.length === 0) {
        return 'No hay playas con temperatura menor a 22 grados en este estado.';
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const playaSeleccionada = playasFrias[Math.floor(Math.random() * playasFrias.length)];
      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoDelObjeto}`;
    }
    // Entra si se pregunta por una playa con estado
    const playaSeleccionada = playasEnEstado[Math.floor(Math.random() * playasEnEstado.length)];
    // Aplicar reglas de temperatura
    const respuestaTemperatura = aplicarReglasTemperatura(playaSeleccionada);
    return `${respuestaTemperatura}${playaSeleccionada.nombre} en ${estadoDelObjeto}`;
  }
}



function obtenerInformacionLago(consulta) {
  const pregEstado = buscarEstado(consulta);
  // Implementar lógica para buscar información sobre playas
  const estadoDelObjeto = obtenerEstadoDesdeConsulta(consulta);
  //console.log(estado); //sirve para saber si tenemos un estado cuando el usuario lo escribe
  // Utiliza el banco de datos (bancoDatos.playas) para obtener detalles sobre playas
  const lagosEnEstado = bancoDatos.lagos[estadoDelObjeto];
  const clima = aplicarReglasSinonimosClima(consulta);
  //si el usuario consulto una playa sin estado en específico, devuelve una playa aleatoria. ejemplo: dime una playa
  if (!lagosEnEstado) {
    const estadosConLagos = Object.keys(bancoDatos.lagos); 
    let estadoAleatorio = estadosConLagos[Math.floor(Math.random() * estadosConLagos.length)];
    let lagosEnEstado = bancoDatos.lagos[estadoAleatorio];
      if(clima==23){
          let lagosCalientes = lagosEnEstado.filter((lago) => lago.temperatura >= clima);
          let hastaQueEncuentreUnEstado = lagosCalientes.length;
        while (hastaQueEncuentreUnEstado == 0){
            estadoAleatorio = estadosConLagos[Math.floor(Math.random() * estadosConLagos.length)];
            //console.log(estadoAleatorio);
            lagosEnEstado = bancoDatos.lagos[estadoAleatorio];
            lagosCalientes = lagosEnEstado.filter((lago) => lago.temperatura >= clima);
            hastaQueEncuentreUnEstado = lagosCalientes.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lagoSeleccionado = lagosCalientes[Math.floor(Math.random() * lagosCalientes.length)];
      return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoAleatorio}`;
    }
    else if(clima==22){
        let lagosFrios = lagosEnEstado.filter((lago) => lago.temperatura <= clima);
        let hastaQueEncuentreUnEstado = lagosFrios.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estadosConLagos[Math.floor(Math.random() * estadosConLagos.length)];
        //console.log(estadoAleatorio);
        lagosEnEstado = bancoDatos.lagos[estadoAleatorio];
        lagosFrios = lagosEnEstado.filter((lago) => lago.temperatura >= clima);
        hastaQueEncuentreUnEstado = lagosFrios.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lagoSeleccionado = lagosFrios[Math.floor(Math.random() * lagosFrios.length)];
      return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoAleatorio}`;
    }
    if (pregEstado === 'undefined'){
      const lagoAleatorio = lagosEnEstado[Math.floor(Math.random() * lagosEnEstado.length)];
      return `Te recomendaría visitar ${lagoAleatorio.nombre} en ${estadoAleatorio}`;
      } 
      return `No ha lagos en ${pregEstado}`;
  }
  // Seleccionar un lago aleatorio si 
  else {
    console.log(clima);
    if(clima==23){
      const lagosCalientes = lagosEnEstado.filter((lago) => lago.temperatura >= clima);

      if (lagosCalientes.length === 0) {
        return 'No hay lagos con temperatura menor a 22 grados en este estado.';
      }

      // Seleccionar una playa aleatoria entre las playas frías
      const lagoSeleccionado = lagosCalientes[Math.floor(Math.random() * lagosCalientes.length)];

      return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    else if(clima==22){
      const lagosFrios = lagosEnEstado.filter((playa) => playa.temperatura <= clima);

      if (lagosFrios.length === 0) {
        return 'No hay playas con temperatura menor a 22 grados en este estado.';
      }

      // Seleccionar una playa aleatoria entre las playas frías
      const lagoSeleccionado = lagosFrios[Math.floor(Math.random() * lagosFrios.length)];

      return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    // Entra si se pregunta por una playa con estado
    const lagoSeleccionado = lagosEnEstado[Math.floor(Math.random() * lagosEnEstado.length)];
    // Aplicar reglas de temperatura
    const respuestaTemperatura = aplicarReglasTemperatura(lagoSeleccionado);
    return `${respuestaTemperatura}${lagoSeleccionado.nombre} en ${estadoDelObjeto}`;
  }
}


function buscarEstado(consulta) {
  // Array con los nombres de los estados
  const estados = [
    'aguascalientes', 'baja california', 'baja california sur', 'campeche', 'chiapas',
    'chihuahua', 'coahuila', 'colima', 'durango', 'estado de mexico', 'guanajuato',
    'guerrero', 'hidalgo', 'jalisco', 'michoacan', 'morelos', 'nayarit', 'nuevo leon',
    'oaxaca', 'puebla', 'queretaro', 'quintana roo', 'san luis potosi', 'sinaloa',
    'sonora', 'tabasco', 'tamaulipas', 'tlaxcala', 'veracruz', 'yucatan', 'zacatecas'
  ];
  // Convertir la consulta a minúsculas para hacer la comparación de manera insensible a mayúsculas
  const consultaMinuscula = consulta.toLowerCase();
  // Verificar si la consulta incluye alguno de los estados
  const estadoEnConsulta = estados.find(estado => consultaMinuscula.includes(estado));
  // Devolver el estado encontrado o 'undefined' si no se encontró ninguno
  return estadoEnConsulta || 'undefined';
}

function obtenerEstadoDesdeConsulta(consulta) {
    if (consulta.includes('lugar') || consulta.includes('lugares') || consulta.includes('sitios') || consulta.includes('sitio')) {
    const estados = Object.keys(bancoDatos.lugares);
    const estadoEnConsulta = estados.find((estado) => consulta.includes(estado.toLowerCase()));
    return estadoEnConsulta || 'undefined';
  } 
    else if (consulta.includes('playa') || consulta.includes('playas')) {
    const estados = Object.keys(bancoDatos.playas);
    const estadoEnConsulta = estados.find((estado) => consulta.includes(estado.toLowerCase()));
    return estadoEnConsulta || 'undefined';
  } 
    else if (consulta.includes('lago') || consulta.includes('lagos') || consulta.includes('laguna') || consulta.includes('lagunas')){
    const estados = Object.keys(bancoDatos.lagos);
    const estadoEnConsulta = estados.find((estado) => consulta.includes(estado.toLowerCase()));
    return estadoEnConsulta || 'undefined';
  }
}


function aplicarReglasTemperatura(lugar) {
  // Aplicar reglas de temperatura y construir la respuesta
  const respuestaTemperatura = reglasTemperatura.reduce((acumulador, regla) => {
    if (regla.condicion(lugar)) {
      return acumulador + regla.respuesta;
    }
    return acumulador;
  }, '');

  return respuestaTemperatura;
}



function aplicarReglasSinonimosClima(consulta) {
  const sinonimosConsulta = consulta.split(/\s+/);

  // Aplicar reglas de temperatura y construir la respuesta
  const respuestaTemperatura = reglasSinonimosClima.reduce((acumulador, regla) => {
    if (sinonimosConsulta.some(sinonimo => regla.condicion(sinonimo))) {
      return regla.respuesta;
    }
    return acumulador;
  }, 'No se pudo determinar la temperatura.');
  return respuestaTemperatura;
}

function aplicarReglasSinonimosUbicacion(consulta) {
  const sinonimosConsulta = consulta.split(/\s+/);
  console.log("entro");
  // Aplicar reglas de temperatura y construir la respuesta
  const respuestaUbicacion = reglasUbicacion.reduce((acumulador, regla) => {
    if (sinonimosConsulta.some(sinonimo => regla.condicion(sinonimo))) {
      return regla.respuesta;
    }
    return acumulador;
  }, 'No se pudo determinar la ubicacion.');
  return respuestaUbicacion;
}