window.addEventListener("load", function(){
    inciarTabla();
})

const tabla = document.getElementById("cuerpoTabla");

function inciarTabla(){
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
    td.appendChild(crearBotonEliminar());
    fila.appendChild(td)
    tabla.appendChild(fila);
}

function crearBotonDeshabilitar(){
    let boton = document.createElement("button");
    boton.classList.add("btn", "btn-info");
    boton.innerText = "Deshabilitar";
    return boton;
}

function crearBotonEliminar(){
    let boton = document.createElement("button")
    boton.classList.add("btn", "btn-danger");
    boton.innerText = "Eliminar"
    return boton;
}