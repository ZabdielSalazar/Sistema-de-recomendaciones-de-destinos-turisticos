window.obtenerRespuesta = function(){
  const redNeuronal = new brain.NeuralNetwork();
  const datos = [ 
    {
      "input": {"lago de jalisco": 0.8},
      "output": {"chapala": 1}
    }, {
      "input": {"playa de cancun": 0.9},
      "output": {"xcaret": 1}
    }, {
      "input": {"ciudad de sinaloa": 1},
      "output": {"creel": 1}
    }
  ];

  redNeuronal.train(datos);
  const userMessage = userInput.value;
  console.log(userMessage);

  // Función para analizar la entrada y encontrar palabras clave
  function encontrarPalabrasClave(entrada) {
    const palabrasClave = ["lago", "playa", "ciudad"]; // Puedes expandir esta lista según tus necesidades
    const palabrasEncontradas = palabrasClave.filter(palabra => entrada.includes(palabra));
    return palabrasEncontradas.length > 0 ? palabrasEncontradas.join(" ") : null;
  }

  // Obtener palabras clave relevantes de la entrada del usuario
  const palabrasClave = encontrarPalabrasClave(userMessage);

  if (palabrasClave) {
    // Proporcionar la entrada de manera consistente con los datos de entrenamiento
    let resultado = brain.likely({ [palabrasClave]: 1 }, redNeuronal);
    appendMessage("Usuario: " + userMessage, "user");
    appendMessage("Chatbot: " + resultado, "bot");
  } else {
    appendMessage("Usuario: " + userMessage, "user");
    appendMessage("Chatbot: No entiendo la pregunta. ¿Puedes ser más específico?", "bot");
  }

  userInput.value = "";
}
