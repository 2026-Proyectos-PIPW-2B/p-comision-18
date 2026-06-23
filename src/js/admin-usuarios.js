let arregloUsuarios;
const tabla = document.getElementById("cuerpoTabla");

window.addEventListener("load", function(){
    arregloUsuarios = JSON.parse(localStorage.getItem("arregloUsuarios"));
    iniciarTabla();
})

function iniciarTabla(){
    if (arregloUsuarios != null || arregloUsuarios != "undefined"){
        for (let user of arregloUsuarios){
            mostrarUsuario(user);
        }
    }
}

function mostrarUsuario(user){
    let fila = document.createElement("tr");
    let td = document.createElement("td");
    td.innerText = user.nombre
    fila.appendChild(td);
    td = document.createElement("td");
    td.innerText = user.apellido;
    fila.appendChild(td);
    td = document.createElement("td");
    td.innerText = user.username;
    fila.appendChild(td);
    td = document.createElement("td");
    td.innerText = "Usuario";
    fila.appendChild(td);
    td = document.createElement("td");
    td.appendChild(crearBotonDeshabilitar(user));
    fila.appendChild(td);
    td = document.createElement("td");
    td.appendChild(crearBotonEliminar(user));
    fila.appendChild(td)
    tabla.appendChild(fila);
}

function crearBotonDeshabilitar(){
    let boton = document.createElement("button");
    boton.classList.add("btn", "btn-info");
    boton.innerText = "Deshabilitar";
    boton.addEventListener("click", function(){deshabilitarUsuario(user)});
    return boton;
}

function deshabilitarUsuario(user){
    if (user.activo){
        user.activo = false;
    }else user.activo = true;
    tabla.innerHTML = "";
    iniciarTabla();
}

function crearBotonEliminar(user){
    let boton = document.createElement("button")
    boton.classList.add("btn", "btn-danger");
    boton.innerText = "Eliminar"
    boton.addEventListener("click", function(){eliminarUsuario(user)});
    return boton;
}

function eliminarUsuario(user){
    arregloUsuarios = arregloUsuarios.filter(usuario => usuario != user);
    localStorage.setItem("arregloUsuarios", JSON.stringify(arregloUsuarios))
    tabla.innerHTML = "";
    iniciarTabla();
}