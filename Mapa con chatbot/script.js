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
  //const [, estado] = linea.match(/\|(\w+)\|/) || [];
  const [, estado] = linea.match(/\|(\w+(?:\s+\w+)*)\|/) || [];
  const [, nombre, temperatura, ubicacion] = linea.match(/([^|]+)\*(\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)/) || [];
  const [, nombreObjeto, temperaturaObjeto, ubicacionObjeto] = linea.match(/([^|]+)\*(\d+(?:\.\d+)?)\*(\d+(?:\.\d+)?)-/) || [];

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
//console.log(bancoDatos);

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

function estadosSinonimo(consulta){
  let consultaMin = consulta.toLowerCase(); 
  // Sinonimos 
  var quintanaRoo = ["cancun", "tulum", "playa del carmen", "chetumal"];
  var jalisco = ["guadalajara", "gdl"];
  // se remplaza la plabra por el estado (ejemplo: cancun -> quintana roo)
  if (quintanaRoo.some(palabra => consulta.includes(palabra))){ //Quintana Roo
    for (var i = 0; i < quintanaRoo.length; i++) {
      var palabra = quintanaRoo[i];
        consultaMin = consultaMin.replace(new RegExp(palabra, "gi"), "quintana roo");
    }
    return consultaMin;
  } else if (jalisco.some(palabra => consulta.includes(palabra))){ //Jalisco
    for (var i = 0; i < jalisco.length; i++) {
      var palabra = jalisco[i];
        consultaMin = consultaMin.replace(new RegExp(palabra, "gi"), "jalisco");
    }
    return consultaMin;
  }

}

//Procesa el input del usuario (consulta es lo que puso el usuario)
function procesarConsulta(consulta) {
  // Convertir la consulta a minúsculas para hacerla insensible a mayúsculas
  let consultaMin = consulta.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  var palabrasPermitidas = ["cancun", "tulum", "playa del carmen", "guadalajara", "gdl", "chetumal" ]; // lista de sinonimos de estados
  if (palabrasPermitidas.some(palabra => consultaMin.includes(palabra))) { // Si tiene un sinonimo se remplaza por el estado
      consultaMin = estadosSinonimo(consultaMin);
      console.log(consultaMin);
  } 
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
  // Utiliza el banco de datos (bancoDatos.lugares) para obtener detalles sobre lugares
  const lugaresEnEstado = bancoDatos.lugares[estadoDelObjeto];
  const ubicacion = aplicarReglasSinonimosUbicacion(consulta);
  //si el usuario consulto un lugar sin estado en específico, devuelve un lugar aleatorio. ejemplo: dime un lugar
  if (!lugaresEnEstado) {
    const estadosConLugares = Object.keys(bancoDatos.lugares);
    let estadoAleatorio = estadosConLugares[Math.floor(Math.random() * estadosConLugares.length)];
    let lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
    
    if(ubicacion==16){ // Ubicacion lejana
      let ubicacionesLejanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad >= ubicacion);
      let hastaQueEncuentreUnEstado = ubicacionesLejanas.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estadosConLugares[Math.floor(Math.random() * estadosConLugares.length)];
        lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
        ubicacionesLejanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad >= ubicacion);
        hastaQueEncuentreUnEstado = ubicacionesLejanas.length;
      }
      // Seleccionar un lugar aleatorio entre los lugares lejanos
      const lugarSeleccionado = ubicacionesLejanas[Math.floor(Math.random() * ubicacionesLejanas.length)];
      mostrarEstado(estadoAleatorio);
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoAleatorio}`;
    }
    else if(ubicacion==15){ // Ubicacion cercana
      let ubicacionesCercanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad <= ubicacion);
      let hastaQueEncuentreUnEstado = ubicacionesCercanas.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estadosConLugares[Math.floor(Math.random() * estadosConLugares.length)];
          lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
            ubicacionesCercanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad >= ubicacion);
          hastaQueEncuentreUnEstado = ubicacionesCercanas.length;
      }
      // Seleccionar una lugar aleatorio entre los lugares cercanos
      const lugarSeleccionado = ubicacionesCercanas[Math.floor(Math.random() * ubicacionesCercanas.length)];
      mostrarEstado(estadoAleatorio);
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoAleatorio}`;
    }
    const lugarAleatorio = lugaresEnEstado[Math.floor(Math.random() * lugaresEnEstado.length)];
    mostrarEstado(estadoAleatorio);
    return `Te recomendaría visitar ${lugarAleatorio.nombre} en ${estadoAleatorio}`;
  }
  else { // lugar con estado específico
    if(ubicacion==16){ // lugar lejano
      const ubicacionesLejanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad >= ubicacion);
      if (ubicacionesLejanas.length === 0) {
        return 'No tengo lugares lejanos (mas de 16 km) para recomendar en este estado.';
      }
      // Seleccionar un lugar aleatorio entre los lugares lejanos
      const lugarSeleccionado = ubicacionesLejanas[Math.floor(Math.random() * ubicacionesLejanas.length)];
      mostrarEstado(estadoDelObjeto);
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    else if(ubicacion==15){ // lugar cercano
      const ubicacionesCercanas = lugaresEnEstado.filter((lugar) => lugar.ubicacionCentroCiudad <= ubicacion);
      if (ubicacionesCercanas.length === 0) {
        return 'No hay lugares cercanos a 15km a la redonda.';
      }
      // Seleccionar un lugar aleatorio entre los lugares cercanos
      const lugarSeleccionado = ubicacionesCercanas[Math.floor(Math.random() * ubicacionesCercanas.length)];
      mostrarEstado(estadoDelObjeto);
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    const lugarSeleccionado = lugaresEnEstado[Math.floor(Math.random() * lugaresEnEstado.length)];
    // buscar un lugar por su precio ?
    mostrarEstado(estadoDelObjeto);
    return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
  }
}



// Función para obtener información cuando en la consulta hay alguna playa
function obtenerInformacionPlaya(consulta) {
  const pregEstado = buscarEstado(consulta);
  const estadoDelObjeto = obtenerEstadoDesdeConsulta(consulta);
  // Utiliza el banco de datos (bancoDatos.playas) para obtener detalles sobre playas
  const playasEnEstado = bancoDatos.playas[estadoDelObjeto];
  const clima = aplicarReglasSinonimosClima(consulta);
  const ubicacion = aplicarReglasSinonimosUbicacion(consulta);
  //si el usuario consulto una playa sin estado en específico, devuelve una playa aleatoria. ejemplo: dime una playa
  if (!playasEnEstado) { //En consulta: Si hay estado pero no hay playas en ese estado seleccionado
    const estadosConPlayas = Object.keys(bancoDatos.playas);
    let estadoAleatorio = estadosConPlayas[Math.floor(Math.random() * estadosConPlayas.length)];
    let playasEnEstado = bancoDatos.playas[estadoAleatorio];
    if(clima==23){//aqui entra si se busco una playa con clima caliente, sin especificar el estado, ejemplo: dime una playa caliente
      let playasCalientes = playasEnEstado.filter((playa) => playa.temperatura >= clima);
      console.log(playasCalientes);
      let hastaQueEncuentreUnEstado = playasCalientes.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estadosConPlayas[Math.floor(Math.random() * estadosConPlayas.length)];
        //console.log(estadoAleatorio);
        playasEnEstado = bancoDatos.playas[estadoAleatorio];
        playasCalientes = playasEnEstado.filter((playa) => playa.temperatura >= clima);
        hastaQueEncuentreUnEstado = playasCalientes.length;
      }// Seleccionar una playa aleatoria entre las playas calientes
      const playaSeleccionada = playasCalientes[Math.floor(Math.random() * playasCalientes.length)];
      if(pregEstado !== 'undefined'){ // Si quiere una playa caliente en un estado y no hay, le recomienda una aleatoria 
        mostrarEstado(estadoAleatorio);
        return `No hay playas calientes en este estado, pero te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}`;
      }else{
        mostrarEstado(estadoAleatorio);
        return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}`;
      }
    }
    else if(clima==22){//aqui entra si se busco una playa con clima frio, sin especificar el estado, ejemplo: dime una playa fria
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
      if(pregEstado !== 'undefined'){ // Si quiere una playa fria en un estado y no hay, le     recomienda una aleatoria 
        mostrarEstado(estadoAleatorio);
        return `No hay playas frias en este estado, pero te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}`;
      }else{
        mostrarEstado(estadoAleatorio);
        return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}`;
      }
    }//Si en consulta: No hay estado ni menciona el clima, entonces busca una playa aleatoria
    const playaAleatoria = playasEnEstado[Math.floor(Math.random() * playasEnEstado.length)];
    if(pregEstado !== 'undefined'){ // Si quiere una playa en un estado y no hay, le recomienda una aleatoria 
      mostrarEstado(estadoAleatorio);
      return `No hay playas en este estado, pero te recomendaría visitar ${playaAleatoria.nombre} en ${estadoAleatorio}`;
    }else{
      mostrarEstado(estadoAleatorio);
      return `Te recomendaría visitar ${playaAleatoria.nombre} en ${estadoAleatorio}`;
    }
  }
  else { // if (playasEnEstado) SI hay playas en el estado consultado, recordar que ubicacion aqui si importa, y en sin estado no
    if(clima==23){//aqui entra si se busco una playa con clima caliente con estado, ejemplo: dime una playa caliente en colima
      const playasCalientes = playasEnEstado.filter((playa) => playa.temperatura >= clima);
      if (playasCalientes.length === 0) {
        return 'No hay playas con temperatura mayor a 23 grados en este estado.';
      }
      if(ubicacion==16){ // Ubicacion lejana en  clima caliente, ejemplo: dime una playa caliente y lejos en colima 
        const ubicacionesLejanas = playasCalientes.filter((playa) => playa.ubicacionCentroCiudad >= ubicacion);
        if (ubicacionesLejanas.length === 0) {
          return 'No tengo playas caleintes y lejos de la ciudad (mas de 16 km) para recomendar en este estado.';
        }
        // Seleccionar una playa aleatoria entre las playas calientes y lejos
        const lugarSeleccionado = ubicacionesLejanas[Math.floor(Math.random() * ubicacionesLejanas.length)];
        mostrarEstado(estadoDelObjeto);
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      else if(ubicacion==15){ // Ubicacion cercana en clima caliente, ejemplo: dime una playa caliente y cerca en colima 
        const ubicacionesCercanas = playasCalientes.filter((playa) => playa.ubicacionCentroCiudad <= ubicacion);
        if (ubicacionesCercanas.length === 0) {
          return 'No hay playas cercanas de la ciudad y calientes a 15km a la redonda.';
        }
        // Seleccionar una playa aleatoria entre las playas calientes y cercanas
        const lugarSeleccionado = ubicacionesCercanas[Math.floor(Math.random() * ubicacionesCercanas.length)];
        mostrarEstado(estadoDelObjeto);
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      // Seleccionar una playa aleatoria entre las playas solo calientes
      const playaSeleccionada = playasCalientes[Math.floor(Math.random() * playasCalientes.length)];
      mostrarEstado(estadoDelObjeto);
      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoDelObjeto}`;
    }
    else if(clima==22){//aqui entra si se busco una playa con clima frio con estado, ejemplo: dime una playa fria en colima
      const playasFrias = playasEnEstado.filter((playa) => playa.temperatura <= clima);
      if (playasFrias.length === 0) {
        return 'No hay playas con temperatura menor a 22 grados en este estado.';
      }
      if(ubicacion==16){ // Ubicacion lejana en  clima frio
        const ubicacionesLejanas = playasFrias.filter((playa) => playa.ubicacionCentroCiudad >= ubicacion);
        if (ubicacionesLejanas.length === 0) {
          return 'No tengo playas lejanas de la ciudad (mas de 16 km) y frias para recomendar en este estado.';
        }
        // Seleccionar una playa aleatoria entre las playas calientes
        const lugarSeleccionado = ubicacionesLejanas[Math.floor(Math.random() * ubicacionesLejanas.length)];
        mostrarEstado(estadoDelObjeto);
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      else if(ubicacion==15){ //Ubicacion cercana en clima frio
        const ubicacionesCercanas = playasFrias.filter((playa) => playa.ubicacionCentroCiudad <= ubicacion);
        if (ubicacionesCercanas.length === 0) {
          return 'No hay playas cercanas a 15km a la redonda y frias en este estado.';
        }
        // Seleccionar una playa aleatoria entre las playas frías
        const lugarSeleccionado = ubicacionesCercanas[Math.floor(Math.random() * ubicacionesCercanas.length)];
        mostrarEstado(estadoDelObjeto);
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const playaSeleccionada = playasFrias[Math.floor(Math.random() * playasFrias.length)];
      mostrarEstado(estadoDelObjeto);
      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoDelObjeto}`;
    }
    if(ubicacion==16){ // SOLO PLAYA CON UBICACION LEJANA
      const playasLejanas = playasEnEstado.filter((playa) => playa.ubicacionCentroCiudad >= ubicacion);
      if (playasLejanas.length === 0) {
        return 'No tengo playas lejanas (mas de 16 km) para recomendar en este estado.';
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lugarSeleccionado = playasLejanas[Math.floor(Math.random() * playasLejanas.length)];
      mostrarEstado(estadoDelObjeto);
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    else if(ubicacion==15){ // SOLO PLAYA CON UBICACION CERCANA
      const ubicacionesCercanas = playasEnEstado.filter((playa) => playa.ubicacionCentroCiudad <= ubicacion);
      if (ubicacionesCercanas.length === 0) {
        return 'No hay playas cercanas a 15km a la redonda.';
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lugarSeleccionado = ubicacionesCercanas[Math.floor(Math.random() * ubicacionesCercanas.length)];
      mostrarEstado(estadoDelObjeto);
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    // Entra si se pregunta por una playa con estado
    const playaSeleccionada = playasEnEstado[Math.floor(Math.random() * playasEnEstado.length)];
    // Aplicar reglas de temperatura
    mostrarEstado(estadoDelObjeto);
    const respuestaTemperatura = aplicarReglasTemperatura(playaSeleccionada);
    return `${respuestaTemperatura}${playaSeleccionada.nombre} en ${estadoDelObjeto}`;
  } //fin else (playasEnEstado) SI hay playas en el estado consultado, recordar que ubicacion aqui si importa, y en sin estado no
}//fin function obtenerInformacionPlaya(consulta)



function obtenerInformacionLago(consulta) {
  const pregEstado = buscarEstado(consulta);
  console.log(pregEstado);
  // Implementar lógica para buscar información sobre playas
  const estadoDelObjeto = obtenerEstadoDesdeConsulta(consulta);
  console.log(estadoDelObjeto);
  //console.log(estado); //sirve para saber si tenemos un estado cuando el usuario lo escribe
  // Utiliza el banco de datos (bancoDatos.playas) para obtener detalles sobre playas
  const lagosEnEstado = bancoDatos.lagos[estadoDelObjeto];
  const clima = aplicarReglasSinonimosClima(consulta);
  const ubicacion = aplicarReglasSinonimosUbicacion(consulta);
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
      if(pregEstado !== 'undefined'){ // Si quiere una playa caliente en un estado y no hay, le recomienda una aleatoria 
        mostrarEstado(estadoAleatorio);
        return `No hay lagos calientes en este estado, pero te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoAleatorio}`;
       }else{
         mostrarEstado(estadoAleatorio);
         return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoAleatorio}`;
       }
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
      if(pregEstado !== 'undefined'){ // Si quiere una playa caliente en un estado y no hay, le recomienda una aleatoria 
        mostrarEstado(estadoAleatorio);
        return `No hay lagos frios en este estado, pero te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoAleatorio}`;
       }else{
         mostrarEstado(estadoAleatorio);
         return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoAleatorio}`;
       }
    }
    const lagoAleatorio = lagosEnEstado[Math.floor(Math.random() * lagosEnEstado.length)];
    if(pregEstado !== 'undefined'){ // Si quiere un lago en un estado y no hay, le recomienda uno aleatoria 
      mostrarEstado(estadoAleatorio);
      return `No hay lagos en este estado, pero te recomendaría visitar ${lagoAleatorio.nombre} en ${estadoAleatorio}`;
    }else{
      mostrarEstado(estadoAleatorio);
      return `Te recomendaría visitar ${lagoAleatorio.nombre} en ${estadoAleatorio}`;
    }
  }
  else {// if (lagosEnEstado) SI hay lagos en el estado consultado, recordar que ubicacion aqui si importa, y en sin estado no
    console.log(clima);
    if(clima==23){//aqui entra si se busco un lago con clima caliente con estado, ejemplo: dime un lago caliente en Jalisco
      const lagosCalientes = lagosEnEstado.filter((lago) => lago.temperatura >= clima);
      if (lagosCalientes.length === 0) {
        return 'No hay lagos con temperatura menor a 22 grados en este estado.';
      }
      if(ubicacion==16){ // Ubicacion lejana en  clima caliente, ejemplo: dime un lago caliente y lejos en colima 
        const ubicacionesLejanas = lagosCalientes.filter((lago) => lago.ubicacionCentroCiudad >= ubicacion);
        if (ubicacionesLejanas.length === 0) {
          return 'No tengo lagos calientes y lejos de la ciudad (mas de 16 km) para recomendar en este estado.';
        }
        // Seleccionar una lago aleatorio entre los lagos calientes y lejos
        const lugarSeleccionado = ubicacionesLejanas[Math.floor(Math.random() * ubicacionesLejanas.length)];
        mostrarEstado(estadoDelObjeto);
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      else if(ubicacion==15){ // Ubicacion cercana en clima caliente, ejemplo: dime una lago caliente y cerca en colima 
        const ubicacionesCercanas = lagosCalientes.filter((lago) => lago.ubicacionCentroCiudad <= ubicacion);
        if (ubicacionesCercanas.length === 0) {
          return 'No hay lagos cercanos de la ciudad y calientes a 15km a la redonda.';
        }
      // Seleccionar una lago aleatorio entre los playos frios y cercanos
      const lagoSeleccionado = ubicacionesCercanas[Math.floor(Math.random() * ubicacionesCercanas.length)];
      mostrarEstado(estadoDelObjeto);
      return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
    }
    else if(clima==22){
      const lagosFrios = lagosEnEstado.filter((playa) => playa.temperatura <= clima);
      if (lagosFrios.length === 0) {
        return 'No hay lagos con temperatura menor a 22 grados en este estado.';
      }
      if(ubicacion==16){ // Ubicacion lejana en  clima frios, ejemplo: dime un lago friios y lejos en colima 
        const ubicacionesLejanas = lagosFrios.filter((lago) => lago.ubicacionCentroCiudad >= ubicacion);
        if (ubicacionesLejanas.length === 0) {
          return 'No tengo lagos frios y lejos de la ciudad (mas de 16 km) para recomendar en este estado.';
        }
        // Seleccionar una lago aleatorio entre los lagos frios y lejos
        const lugarSeleccionado = ubicacionesLejanas[Math.floor(Math.random() * ubicacionesLejanas.length)];
        mostrarEstado(estadoDelObjeto);
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      else if(ubicacion==15){ // Ubicacion cercana en clima frios, ejemplo: dime un lago frio y cerca en colima 
        const ubicacionesCercanas = lagosFrios.filter((lago) => lago.ubicacionCentroCiudad <= ubicacion);
        if (ubicacionesCercanas.length === 0) {
          return 'No hay lagos cercanos de la ciudad y frios a 15km a la redonda.';
        }
      // Seleccionar una lago aleatorio entre los playos frios y cercanos
      const lagoSeleccionado = ubicacionesCercanas[Math.floor(Math.random() * ubicacionesCercanas.length)];
      mostrarEstado(estadoDelObjeto);
      return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      // Seleccionar un lago aleatorio entre los lagos fríos
      const lagoSeleccionado = lagosFrios[Math.floor(Math.random() * lagosFrios.length)];
      mostrarEstado(estadoDelObjeto);
      return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    if(ubicacion==16){ // SOLO LAGO CON UBICACION LEJANA
      const lagosLejanos = lagosEnEstado.filter((lago) => lago.ubicacionCentroCiudad >= ubicacion);
      if (lagosLejanos.length === 0) {
        return 'No tengo playas lejanas (mas de 16 km) para recomendar en este estado.';
      }
      // Seleccionar un lago aleatorio entre los lagos caleintes y lejos
      const lugarSeleccionado = lagosLejanos[Math.floor(Math.random() * lagosLejanos.length)];
      mostrarEstado(estadoDelObjeto);
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    else if(ubicacion==15){ // SOLO LAGO CON UBICACION CERCANA
      const ubicacionesCercanas = lagosEnEstado.filter((lago) => lago.ubicacionCentroCiudad <= ubicacion);
      if (ubicacionesCercanas.length === 0) {
        return 'No hay playas cercanas a 15km a la redonda.';
      }
      // Seleccionar un lago aleatorio entre los lagos fríos
      const lugarSeleccionado = ubicacionesCercanas[Math.floor(Math.random() * ubicacionesCercanas.length)];
      mostrarEstado(estadoDelObjeto);
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    // Entra si se pregunta por un lago con estado
    const lagoSeleccionado = lagosEnEstado[Math.floor(Math.random() * lagosEnEstado.length)];
    // Aplicar reglas de temperatura
    const respuestaTemperatura = aplicarReglasTemperatura(lagoSeleccionado);
    mostrarEstado(estadoDelObjeto);
    return `${respuestaTemperatura}${lagoSeleccionado.nombre} en ${estadoDelObjeto}`;
  }//fin else (lagosEnEstado) SI hay lagos en el estado consultado, recordar que ubicacion aqui si importa, y en sin estado no
}//fin function obtenerInformacionLago(consulta)


function buscarEstado(consulta) {
  // Array con los nombres de los estados
  const estados = [
    'aguascalientes', 'baja california', 'baja california sur', 'campeche', 'chiapas',
    'chihuahua', 'coahuila', 'colima', 'durango', 'estado de mexico', 'guanajuato',
    'guerrero', 'hidalgo', 'jalisco', 'michoacan', 'morelos', 'nayarit', 'nuevo leon',
    'oaxaca', 'puebla', 'queretaro', 'quintana roo', 'san luis potosi', 'sinaloa',
    'sonora', 'tabasco', 'tamaulipas', 'tlaxcala', 'veracruz', 'yucatan', 'zacatecas'];
  // Convertir la consulta a minúsculas para hacer la comparación de manera insensible a mayúsculas
  const consultaMinuscula = consulta.toLowerCase();
  // Verificar si la consulta incluye alguno de los estados
  let estadoEnConsulta = estados.find(estado => consultaMinuscula.includes(estado));
  // Devolver el estado encontrado o 'undefined' si no se encontró ninguno
  return estadoEnConsulta || 'undefined';
}

function mostrarEstado(consulta) {
  // Array con los nombres de los estados
  const estados = [
    'aguascalientes', 'baja california norte', 'baja california sur', 'campeche', 'chiapas',
    'chihuahua', 'coahuila', 'colima', 'durango', 'estado de mexico', 'guanajuato',
    'guerrero', 'hidalgo', 'jalisco', 'michoacan', 'morelos', 'nayarit', 'nuevo leon',
    'oaxaca', 'puebla', 'queretaro', 'quintana roo', 'san luis potosi', 'sinaloa',
    'sonora', 'tabasco', 'tamaulipas', 'tlaxcala', 'veracruz', 'yucatan', 'zacatecas', 'ciudad de mexico'];
  // Convertir la consulta a minúsculas para hacer la comparación de manera insensible a mayúsculas
  const consultaMinuscula = consulta.toLowerCase();
  // Verificar si la consulta incluye alguno de los estados
  let estadoEnConsulta = estados.find(estado => consultaMinuscula.includes(estado));
  //NUEVO ---------------------------------------------
  if(estadoEnConsulta !== 'undefined') {
    if(estadoEnConsulta === 'baja california norte'){
      document.getElementById("Ventana_BC").style.display = 'block';
    } else if(estadoEnConsulta === 'baja california sur'){
      document.getElementById("Ventana_BCS").style.display = 'block';
    } else if(estadoEnConsulta === 'yucatan'){
      document.getElementById("Ventana_YUC").style.display = 'block';
    } else if(estadoEnConsulta === 'jalisco'){
      document.getElementById("VentanaJAL").style.display = 'block';
    } else if(estadoEnConsulta === 'quintana roo'){
      document.getElementById("Ventana_QRO").style.display = 'block';
    } else if(estadoEnConsulta === 'chiapas'){
      document.getElementById("VentanaCHI").style.display = 'block';
    } else if(estadoEnConsulta === 'coahuila'){
      document.getElementById("VentanaCOA").style.display = 'block';
    } else if(estadoEnConsulta === 'chihuahua'){
      document.getElementById("VentanaHUA").style.display = 'block';
    } else if(estadoEnConsulta === 'durango'){
      document.getElementById("VentanaDUR").style.display = 'block';
    } else if(estadoEnConsulta === 'sinaloa'){
      document.getElementById("VentanaSIN").style.display = 'block';
    } else if(estadoEnConsulta === 'sonora'){
      document.getElementById("VentanaSON").style.display = 'block';
    } else if(estadoEnConsulta === 'zacatecas'){
      document.getElementById("VentanaZAC").style.display = 'block';
    } else if(estadoEnConsulta === 'nuevo leon'){
      document.getElementById("VentanaNL").style.display = 'block';
    } else if(estadoEnConsulta === 'san luis potosi'){
      document.getElementById("VentanaSLP").style.display = 'block';
    } else if(estadoEnConsulta === 'tamaulipas'){
      document.getElementById("VentanaTAM").style.display = 'block';
    } else if(estadoEnConsulta === 'aguascalientes'){
      document.getElementById("VentanaAGU").style.display = 'block';
    } else if(estadoEnConsulta === 'colima'){
      document.getElementById("VentanaCOL").style.display = 'block';
    } else if(estadoEnConsulta === 'michoacan'){
      document.getElementById("VentanaMICH").style.display = 'block';
    } else if(estadoEnConsulta === 'Nayarit'){
      document.getElementById("VentanaNAY").style.display = 'block';
    } else if(estadoEnConsulta === 'campeche'){
      document.getElementById("VentanaCAMP").style.display = 'block';
    } else if(estadoEnConsulta === 'oaxaca'){
      document.getElementById("VentanaOAX").style.display = 'block';
    } else if(estadoEnConsulta === 'puebla'){
      document.getElementById("VentanaPUE").style.display = 'block';
    } else if(estadoEnConsulta === 'tabasco'){
      document.getElementById("VentanaTAB").style.display = 'block';
    } else if(estadoEnConsulta === 'tlaxcala'){
      document.getElementById("Ventana_TLAX").style.display = 'block';
    } else if(estadoEnConsulta === 'ciudad de mexico'){
      document.getElementById("Ventana_CDMX").style.display = 'block';
    } else if(estadoEnConsulta === 'guanajuato'){
      document.getElementById("Ventana_GTO").style.display = 'block';
    } else if(estadoEnConsulta === 'guerrero'){
      document.getElementById("Ventana_GRR").style.display = 'block';
    } else if(estadoEnConsulta === 'hidalgo'){
      document.getElementById("Ventana_HID").style.display = 'block';
    } else if(estadoEnConsulta === 'estado de mexico'){
      document.getElementById("Ventana_MEX").style.display = 'block';
    } else if(estadoEnConsulta === 'morelos'){
      document.getElementById("Ventana_MOR").style.display = 'block';
    } else if(estadoEnConsulta === 'queretaro'){
      document.getElementById("Ventana_QTR").style.display = 'block';
    } else if(estadoEnConsulta === 'veracruz'){
      document.getElementById("Ventana_VRZ").style.display = 'block';
    } 
  }
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
  // Aplicar reglas de temperatura
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
  const respuestaUbicacion = reglasUbicacion.reduce((acumulador, regla) => {
    if (sinonimosConsulta.some(sinonimo => regla.condicion(sinonimo))) {
      return regla.respuesta;
    }
    return acumulador;
  }, 'No se pudo determinar la ubicacion.');
  return respuestaUbicacion;
}