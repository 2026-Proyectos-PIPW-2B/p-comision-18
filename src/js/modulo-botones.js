export function setearBoton(){
    let boton = document.getElementById("botonPerfil");
    configurarBoton(boton);
    boton.addEventListener("click", controlIngreso)
}

function configurarBoton(boton){
    if (localStorage.getItem("usuarioActivo") == undefined || localStorage.getItem("usuarioActivo") == "undefined"){
        boton.innerText = "Iniciar Sesion";
    }else boton.innerText = "Perfil"
}

function controlIngreso(){
    let usuarioActivo = localStorage.getItem("usuarioActivo"); 
    switch (usuarioActivo) {
        case null:{
            localStorage.setItem("usuarioActivo", undefined);        
            window.location.href = "ingreso-usuario.html"
            break;
        }
        case "undefined":
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

export function botonCerrarSesion(){
    let boton = document.getElementById("botonCerrarSesion");
    boton.addEventListener("click", function(){
        localStorage.setItem("usuarioActivo", undefined);
        window.location.href = "index.html"
    })
}