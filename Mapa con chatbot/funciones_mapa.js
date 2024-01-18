var filePath = 'coordenadas_estados.txt';
// Realiza una solicitud HTTP para obtener el contenido del archivo
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var yucatan = data.yucatan;
      var bajaCalifornia = data.bajaCalifornia;
      var bajaCaliforniaSur = data.bajaCaliforniaSur;
      var coahuila = data.coahuila;
      var chihuahua = data.chihuahua;
      var durango = data.durango;
      var sinaloa = data.sinaloa;
      var sonora = data.sonora;
      var zacatecas = data.zacatecas;
      var nuevoLeon = data.nuevoLeon;
      var sanLuisPotosi = data.sanLuisPotosi;
      var tamaulipas = data.tamaulipas;
      var aguascalientes = data.aguascalientes;
      var jalisco = data.jalisco;
      var michoacan = data.michoacan;
      var nayarit = data.nayarit;
      var campeche = data.campeche;
      var colima = data.colima;
      var oaxaca = data.oaxaca;
      var puebla = data.puebla;
      var tabasco = data.tabasco;
      var tlaxcala = data.tlaxcala;
      var ciudadDeMexico = data.ciudadDeMexico;
      var guanajuato = data.guanajuato;
      var guerrero = data.guerrero;
      var hidalgo = data.hidalgo;
      var mexico = data.mexico;
      var morelos = data.morelos;
      var queretaro = data.queretaro;
      var veracruz = data.veracruz;
      var chiapas = data.chiapas;
      var quintanaRoo = data.quintanaRoo;

      document.getElementById('YUC').setAttribute('d', yucatan);
      document.getElementById('BC').setAttribute('d', bajaCalifornia);
      document.getElementById('BCS').setAttribute('d', bajaCaliforniaSur);
      document.getElementById('COA').setAttribute('d', coahuila);
      document.getElementById('HUA').setAttribute('d', chihuahua);
      document.getElementById('DUR').setAttribute('d', durango);
      document.getElementById('SIN').setAttribute('d', sinaloa);
      document.getElementById('SON').setAttribute('d', sonora);
      document.getElementById('ZAC').setAttribute('d', zacatecas);
      document.getElementById('NL').setAttribute('d', nuevoLeon);
      document.getElementById('SLP').setAttribute('d', sanLuisPotosi);
      document.getElementById('TAM').setAttribute('d', tamaulipas);
      document.getElementById('AGU').setAttribute('d', aguascalientes);
      document.getElementById('COL').setAttribute('d', colima);
      document.getElementById('JAL').setAttribute('d', jalisco);
      document.getElementById('MICH').setAttribute('d', michoacan);
      document.getElementById('NAY').setAttribute('d', nayarit);
      document.getElementById('CAMP').setAttribute('d', campeche);
      document.getElementById('OAX').setAttribute('d', oaxaca);
      document.getElementById('PUE').setAttribute('d', puebla);
      document.getElementById('TAB').setAttribute('d', tabasco);
      document.getElementById('TLAX').setAttribute('d', tlaxcala);
      document.getElementById('CDMX').setAttribute('d', ciudadDeMexico);
      document.getElementById('GTO').setAttribute('d', guanajuato);
      document.getElementById('GRR').setAttribute('d', guerrero);
      document.getElementById('HID').setAttribute('d', hidalgo);
      document.getElementById('MEX').setAttribute('d', mexico);
      document.getElementById('MOR').setAttribute('d', morelos);
      document.getElementById('QTR').setAttribute('d', queretaro);
      document.getElementById('VRZ').setAttribute('d', veracruz);
      document.getElementById('CHI').setAttribute('d', chiapas);
      document.getElementById('QRO').setAttribute('d', quintanaRoo);
    } else {
      console.error('Error al cargar el archivo:', xhr.statusText);
    }
  }
};
xhr.open('GET', filePath, true);
xhr.send();

  // Obtener el elemento del path por su ID
  var BC = document.getElementById('BC');
  var BCS = document.getElementById('BCS');
  var YUC = document.getElementById('YUC');
  var QRO = document.getElementById('QRO');
  var CHI = document.getElementById('CHI');
  var COA = document.getElementById('COA');
  var HUA = document.getElementById('HUA');
  var DUR = document.getElementById('DUR');
  var SIN = document.getElementById('SIN');
  var SON = document.getElementById('SON');
  var ZAC = document.getElementById('ZAC');
  var NL = document.getElementById('NL');
  var SLP = document.getElementById('SLP');
  var TAM = document.getElementById('TAM');
  var AGU = document.getElementById('AGU');
  var COL = document.getElementById('COL');
  var JAL = document.getElementById('JAL');
  var MICH = document.getElementById('MICH');
  var NAY = document.getElementById('NAY');
  var CAMP = document.getElementById('CAMP');
  var OAX = document.getElementById('OAX');
  var PUE = document.getElementById('PUE');
  var TAB = document.getElementById('TAB');
  var TLAX = document.getElementById('TLAX');
  var CDMX = document.getElementById('CDMX');
  var GTO = document.getElementById('GTO');
  var GRR = document.getElementById('GRR');
  var HID = document.getElementById('HID');
  var MEX = document.getElementById('MEX');
  var MOR = document.getElementById('MOR');
  var QTR = document.getElementById('QTR');
  var VRZ = document.getElementById('VRZ');
  // Funcion para cerrar la ventana

  function cerrarVentana(elemento) {
    elemento.parentNode.style.display = 'none';
    }

    // Agregar un event listener para el clic  
    BC.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_BC";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/bajanorte.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Baja California Norte</h2>
        <p > Con playas espectaculares en Tijuana y Ensenada, Baja California destaca por su escena artística en Tijuana y los viñedos del Valle de Guadalupe. Además, el Parque Nacional Sierra de San Pedro Mártir ofrece impresionantes paisajes montañosos y observación de estrellas.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    BCS.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_BCS";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/bajasur.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Baja California Sur</h2>
        <p >Con playas impresionantes como la Playa Balandra en La Paz y el famoso Arco de Cabo San Lucas. Además, es un destino ideal para el avistamiento de ballenas.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    YUC.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_YUC";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/yucatan.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Yucatán</h2>
        <p >La península de Yucatán destaca por su riqueza cultural y arqueológica, como las ruinas de Chichén Itzá y Uxmal. Mérida, la capital, ofrece una mezcla única de tradiciones mayas y coloniales, con plazas encantadoras y mercados vibrantes.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    QRO.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_QRO";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/quintana.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Quintana Roo</h2>
        <p >Famoso por sus impresionantes playas, como Playa Delfines y Playa Norte en Isla Mujeres. Además, ofrece experiencias culturales en sitios arqueológicos como Tulum y Coba. Destinos populares como Xcaret y Xel-Há lo convierten en un atractivo turístico destacado.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    CHI.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaCHI";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/chiapas.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Chiapas</h2>
        <p >Con una biodiversidad única, Chiapas es hogar de selvas, cascadas como Agua Azul y sitios arqueológicos mayas como Palenque. San Cristóbal de las Casas ofrece una experiencia colonial encantadora.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    COA.addEventListener('click', function () {
          var nuevaVentana = document.createElement('div');
          var ventanaId = "VentanaCOA";
          nuevaVentana.setAttribute("id", ventanaId);
          nuevaVentana.classList.add('ventana');
          nuevaVentana.innerHTML = `
            <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
            <img src="imagenes/coahuila.jpeg" width="300"
              height="150" />
            <h2 style="text-align:center">Coahuila</h2>
            <p >Destaca por la belleza natural de la Sierra de Arteaga y la Zona del Desierto. Saltillo, la capital, es conocida por sus textiles y su arquitectura colonial.</p>
          `;
          document.body.appendChild(nuevaVentana);
          document.getElementById(ventanaId).style.display = 'block';
          var draggableDiv = document.getElementById(ventanaId);
          moverVentana(draggableDiv);
    });
    HUA.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaHUA";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/chihuahua.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Chihuahua</h2>
        <p >El estado más grande de México, Chihuahua, combina el árido Desierto de Chihuahua con la majestuosidad de la Sierra Madre Occidental. La ciudad de Chihuahua exhibe arquitectura histórica, mientras que la Barranca del Cobre atrae a los amantes del senderismo con su sistema de cañones impresionante.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    DUR.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaDUR";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/durango.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Durango</h2>
        <p >Con su imponente geografía montañosa, Durango es famoso por el teleférico de El Púlpito y la ciudad colonial de Durango. Además, es conocido por ser escenario de varias películas de Hollywood.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    SIN.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaSIN";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/sinaloa.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Sinaloa</h2>
        <p >Con playas hermosas y un ambiente festivo, Sinaloa es famoso por su música y cultura. Mazatlán es un destino turístico con encanto y tradiciones arraigadas.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    SON.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaSON";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/sonora.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Sonora</h2>
        <p >Famoso por su desierto y playas, Sonora es también conocido por la celebración del Día de la Raza en Ciudad Obregón y el Festival Alfonso Ortiz Tirado en Álamos.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    ZAC.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaZAC";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/zacatecas.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Zacatecas</h2>
        <p >Con su arquitectura barroca y la Mina El Edén, Zacatecas es reconocido por su rica historia minera. El Cerro de la Bufa proporciona vistas impresionantes de la ciudad.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    NL.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaNL";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/nuevo_leon.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Nuevo León</h2>
        <p >Conocido por su dinamismo industrial, Monterrey también ofrece bellezas naturales como el Parque Nacional Cumbres de Monterrey. El Museo de Historia Mexicana y el Parque Fundidora son puntos clave para entender su pasado y disfrutar del presente.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    SLP.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaSLP";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/sanluis.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">San Luis Potosí</h2>
        <p >Con sitios históricos como el Centro Histórico de San Luis Potosí y la zona arqueológica de Tamtoc. También ofrece bellezas naturales como la Huasteca Potosina.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    TAM.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaTAM";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/tamaulipas.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Tamaulipas</h2>
        <p >Destaca por sus playas en la costa del Golfo de México y el Parque Nacional Cañón de Santa Elena. Ciudad Victoria, su capital, ofrece una mezcla de historia y naturaleza.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    AGU.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaAGU";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/aguas.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Aguascalientes</h2>
        <p >Reconocido por la Feria Nacional de San Marcos, una de las ferias más antiguas y grandes de México. Aguascalientes también cuenta con hermosos parques y jardines.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    COL.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaCOL";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/colima.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Colima</h2>
        <p >Hogar del Volcán de Colima, uno de los más activos de México. La ciudad de Colima cuenta con un centro histórico encantador y la Universidad de Colima es un referente educativo.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    var contadorVentanas = 0;
    JAL.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaJAL";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/jalisco.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Jalisco</h2>
        <p >Conocido como la tierra del tequila y el mariachi. Guadalajara ofrece una rica historia en su centro histórico, la majestuosidad de la Catedral y eventos culturales en el Instituto Cultural Cabañas. Además, la zona de Tequila es imperdible para los amantes de esta bebida.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    MICH.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaMICH";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/michoacan.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Michoacán</h2>
        <p >Celebrado por la artesanía, la cultura indígena y las festividades como el Día de los Muertos. Morelia, su capital, es famosa por su arquitectura colonial.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    NAY.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaNAY";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/nayarit.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Nayarit</h2>
        <p >Con playas exquisitas en destinos como Sayulita y la Riviera Nayarit. La ciudad de Tepic ofrece una mezcla de tradición y modernidad.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    CAMP.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaCAMP";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/campeche.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Campeche</h2>
        <p >Con impresionantes murallas y fuertes, la ciudad de Campeche es un tesoro colonial. Además, ofrece reservas naturales como Calakmul y playas como Playa Bonita.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    OAX.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaOAX";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="https://www.turismomexico.es/wp-content/uploads/2015/10/centro-cultural-tijuana.jpg" width="300"
          height="150" />
        <h2 style="text-align:center">Oaxaca</h2>
        <p >Este estado es famoso por su rica tradición culinaria, artesanías y celebraciones culturales como la Guelaguetza. La ciudad de Oaxaca cuenta con arquitectura colonial, mientras que lugares como Monte Albán revelan la antigua historia zapoteca..</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    PUE.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "VentanaPUE";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/puebla.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Puebla</h2>
        <p >Conocida por su arquitectura barroca y la impresionante Catedral de Puebla, así como por la gastronomía, destacando el mole poblano. Cholula cuenta con la pirámide más grande del mundo en términos de volumen.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    TAB.addEventListener('click', function () {
          var nuevaVentana = document.createElement('div');
          var ventanaId = "VentanaTAB";
          nuevaVentana.setAttribute("id", ventanaId);
          nuevaVentana.classList.add('ventana');
          nuevaVentana.innerHTML = `
            <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
            <img src="imagenes/tabasco.jpeg" width="300"
              height="150" />
            <h2 style="text-align:center">Tabasco</h2>
            <p >Rico en recursos naturales, Tabasco cuenta con la reserva ecológica Pantanos de Centla y es famoso por la producción de cacao. La ciudad de Villahermosa ofrece museos y parques.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    TLAX.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_TLAX";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/tlaxcala.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Tlaxcala</h2>
        <p > La ciudad de Tlaxcala es rica en historia colonial, con la Basílica de Nuestra Señora de la Caridad y el exconvento de San Francisco. También es conocida por sus tradiciones y festivales.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    CDMX.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_CDMX";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/cdmx.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Ciudad de México (CDMX)</h2>
        <p >Como la capital vibrante de México, la CDMX ofrece una mezcla de historia, cultura y modernidad. Desde el Zócalo y el Bosque de Chapultepec hasta la ecléctica escena gastronómica y cultural, la ciudad es un centro cosmopolita lleno de vida y diversidad.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    GTO.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_GTO";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/guanajuato.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Guanajuato</h2>
        <p >Conocido por su arquitectura colonial y callejones empedrados en la ciudad de Guanajuato. Además, el Festival Internacional Cervantino atrae a amantes de las artes de todo el mundo.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    GRR.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_GRR";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/guerrero.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Guerrero</h2>
        <p >Famoso por Acapulco y sus playas, Guerrero también alberga la zona arqueológica de Xochicalco y la ciudad colonial de Taxco, famosa por la orfebrería.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    HID.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_HID";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/hidalgo.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Hidalgo</h2>
        <p >Hogar de la impresionante zona arqueológica de Tula y el Santuario de las Luciérnagas en Nanacamilpa. Pachuca, la capital, cuenta con un reloj monumental icónico.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    MEX.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_MEX";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/edomex.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Estado de México</h2>
        <p >Con la imponente Pirámide del Sol en Teotihuacán y la belleza natural del Nevado de Toluca. Toluca, su capital, es conocida por sus festivales y eventos culturales.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    MOR.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_MOR";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/morelos.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Morelos</h2>
        <p >Con lugares históricos como Tepoztlán y Cuernavaca, conocida como la "Ciudad de la Eterna Primavera". Además, alberga el Jardín Borda y las Lagunas de Zempoala.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    QTR.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_QTR";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/queretaro.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Querétaro</h2>
        <p >Famoso por su acueducto, Querétaro tiene un centro histórico declarado Patrimonio de la Humanidad. También es conocido por sus viñedos y la Ruta del</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });
    VRZ.addEventListener('click', function () {
      var nuevaVentana = document.createElement('div');
      var ventanaId = "Ventana_VRZ";
      nuevaVentana.setAttribute("id", ventanaId);
      nuevaVentana.classList.add('ventana');
      nuevaVentana.innerHTML = `
        <span class="cerrar" onclick="cerrarVentana(this)">&times;</span>
        <img src="imagenes/veracruz.jpeg" width="300"
          height="150" />
        <h2 style="text-align:center">Veracruz</h2>
        <p >Con una ubicación estratégica en el Golfo de México, Veracruz tiene una rica herencia cultural y gastronómica. El malecón de Veracruz y la ciudad de Xalapa son destinos culturales destacados.</p>
      `;
      document.body.appendChild(nuevaVentana);
      document.getElementById(ventanaId).style.display = 'block';
      var draggableDiv = document.getElementById(ventanaId);
      moverVentana(draggableDiv);
    });

  function moverVentana(draggableDiv) {
    var offsetX, offsetY;
    var isDragging = false;

    // Función que se activa cuando se inicia el toque o el clic del ratón
    function onStart(e) {
      e.preventDefault();
      isDragging = true;

      if (e.type === 'touchstart') {
        var touch = e.targetTouches[0];
        offsetX = touch.pageX - draggableDiv.offsetLeft;
        offsetY = touch.pageY - draggableDiv.offsetTop;
      } else {
        offsetX = e.clientX - draggableDiv.offsetLeft;
        offsetY = e.clientY - draggableDiv.offsetTop;
      }

      document.addEventListener('mousemove', onMove);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('mouseup', onStop);
      document.addEventListener('touchend', onStop);
    }

    // Función que se activa durante el movimiento del toque o el ratón
    function onMove(e) {
      e.preventDefault();
      if (isDragging) {
        if (e.type === 'touchmove') {
          var touch = e.targetTouches[0];
          draggableDiv.style.left = touch.pageX - offsetX + 'px';
          draggableDiv.style.top = touch.pageY - offsetY + 'px';
        } else {
          draggableDiv.style.left = e.clientX - offsetX + 'px';
          draggableDiv.style.top = e.clientY - offsetY + 'px';
        }
      }
    }

    // Función que se activa al detener el toque o el clic del ratón
    function onStop() {
      isDragging = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('mouseup', onStop);
      document.removeEventListener('touchend', onStop);
    }

    // Eventos tanto para dispositivos móviles como para PC
    draggableDiv.addEventListener('mousedown', onStart);
    draggableDiv.addEventListener('touchstart', onStart);
  }
