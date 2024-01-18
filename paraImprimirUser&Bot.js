document.addEventListener("DOMContentLoaded", function() {
  // Elementos del DOM
  const chatLog = document.getElementById("chat-log");
  const userInput = document.getElementById("user-input");

  // Base de datos
  const database = [
    ["jalisco", "chapala", "lago"],
    ["jalisco", "mazamitla", "pueblo"],
    ["jalisco", "vallarta", "playa"]
  ];

  // Función para enviar un mensaje
  window.sendMessage = function() {
    const userMessage = userInput.value;

    // Agregar mensaje del usuario al registro del chat
    appendMessage("Usuario: " + userMessage, "user");

    // Responder al usuario
    const botMessage = getBotResponse(userMessage);
    appendMessage("Chatbot: " + botMessage, "bot");

    // Limpiar el campo de entrada
    userInput.value = "";
  };

  // Función para agregar un mensaje al registro del chat
  function appendMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.className = sender;
    messageElement.textContent = message;
    chatLog.appendChild(messageElement);

    // Hacer scroll hacia abajo para mostrar el último mensaje
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Función para obtener una respuesta basada en la base de datos
  function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();

    // Buscar en la base de datos
    for (const entry of database) {
      const [location, destination, type] = entry;
      if (lowerCaseMessage.includes(location) && lowerCaseMessage.includes(type)) {
        return `Puedes visitar ${destination} en ${location}.`;
      }
    }

    // Respuesta por defecto si no se encuentra una coincidencia
    return "Lo siento, no tengo información sobre eso. ¿Puedes preguntar de otra manera?";
  }
});
