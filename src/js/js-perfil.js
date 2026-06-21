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
    if (localStorage.getItem("usuarioActivo") == undefined || localStorage.getItem("usuarioActivo") == "undefined"){
        //esta doble condicion es porque el buscador lo detecta distinto a cuando hay una variable guardada en localstorage, pero vacia
        //a cuando no hay ninguna variable guardada. En un caso ideal, deberia estar dicha variable vacia siempre (corresponde a la 
        //primera condicion del "if"). Pero si no pasa, se usa el la segunda condicion
        window.location.href = "ingreso-usuario.html"
    }else mostrarInformacion();
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