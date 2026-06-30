import { limpiarEstados, redirigir} from "./moduloValidacion.js";
import { mostrarExito } from "./moduloValidacion.js";
import { mostrarMensajeError } from "./moduloValidacion.js";
import { setearBotonPerfil } from "./modulo-botones.js";
import { obtenerArregloUsuarios, setArregloUsuarios, setUsuarioActivo } from "./moduloLocalStorage.js";

let arregloUsuarios;

window.addEventListener("load", function(){
    arregloUsuarios = obtenerArregloUsuarios();
    setearBotonPerfil();
    inicializar();    
})

function inicializar(){
    const formulario = document.getElementById("formularioIngreso");
    const inputUsername = document.getElementById("inputUsername");
    const inputPassword = document.getElementById("inputPassword");
    limpiarEstados();
    formulario.addEventListener("submit", function(event){
        event.preventDefault(); 
        limpiarEstados();
        if (validarIngreso(inputUsername, inputPassword)){
            let user = getUsuario(inputUsername);
            setUsuarioActivo(user);
            aceptarIngreso("ingresoValido");
        }
    })

}

function getUsuario(inputUsername){
    let usuario = arregloUsuarios.find(user => user.username == inputUsername.value );
    return usuario;
}

function aceptarIngreso(ingresoValido){
    document.getElementById(ingresoValido).innerText = "Usuario valido!"
     setTimeout(() => {
        redirigir();
    }, 1300);
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
