import { obtenerHistorialDePedidos } from "./moduloLocalStorage";

let historial;
let cuerpoDeTabla;
window.addEventListener("load", function(){
    historial = obtenerHistorialDePedidos();
    cuerpoDeTabla = document.getElementById("tablaBody")
    mostrarTabla();
})

function mostrarTabla(){
    cuerpoDeTabla.innerHTML = "";
    if (historial.length === 0){
        cuerpoDeTabla.appendChild(generarFilaVacia());
    }else{

    }
}
