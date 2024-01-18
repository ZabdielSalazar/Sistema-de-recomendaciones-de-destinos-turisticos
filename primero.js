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
        temperatura: 20,
        ubicacionCentroCiudad: 2,
        lugaresEmblematicos: ['Cascada Colorada']
      }
    ],
    'Cancún': [
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
    ]
    // Puedes agregar más playas en otros estados
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
    'Michoacán': [
      {
        nombre: 'Lago de Pátzcuaro',
        temperatura: 12,
        ubicacionCentroCiudad: 3,
        lugaresEmblematicos: ['Isla de Janitzio', 'Basílica de Nuestra Señora de la Salud']
      },
      {
        nombre: 'Lago de Zirahuén',
        temperatura: 15,
        ubicacionCentroCiudad: 2,
        lugaresEmblematicos: ['Mirador de Zirahuén', 'Isla de Pacanda']
      },
      {
        nombre: 'Lago de Camecuaro',
        temperatura: 8,
        ubicacionCentroCiudad: 4,
        lugaresEmblematicos: ['Cascada Los Azules', 'Isla de los Pájaros']
      }
      // Puedes agregar más lagos en Michoacán y otros estados
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
      // Puedes agregar más lagos en Quintana Roo y otros estados
    ]
    // Puedes agregar más estados y lagos según sea necesario
  }
};

const sistemaExperto = {
  preferencias: [],

  reglasTemperatura: [
    {
      condicion: (lugar) => lugar.temperatura >= 25,
      respuesta: 'Te recomendaría visitar lugares con temperaturas cálidas, como '
    },
    {
      condicion: (lugar) => lugar.temperatura < 15,
      respuesta: 'Si prefieres temperaturas más frescas, podrías explorar lugares como '
    },
    // Puedes agregar más reglas de temperatura según tus criterios
  ],

  reglasUbicacion: [
    {
      condicion: (lugar) => lugar.ubicacionCentroCiudad <= 2,
      respuesta: 'Si buscas lugares cerca del centro de la ciudad, podrías disfrutar de '
    },
    {
      condicion: (lugar) => lugar.ubicacionCentroCiudad > 2 && lugar.ubicacionCentroCiudad <= 3,
      respuesta: 'Lugares como '
    },
    // Puedes agregar más reglas de ubicación según tus criterios
  ],

  reglasLugaresEmblematicos: [
    {
      condicion: (lugar) => lugar.lugaresEmblematicos.includes('Isla del Alacrán'),
      respuesta: 'Si te interesan lugares emblemáticos como la Isla del Alacrán, te sugiero visitar '
    },
    {
      condicion: (lugar) => lugar.lugaresEmblematicos.includes('Isla de Janitzio'),
      respuesta: 'Para experimentar la cultura en la Isla de Janitzio, deberías considerar visitar '
    },
    // Puedes agregar más reglas de lugares emblemáticos según tus criterios
  ],

  aprenderPreferencia: function (tipoLugar, estado, nombreLugar, preferido) {
    const lugar = bancoDatos[tipoLugar][estado].find(l => l.nombre === nombreLugar);
    if (lugar) {
      this.preferencias.push({ lugar, preferido });
      return `Aprendí tu preferencia para ${nombreLugar}.`;
    } else {
      return 'No pude aprender tu preferencia porque no encontré el lugar.';
    }
  },

  obtenerRecomendacionConPreferencias: function (tipoLugar, estado, criterio) {
    const lugaresEnEstado = bancoDatos[tipoLugar][estado];
    for (const lugar of lugaresEnEstado) {
      for (const regla of this[criterio]) {
        if (regla.condicion(lugar)) {
          const preferencia = this.preferencias.find(p => p.lugar.nombre === lugar.nombre);
          if (preferencia) {
            return `${regla.respuesta}${lugar.nombre}. ${preferencia.preferido ? 'Visitarlo.' : 'Evitarlo.'}`;
          } else {
            return `${regla.respuesta}${lugar.nombre}.`;
          }
        }
      }
    }
    return 'No tengo recomendaciones basadas en esos criterios.';
  }
};

function obtenerRecomendacion() {
  const userInput = document.getElementById('user-input').value;
  const respuesta = procesarInputUsuario(userInput);
  mostrarRespuesta(respuesta);
}

function procesarInputUsuario(input) {
  // Aquí deberías llamar a las funciones correspondientes del sistema experto
  // según el input del usuario y devolver la respuesta.
  // Por ejemplo, podrías usar sistemaExperto.aprenderPreferencia y sistemaExperto.obtenerRecomendacionConPreferencias.
}

function mostrarRespuesta(respuesta) {
  const chatLog = document.getElementById('chat-log');
  const mensaje = document.createElement('div');
  mensaje.textContent = respuesta;
  chatLog.appendChild(mensaje);
}
