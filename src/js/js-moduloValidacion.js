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
