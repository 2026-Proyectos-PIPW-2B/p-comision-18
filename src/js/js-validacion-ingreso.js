import { limpiarEstados } from "./moduloValidacion.js";
import { mostrarExito } from "./moduloValidacion.js";
import { mostrarMensajeError } from "./moduloValidacion.js";
import { setearBoton } from "./modulo-botones.js";

let arregloUsuarios;

window.addEventListener("load", function(){
    setearArreglo();
    setearBoton();
    inicializar();    
})


function setearArreglo(){
    arregloUsuarios = JSON.parse(localStorage.getItem("arregloUsuarios"));
    if (arregloUsuarios == undefined){
       arregloUsuarios = [{"username":"admin@dcicell","password":"admin123","admin":true}];    
       localStorage.setItem("arregloUsuarios", JSON.stringify(arregloUsuarios));
    }
    
}

function inicializar(){
    const formulario = document.getElementById("formularioIngreso");
    const inputUsername = document.getElementById("inputUsername");
    const inputPassword = document.getElementById("inputPassword");
    limpiarEstados();
    formulario.addEventListener("submit", function(event){
        event.preventDefault(); 
        limpiarEstados();
        if (validarIngreso(inputUsername, inputPassword)){
            setearUsuarioActivo(inputUsername)
            aceptarIngreso("ingresoValido");
        }
    })

}
function setearUsuarioActivo(username){
    let usuario = getUsuario(username);
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
}

function getUsuario(username){
    let usuario = arregloUsuarios.find(user => user.username == username.value );
    return usuario;
}

function aceptarIngreso(ingresoValido){
    document.getElementById(ingresoValido).innerText = "Usuario valido!"
     setTimeout(() => {
        redirigir(JSON.parse(localStorage.getItem("usuarioActivo")));
    }, 1300);
}

function redirigir(usuario){
    if (usuario.admin){
        window.location.href = "admin-index.html";
    }else window.location.href = "perfil-usuario.html";    
}

function validarIngreso(username, password){
    let ingresoValido = true;
    if (!validarUsername(username)) ingresoValido = false;
    if (!validarPassword(password, username)) ingresoValido = false;
    return ingresoValido;
    
}

function validarUsername(username){
    if (validator.isEmpty(username.value.trim())){
        mostrarMensajeError(username, "divErrorUsername", "El nombre de usuario no puede estar vacio.");
        return false;
    }else{
        let usuarioEncontrado = false;
        for (let user of arregloUsuarios){
            if (user.username == username.value){
                mostrarExito(username);
                usuarioEncontrado = true;
                break;
            }
        }
        if(!usuarioEncontrado){
            mostrarMensajeError(username, "divErrorUsername", "El usuario no esta registrado en la pagina.");
        }else mostrarExito(username);
        return usuarioEncontrado;
    }
    
}

function validarPassword(password, username){
    if (validator.isEmpty(password.value.trim())){
        mostrarMensajeError(password, "divErrorPassword", "Ingrese una contraseña.");
        return false;
    }else{
        let passwordCorrecta = false;
        for(const user of arregloUsuarios){
            if (user.username == username.value && user.password == password.value){
                mostrarExito(password);
                passwordCorrecta = true;
                break;
            }
        }
        if (passwordCorrecta){
            mostrarExito(password)
        }else mostrarMensajeError(password, "divErrorPassword", "Contraseña incorrecta.")
        return passwordCorrecta;
    }
}
