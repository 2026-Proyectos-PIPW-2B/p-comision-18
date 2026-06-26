import { controlIngreso, limpiarEstados } from "./moduloValidacion.js";
import { mostrarExito } from "./moduloValidacion.js";
import { mostrarMensajeError } from "./moduloValidacion.js";
import { encontrarUsuario } from "./moduloValidacion.js";
import { setearBotonPerfil } from "./modulo-botones.js";
import { obtenerArregloUsuarios, setArregloUsuarios, setUsuarioActivo } from "./moduloLocalStorage.js";

const inputNombre = document.getElementById("inputNombre");
const inputApellido = document.getElementById("inputApellido");
const inputDireccion = document.getElementById("inputDireccion");
const inputTelefono = document.getElementById("inputTelefono");
const inputCorreo = document.getElementById("inputCorreo");
const inputPassword = document.getElementById("inputPassword");
const inputConfirmPassword = document.getElementById("inputConfirmPassword");

window.addEventListener("load", function () {
  setearBotonPerfil();
  inicializar();
});

function inicializar() {
  const formulario = document.getElementById("formularioRegistro");
  const inputPassword = document.getElementById("inputPassword");
  inputPassword.addEventListener("input", function () {
    validarDinamico(inputPassword);
  });
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validarRegistro()) {
      registrarUsuario();
      setTimeout(() => {
        window.location.href = "perfil-usuario.html";
      }, 1300);
    }
  });
}

function validarRegistro() {
  limpiarEstados();
  let registroValido = true;
  if (!validarCadena(inputNombre, "Nombre")) registroValido = false;
  if (!validarCadena(inputApellido, "Apellido")) registroValido = false;
  if (!validarTelefono(inputTelefono)) registroValido = false;
  if (!validarDireccion(inputDireccion)) registroValido = false;
  if (!validarCorreo(inputCorreo)) registroValido = false;
  if (!validarPasswords(inputPassword, inputConfirmPassword))
    registroValido = false;
  return registroValido;
}

function validarCadena(input, campoError) {
  if (validator.isEmpty(input.value.trim())) {
    mostrarMensajeError(
      input,
      `error${campoError}`,
      `El ${campoError} no puede estar vacio`,
    );
    return false;
  } else {
    mostrarExito(input);
    return true;
  }
}
function validarTelefono(input) {
  if (validator.isEmpty(input.value.trim())) {
    mostrarMensajeError(
      input,
      "errorTelefono",
      "Ingrese un numero de telefono.",
    );
    return false;
  }
  const valor = input.value.replace(/[+-]/g, "");
  if (valor.length != 10) {
    mostrarMensajeError(
      input,
      "errorTelefono",
      "Ingrese un numero de telefono valido.",
    );
    return false;
  }
  mostrarExito(input);
  return true;
}
function validarDireccion(input) {
  if (validator.isEmpty(input.value.trim())) {
    mostrarMensajeError(input, "errorDireccion", "Ingrese una direccion.");
    return false;
  }
  mostrarExito(input);
  return true;
}

function validarCorreo(input) {
  if (validator.isEmpty(input.value.trim())) {
    mostrarMensajeError(
      input,
      "errorCorreo",
      "El correo no puede estar vacio.",
    );
    return false;
  }
  if (!validator.isEmail(input.value)) {
    mostrarMensajeError(input, "errorCorreo", "Ingrese un correo valido.");
    return false;
  }
  if (yaRegistrado(input.value)) {
    mostrarMensajeError(
      input,
      "errorCorreo",
      "El correo ya se encuentra registrado.",
    );
    return false;
  }
  mostrarExito(input);
  return true;
}

function yaRegistrado(correo) {
  return encontrarUsuario(correo) != undefined;
}

function validarPasswords(input1, input2) {
  if (
    validator.isEmpty(input1.value.trim()) &&
    validator.isEmpty(input2.value.trim())
  ) {
    mostrarMensajeError(input1, "errorPassword", "Ingrese una contraseña");
    mostrarMensajeError(input2, "errorPassword", "Ingrese una contraseña");
    return false;
  }
  if (!validator.equals(input1.value, input2.value)) {
    mostrarMensajeError(
      input1,
      "errorPassword",
      "Las contraseñas no coinciden",
    );
    mostrarMensajeError(
      input2,
      "errorPassword",
      "Las contraseñas no coinciden",
    );
    return false;
  }
  if (
    !validator.isStrongPassword(input1.value, {
      minLength: 10,
      minLowercase: 0,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    mostrarMensajeError(input1, "errorPassword", "La contraseña no es segura");
    mostrarMensajeError(input2, "errorPassword", "La contraseña no es segura");
    return false;
  }
  mostrarExito(input1);
  mostrarExito(input2);
  return true;
}

function validarDinamico(input) {
  actualizarRegla("password1", input.value.length >= 10);
  actualizarRegla("password2", /[A-Z]/.test(input.value));
  actualizarRegla("password3", /[^A-Za-z0-9]/.test(input.value));
  actualizarRegla("password4", /[0-9]/.test(input.value));
  if (validator.isEmpty(input.value.trim())) {
    quitarErrorSucces();
  }
}

function actualizarRegla(id, cumple) {
  const elemento = document.getElementById(id);
  elemento.classList.remove("text-secondary", "text-danger", "text-success");
  if (cumple) {
    elemento.classList.add("text-success");
  } else {
    elemento.classList.add("text-danger");
  }
}
function quitarErrorSucces() {
  document
    .getElementById("password1")
    .classList.remove("text-danger", "text-success");
  document
    .getElementById("password2")
    .classList.remove("text-danger", "text-success");
  document
    .getElementById("password3")
    .classList.remove("text-danger", "text-success");
  document
    .getElementById("password4")
    .classList.remove("text-danger", "text-success");
  document.getElementById("password1").classList.add("text-secondary");
  document.getElementById("password2").classList.add("text-secondary");
  document.getElementById("password3").classList.add("text-secondary");
  document.getElementById("password4").classList.add("text-secondary");
}

function registrarUsuario() {
  let usuarioNuevo = {
    username: inputCorreo.value,
    password: inputPassword.value,
    nombre: inputNombre.value,
    apellido: inputApellido.value,
    direccion: inputDireccion.value,
    telefono: inputTelefono.value,
    carrito: [],
    historial: [],
    admin: false,
    activo: true,
  };
  let usuarios = obtenerArregloUsuarios();
  if (usuarios == null) {
    usuarios = [usuarioNuevo];
  } else {
    usuarios = obtenerArregloUsuarios();
    usuarios.push(usuarioNuevo);
  }
  setArregloUsuarios(usuarios);
  setUsuarioActivo(usuarioNuevo);
}