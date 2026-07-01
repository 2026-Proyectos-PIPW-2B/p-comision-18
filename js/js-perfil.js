import { setearBotonPerfil } from "./modulo-botones.js";
import { obtenerUsuarioActivo } from "./moduloLocalStorage.js";
import { controlIngreso, setBotonCerrarSesion } from "./moduloValidacion.js";

window.addEventListener("load", function(){
    controlIngreso();
    setearBotonPerfil();    
    inicializar();
})

    const nombrePerfil = document.getElementById("nombrePerfil");
    const apellidoPerfil = document.getElementById("apellidoPerfil");
    const correoPerfil = document.getElementById("correoPerfil");
    const direccionPerfil = document.getElementById("direccionPerfil");
    const telefonoPerfil = document.getElementById("telefonoPerfil");

function inicializar(){
    setBotonCerrarSesion()
    mostrarInformacion();
}


function mostrarInformacion(){
    const usuarioActivo = obtenerUsuarioActivo();
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