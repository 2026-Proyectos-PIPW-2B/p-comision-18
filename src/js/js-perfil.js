import { setearBoton } from "./modulo-botones.js";
import { controlIngreso } from "./moduloValidacion.js";

window.addEventListener("load", function(){
    setearBoton();
    controlIngreso();
    inicializar();
})

function inicializar(){
    const nombrePerfil = document.getElementById("nombrePerfil");
    const apellidoPerfil = document.getElementById("apellidoPerfil");
    const correoPerfil = document.getElementById("correoPerfil");
    const direccionPerfil = document.getElementById("direccionPerfil");
    const telefonoPerfil = document.getElementById("telefonoPerfil");
    const botonCerrar = document.getElementById("botonCerrarPerfil");
    botonCerrar.addEventListener("click", cerrarCuenta);
    mostrarInformacion();
}


function mostrarInformacion(){
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    nombrePerfil.innerHTML += usuarioActivo.nombre;
    apellidoPerfil.innerHTML += usuarioActivo.apellido;
    correoPerfil.innerHTML += usuarioActivo.username;
    direccionPerfil.innerHTML += usuarioActivo.direccion;
    telefonoPerfil.innerHTML += usuarioActivo.telefono;
}

function cerrarCuenta(){
    localStorage.setItem("usuarioActivo", undefined);
    window.location.href = "index.html"
}