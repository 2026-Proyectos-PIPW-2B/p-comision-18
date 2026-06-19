window.addEventListener("load", function(){
    inicializarUsuarios();
    inicializar();
    
})

function inicializarUsuarios(){
    let arregoUsuarios;
    if (localStorage.getItem("arregloUsuarios") == null){
        console.log("arreglo inexistente    ")
        arregloUsuarios = [{username : "juan.perez@example.com", password : "1234",nombre : "Juan" , apellido : "Perez", direccion : "Cale Falsa 123, Ciudad", telefono : "2911234567"},
             {username : "fulano-de-tal@example.com", password : "Contraseña", nombre : "Fulano", apellido : "De Tal", direccion : "Segurola y Habana 4310", telefono:"291555555"} ];
        localStorage.setItem("arregloUsuarios", JSON.stringify(arregloUsuarios));
    }else arregloUsuarios = JSON.parse(localStorage.getItem("arregloUsuarios"));
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
    localStorage.setItem("usuario-activo", JSON.stringify(usuario));
}

function getUsuario(username){
    let usuario = arregloUsuarios.find(user => user.username == username.value );
    return usuario;
}

function aceptarIngreso(ingresoValido, usuario){
    document.getElementById(ingresoValido).innerText = "Usuario valido!"
     setTimeout(() => {
        window.location.href = "perfil-usuario.html";
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
        for (user of arregloUsuarios){
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
        let passwordCorrecta = false
        for (user of arregloUsuarios){
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

function limpiarEstados() {
    const inputs = document.querySelectorAll(".form-control, .form-select")
    for (const input of inputs) {
        input.classList.remove("is-invalid")
        input.classList.remove("is-valid")
    }
}

function mostrarMensajeError(input, idDiv, mensaje){
    input.classList.add("is-invalid");
    document.getElementById(idDiv).textContent = mensaje;
}
function mostrarExito(input){
    input.classList.add("is-valid")
}