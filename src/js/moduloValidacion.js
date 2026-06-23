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
    let arregloUsuarios = JSON.parse(localStorage.getItem("arregloUsuarios"));
    let usuarioRetorno;
    if (arregloUsuarios != undefined){
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
    let usuarioActivo = localStorage.getItem("usuarioActivo"); 
    switch (usuarioActivo) {
        case null:{
            localStorage.setItem("usuarioActivo", undefined);        
            window.location.href = "ingreso-usuario.html"
            break;
        }
        case "undefined":
            localStorage.setItem("arregloUsuarios", JSON.stringify([{username : "admin@dcicell", password : "admin123", admin:true}]));
            window.location.href = "ingreso-usuario.html";
            break;
        default:{
            if (JSON.parse(usuarioActivo).admin){
                window.location.href = "admin-listado-productos.html"
            }
            break;
        }
    }
}