document.addEventListener('DOMContentLoaded', function () {
  // Inicializar el chat cuando la página esté cargada
  iniciarChat();
});
// Datos de lugares por estado
const bancoDatos = {
  lugares: {
    'Jalisco': [
      {
        nombre: 'Nevado de Colima',
        temperatura: 0,
        ubicacionCentroCiudad: 161
      },
      {
        nombre: 'Zoologico de Guadalajara',
        temperatura: 19,
        ubicacionCentroCiudad: 7.4
      },
      {
        nombre: 'Acuario Michin',
        temperatura: 19,
        ubicacionCentroCiudad: 0.7
      },
      {
        nombre: 'Basílica de Nuestra Señora de Zapopan',
        temperatura: 19,
        ubicacionCentroCiudad: 7.5
      },
      {
        nombre: 'Catedral de Guadalajara: Basílica de la Asunción de María Santísima',
        temperatura: 19,
        ubicacionCentroCiudad: 1.8
      },
      {
        nombre: 'Estadio Jalisco',
        temperatura: 19,
        ubicacionCentroCiudad: 4
      },
      {
        nombre: 'Mazamitla',
        temperatura: 15,
        ubicacionCentroCiudad: 136
      }
    ],
    'Colima': [
      {
        nombre: 'Catedral Basílica Menor de Colima',
        temperatura: 28,
        ubicacionCentroCiudad: 0.65
      },
      {
        nombre: 'Zona mágica de Colima',
        temperatura: 28,
        ubicacionCentroCiudad: 196
      },
      {
        nombre: 'Ecopark',
        temperatura: 28,
        ubicacionCentroCiudad: 1.2
      },
      {
        nombre: 'Balneario los Amiales Colima',
        temperatura: 28,
        ubicacionCentroCiudad: 17
      },
      {
        nombre: 'Feria de Todos los Santos',
        temperatura: 28,
        ubicacionCentroCiudad: 5.2
      }
    ],
    'Cancun': [
      {
        nombre: 'Chichén Itzá',
        temperatura: 26,
        ubicacionCentroCiudad: 212
      },
      {
        nombre: 'Parque Xcaret',
        temperatura: 26,
        ubicacionCentroCiudad: 79
      },
      {
        nombre: 'Parque Xel-Há',
        temperatura: 26,
        ubicacionCentroCiudad: 117
      },
      {
        nombre: 'Xplor',
        temperatura: 26,
        ubicacionCentroCiudad: 77
      },
      {
        nombre: 'Mercado 28',
        temperatura: 26,
        ubicacionCentroCiudad: 6.5
      },
      {
        nombre: 'Zona Arqueológica de Tulum',
        temperatura: 26,
        ubicacionCentroCiudad: 131
      },
      {
        nombre: 'Xoximilco Mexican Floating Fiesta in Cancun',
        temperatura: 26,
        ubicacionCentroCiudad: 23
      },
      {
        nombre: 'Ventura Park',
        temperatura: 26,
        ubicacionCentroCiudad: 22
      }
    ], 
    'Michoacan': [
      {
        nombre: 'Reserva de la Biósfera Santuario Mariposa Monarca', 
        temperatura: 22,
        ubicacionCentroCiudad: 128
      },
      {
        nombre: 'Parque Nacional Lago de Camécuaro',
        temperatura: 23,
        ubicacionCentroCiudad: 175
      },
      {
        nombre: 'Parque Zoológico Benito Juárez',
        temperatura: 15,
        ubicacionCentroCiudad: 2.6
      },
      {
        nombre: 'Estadio de Morelia',
        temperatura: 28,
        ubicacionCentroCiudad: 5.5
      }
    ]
  },

  playas: {
    'Colima': [
      {
        nombre: 'Playa Manzanillo',
        temperatura: 40,
        ubicacionCentroCiudad: 1
      },
      {
        nombre: 'Playa Colorada',
        temperatura: 14,
        ubicacionCentroCiudad: 2
      }
    ],
    'Cancun': [
      {
        nombre: 'Playa Delfines',
        temperatura: 20,
        ubicacionCentroCiudad: 16.4
      },
      {
        nombre: 'Tulum',
        temperatura: 25,
        ubicacionCentroCiudad: 2
      }
    ], 
    'Michoacan': [
      {
        nombre: 'Playa Eréndira', 
        temperatura: 22,
        ubicacionCentroCiudad: 2.5
      },
      {
        nombre: 'Caleta de Campos',
        temperatura: 23,
        ubicacionCentroCiudad: 4
      },
      {
        nombre: 'Llanitos del Bejuco',
        temperatura: 15,
        ubicacionCentroCiudad: 2
      },
      {
        nombre: 'Maruata',
        temperatura: 28,
        ubicacionCentroCiudad: 2
      }
    ]
  },
  lagos: {
    'Jalisco': [
      {
        nombre: 'Lago de Chapala',
        temperatura: 10,
        ubicacionCentroCiudad: 2.5
      }
    ],
    'Michoacan': [
      {
        nombre: 'Lago de Pátzcuaro',
        temperatura: 12,
        ubicacionCentroCiudad: 3
      },
      {
        nombre: 'Lago de Zirahuén',
        temperatura: 26,
        ubicacionCentroCiudad: 2
      },
      {
        nombre: 'Lago de Camecuaro',
        temperatura: 8,
        ubicacionCentroCiudad: 4
      }
    ],
    'Quintana Roo': [
      {
        nombre: 'Laguna Bacalar',
        temperatura: 10,
        ubicacionCentroCiudad: 1.5
      },
      {
        nombre: 'Cenote Azul',
        temperatura: 25,
        ubicacionCentroCiudad: 1
      }
    ]
  }
};



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