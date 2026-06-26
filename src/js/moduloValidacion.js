import { obtenerArregloUsuarios, obtenerUsuarioActivo } from "./moduloLocalStorage.js";


export function limpiarEstados() {
    const inputs = document.querySelectorAll(".form-control, .form-select")
    for (const input of inputs) {
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
    }
}

export function mostrarMensajeError(input, idDiv, mensaje){
    input.classList.add("is-invalid");
    document.getElementById(idDiv).textContent = mensaje;
}

export function mostrarExito(input){
    input.classList.add("is-valid")
}

export function encontrarUsuario(userName){
    let arregloUsuarios = obtenerArregloUsuarios();
    let usuarioRetorno;
    if (arregloUsuarios != null){
        for (let user of arregloUsuarios){
            if (validator.equals(userName, user.username)){
                usuarioRetorno = user;
                break
            }
        }
    }
    return usuarioRetorno;
}

export function controlIngreso(){
    const usuarioActivo = obtenerUsuarioActivo();
    let paginaActual = getPaginaActual();
    switch (usuarioActivo) {
        case null:{      
            window.location.href = "ingreso-usuario.html"
            break;
        }
        default : {
            if (!usuarioActivo.admin && paginaActual.includes("admin"))
                window.location.href = "index.html";
            break;
        }
    }
}

export function redirigir(){
    const usuarioActivo = obtenerUsuarioActivo();
    switch(usuarioActivo){
    case null:{
        window.location.href = "ingreso-usuario.html";
        break;
    }
    default:
      if(usuarioActivo.admin){
        window.location.href = "admin-index.html";
      }else 
        window.location.href = "perfil-usuario.html"
  } 
}

function getPaginaActual(){
    return window.location.pathname;
}



export function setBotonCerrarSesion() {
  let boton = document.getElementById("botonCerrarSesion");
  boton.addEventListener("click", function () {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "index.html"
  });
}