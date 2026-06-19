window.addEventListener("load", function(){
    mostrarTabla();
})

const tabla = document.getElementById("cuerpoTabla");

function mostrarTabla(){
    tabla.innerHTML = ""
    let arregloUsuarios = JSON.parse(localStorage.getItem("arregloUsuarios"));
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
    td.appendChild(crearBotonDeshabilitar());
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
    return boton;
}

function crearBotonEliminar(usuario){
    let boton = document.createElement("button")
    boton.classList.add("btn", "btn-danger");
    boton.innerText = "Eliminar"
    boton.addEventListener("click", function(){
        eliminarUsuario(usuario);
    })
    return boton;
}
function eliminarUsuario(usuario){
    let arregloUsuarios = JSON.parse(localStorage.getItem("arregloUsuarios"));
    arregloUsuarios = arregloUsuarios.filter((user) => user.username != usuario.username);
    localStorage.setItem("arregloUsuarios", JSON.stringify(arregloUsuarios));
    mostrarTabla()
}