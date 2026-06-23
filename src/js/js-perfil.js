import { setearBoton } from "./modulo-botones.js";
import { controlIngreso } from "./moduloValidacion.js";

window.addEventListener("load", function(){
    setearBoton();
    controlIngreso();
    inicializar();
})

    const nombrePerfil = document.getElementById("nombrePerfil");
    const apellidoPerfil = document.getElementById("apellidoPerfil");
    const correoPerfil = document.getElementById("correoPerfil");
    const direccionPerfil = document.getElementById("direccionPerfil");
    const telefonoPerfil = document.getElementById("telefonoPerfil");
    const botonCerrar = document.getElementById("botonCerrarPerfil");

function inicializar(){
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
    if (!usuarioActivo.activo){
        let divDeshabilitado = document.getElementById("usuarioDeshabilitado");
        divDeshabilitado.classList.add("alert", "alert-danger");
        divDeshabilitado.innerText = "Su cuenta esta deshabilitada. Para volver a habilitarla y realizar sus compras, comuniquese a ayuda@dcicell.com"
    }
}

function cerrarCuenta(){
    localStorage.setItem("usuarioActivo", undefined);
    window.location.href = "index.html"
}