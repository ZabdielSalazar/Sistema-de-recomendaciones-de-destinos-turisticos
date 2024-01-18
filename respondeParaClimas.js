document.addEventListener('DOMContentLoaded', function () {
  // Inicializar el chat cuando la página esté cargada
  iniciarChat();
});
// Datos de lugares por estado
const bancoDatos = {

  playas: {
    'Colima': [
      {
        nombre: 'Playa Manzanillo',
        temperatura: 40,
        ubicacionCentroCiudad: 1,
        lugaresEmblematicos: ['Cascada Azul', 'Isla de los Cisnes']
      },
      {
        nombre: 'Playa Colorada',
        temperatura: 14,
        ubicacionCentroCiudad: 2,
        lugaresEmblematicos: ['Cascada Colorada']
      }
    ],
    'Cancun': [
      {
        nombre: 'Playa Xcaret',
        temperatura: 30,
        ubicacionCentroCiudad: 5,
        lugaresEmblematicos: ['Museo', 'Ruinas']
      },
      {
        nombre: 'Tulum',
        temperatura: 25,
        ubicacionCentroCiudad: 2,
        lugaresEmblematicos: ['Pirámides', 'Restaurante de Tulum']
      }
    ], 
    'Michoacan': [ //EJEMPLOS
      {
        nombre: 'Playa Eréndira', 
        temperatura: 22,
        ubicacionCentroCiudad: 2.5,
        lugaresEmblematicos: ['Faro', 'Mar Rojo']
      },
      {
        nombre: 'Caleta de Campos',
        temperatura: 23,
        ubicacionCentroCiudad: 4,
        lugaresEmblematicos: ['Pirámides', 'Restaurante de Tulum']
      },
      {
        nombre: 'Llanitos del Bejuco',
        temperatura: 15,
        ubicacionCentroCiudad: 2,
        lugaresEmblematicos: ['Valle']
      },
      {
        nombre: 'Maruata',
        temperatura: 28,
        ubicacionCentroCiudad: 2,
        lugaresEmblematicos: ['Pirámides']
      }
    ]
    // Agregar más playas de otros estados
  },
  lagos: {
    'Jalisco': [
      {
        nombre: 'Lago de Chapala',
        temperatura: 10,
        ubicacionCentroCiudad: 2.5,
        lugaresEmblematicos: ['Isla del Alacrán', 'Malecón de Chapala', 'Parroquia de San Francisco']
      }
    ],
    'Michoacan': [
      {
        nombre: 'Lago de Pátzcuaro',
        temperatura: 12,
        ubicacionCentroCiudad: 3,
        lugaresEmblematicos: ['Isla de Janitzio', 'Basílica de Nuestra Señora de la Salud']
      },
      {
        nombre: 'Lago de Zirahuén',
        temperatura: 26,
        ubicacionCentroCiudad: 2,
        lugaresEmblematicos: ['Mirador de Zirahuén', 'Isla de Pacanda']
      },
      {
        nombre: 'Lago de Camecuaro',
        temperatura: 8,
        ubicacionCentroCiudad: 4,
        lugaresEmblematicos: ['Cascada Los Azules', 'Isla de los Pájaros']
      }
    ],
    'Quintana Roo': [
      {
        nombre: 'Laguna Bacalar',
        temperatura: 28,
        ubicacionCentroCiudad: 1.5,
        lugaresEmblematicos: ['Cenote Azul', 'Fuerte de San Felipe']
      },
      {
        nombre: 'Cenote Azul',
        temperatura: 25,
        ubicacionCentroCiudad: 1,
        lugaresEmblematicos: ['Gran Cenote', 'Cueva del Dos Ojos']
      }
    ]
    // Agregar más estados y sus lagos
  }
};



//Funcion para mostrar mensaje principal
function iniciarChat() {
  // Puedes hacer configuraciones adicionales aquí si es necesario
  mostrarMensaje("¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte?");
}
// Función para mostrar mensajes en el chat 
function mostrarMensaje(mensaje) {
  const chatLog = document.getElementById('chat-log');
  const mensajeDiv = document.createElement('div');
  mensajeDiv.innerHTML = mensaje.replace(/\n/g, '<br>');
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

// Obtener la respuesta de la entrada del usuario
function obtenerRespuesta() {
  const userInput = document.getElementById('user-input').value;
  mostrarMensaje(`\nUsuario: ${userInput}`);
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
  // Verificar si la consulta se refiere a playas o lagos
  if (consultaMin.includes('playa')) {
    return obtenerInformacionPlaya(consultaMin);
  } else if (consultaMin.includes('lago')) {
    return obtenerInformacionLago(consultaMin);
  } else {
    return 'Lo siento, no puedo responder a esa pregunta. ¿Puedes preguntar sobre playas o lagos?';
  }
}


// Función para obtener información cuando en la consulta hay alguna playa
function obtenerInformacionPlaya(consulta) {
// Implementar lógica para buscar información sobre playas
  const estado = obtenerEstadoDesdeConsulta(consulta);
  //console.log(estado); //sirve para saber si tenemos un estado cuando el usuario lo escribe
  // Utiliza el banco de datos (bancoDatos.playas) para obtener detalles sobre playas
  const playasEnEstado = bancoDatos.playas[estado];
  const clima = aplicarReglasSinonimosClima(consulta);
  //si el usuario consulto una playa sin estado en específico, devuelve una playa aleatoria. ejemplo: dime una playa
  if (!playasEnEstado) {
    const estados = Object.keys(bancoDatos.playas); 
    const estadoAleatorio = estados[Math.floor(Math.random() * estados.length)];
    console.log(estadoAleatorio);
    const playasEnEstado = bancoDatos.playas[estadoAleatorio];
    //aqui entra si se busco una playa con clima caliente, sin especificar el estado, ejemplo: dime una playa caliente
    if(clima==23){
      const playasCalientes = playasEnEstado.filter((playa) => playa.temperatura >= clima);
      const hastaQueEncuentreUnEstado = playasCalientes.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estados[Math.floor(Math.random() * estados.length)];
        playasEnEstado = bancoDatos.playas[estadoAleatorio];
        playasCalientes = playasEnEstado.filter((playa) => playa.temperatura >= clima);
        hastaQueEncuentreUnEstado = playasCalientes.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const playaSeleccionada = playasCalientes[Math.floor(Math.random() * playasCalientes.length)];
      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}. ¿Te gustaría saber más sobre este lugar?`;
    }
    else if(clima==22){
      const playasFrias = playasEnEstado.filter((playa) => playa.temperatura <= clima);
      const hastaQueEncuentreUnEstado = playasFrias.length;
      while (hastaQueEncuentreUnEstado == 0){
        estadoAleatorio = estados[Math.floor(Math.random() * estados.length)];
        playasEnEstado = bancoDatos.playas[estadoAleatorio];
          playasFrias = playasEnEstado.filter((playa) => playa.temperatura >= clima);
        hastaQueEncuentreUnEstado = playasFrias.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const playaSeleccionada = playasFrias[Math.floor(Math.random() * playasFrias.length)];
      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}. ¿Te gustaría saber más sobre este lugar?`;
    }
    const playaAleatoria = playasEnEstado[Math.floor(Math.random() * playasEnEstado.length)];
    return `Te recomendaría visitar ${playaAleatoria.nombre} en ${estadoAleatorio}. ¿Te gustaría saber más sobre este lugar? sin estado`;
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

      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estado}. ¿Te gustaría saber más sobre este lugar?`;
    }
    else if(clima==22){
      const playasFrias = playasEnEstado.filter((playa) => playa.temperatura <= clima);

      if (playasFrias.length === 0) {
        return 'No hay playas con temperatura menor a 22 grados en este estado.';
      }

      // Seleccionar una playa aleatoria entre las playas frías
      const playaSeleccionada = playasFrias[Math.floor(Math.random() * playasFrias.length)];

      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estado}. ¿Te gustaría saber más sobre este lugar?`;
    }
    // Entra si se pregunta por una playa con estado
    const playaSeleccionada = playasEnEstado[Math.floor(Math.random() * playasEnEstado.length)];
    // Aplicar reglas de temperatura
    const respuestaTemperatura = aplicarReglasTemperatura(playaSeleccionada);
    return `${respuestaTemperatura}${playaSeleccionada.nombre} en ${estado}. ¿Te gustaría saber más sobre algún lugar en particular? con estado`;
  }
}



function obtenerInformacionLago(consulta) {
  // Implementar lógica para buscar información sobre lagos
  // Utiliza el banco de datos (bancoDatos.lagos) para obtener detalles sobre lagos
  // Aplicar reglas de temperatura
  const estado = obtenerEstadoDesdeConsulta(consulta);
  const lagosEnEstado = bancoDatos.lagos[estado];

  if (!lagosEnEstado) {
    return 'Lo siento, no tengo información sobre lagos en ese estado. ¿Puedes preguntar sobre otro estado?';
  }

  // Seleccionar un lago aleatorio para simplificar
  const lagoSeleccionado = lagosEnEstado[Math.floor(Math.random() * lagosEnEstado.length)];

  // Aplicar reglas de temperatura
  const respuestaTemperatura = aplicarReglasTemperatura(lagoSeleccionado);
  return `${respuestaTemperatura}${lagoSeleccionado.nombre} en ${estado}. ¿Te gustaría saber más sobre algún lugar en particular?`;
}




function obtenerEstadoDesdeConsulta(consulta) {
  // Aquí puedes implementar una lógica más sofisticada para extraer el estado desde la consulta
  // Por ahora, simplemente asumimos que el estado está en la consulta

  if (consulta.includes('playa')) {
    const estados = Object.keys(bancoDatos.playas);
    const estadoEnConsulta = estados.find((estado) => consulta.includes(estado.toLowerCase()));
    return estadoEnConsulta || 'undefined';
  } else if (consulta.includes('lago')){
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