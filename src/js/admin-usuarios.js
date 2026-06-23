let arregloUsuarios;
const tabla = document.getElementById("cuerpoTabla");

window.addEventListener("load", function(){
    arregloUsuarios = JSON.parse(localStorage.getItem("arregloUsuarios"));
    iniciarTabla();
})

function iniciarTabla(){
    if (arregloUsuarios != null || arregloUsuarios != "undefined"){
        tabla.innerHTML = "";
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
    td.appendChild(crearBotonDeshabilitar(user));
    fila.appendChild(td);

    td = document.createElement("td");
    td.appendChild(crearBotonEliminar(user.username));
    fila.appendChild(td)
    
    td = document.createElement("td");
    td.appendChild(crearSelectorAdmin(user));
    fila.appendChild(td);

    tabla.appendChild(fila);
}

function crearBotonDeshabilitar(user){
    let boton = document.createElement("button");
    boton.classList.add("btn", "btn-info");
    if (user.activo)
        boton.innerText = "Deshabilitar";
        else boton.innerText = "Habilitar"
    boton.addEventListener("click", function(){deshabilitarUsuario(user.username)});
    return boton;
}

function deshabilitarUsuario(username){
    for(let usuario of arregloUsuarios){
        if (usuario.username == username){
            if(usuario.activo){
                usuario.activo = false;
            }
                else usuario.activo = true;
            break
        }
    }
    localStorage.setItem("arregloUsuarios", JSON.stringify(arregloUsuarios))
    iniciarTabla();
}

function crearBotonEliminar(username){
    let boton = document.createElement("button")
    boton.classList.add("btn", "btn-danger");
    boton.innerText = "Eliminar"
    boton.addEventListener("click", function(){eliminarUsuario(username)});
    return boton;
}

function eliminarUsuario(identificadorUsuario){
    arregloUsuarios = arregloUsuarios.filter(usuario => usuario.username != identificadorUsuario);
    localStorage.setItem("arregloUsuarios", JSON.stringify(arregloUsuarios))
    iniciarTabla();
}

function crearSelectorAdmin(user){
    let contenedor = document.createElement("div");
    contenedor.classList.add("form-check", "form-switch", "d-flex", "justify-content-center");
    
    let selector = document.createElement("input");
    selector.type = "checkbox";
    selector.classList.add("form-check-input");
    selector.checked = user.admin;
    contenedor.appendChild(selector);
    selector.addEventListener("change", function(){permisosDeAdmin(user, selector)})
    return contenedor;
}

function permisosDeAdmin(user, selector){
    user.admin = selector.checked;
    localStorage.setItem("arregloUsuarios",JSON.stringify(arregloUsuarios));
    iniciarTabla();
}
