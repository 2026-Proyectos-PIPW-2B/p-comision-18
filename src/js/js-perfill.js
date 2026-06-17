window.addEventListener("load", function(){
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

    if (localStorage.getItem("usuario-activo") == "undefined"){
        console.log("Hola")
        window.location.href = "html/ingreso-usuario.html"
    }else mostrarInformacion();
}


function mostrarInformacion(){
    const usuarioActivo = JSON.parse(localStorage.getItem("usuario-activo"));

    nombrePerfil.innerHTML += usuarioActivo.nombre;
    apellidoPerfil.innerHTML += usuarioActivo.apellido;
    correoPerfil.innerHTML += usuarioActivo.username;
    direccionPerfil.innerHTML += usuarioActivo.direccion;
    telefonoPerfil.innerHTML += usuarioActivo.telefono;
}

function cerrarCuenta(){
    localStorage.setItem("usuario-activo", undefined);
    window.location.href = "html/index.html"
}