import { obtenerArregloUsuarios, obtenerHistorialDePedidos, obtenerListadoProductos } from "./moduloLocalStorage.js";
import { controlIngreso, setBotonCerrarSesion } from "./moduloValidacion.js";

window.addEventListener("load", function(){
    controlIngreso();
    setBotonCerrarSesion();
    iniciarMetricas();
});

function iniciarMetricas(){
    let metricaProductos = document.getElementById("metricaProductos");
    let listadoProductos = obtenerListadoProductos();
    if (listadoProductos != null){
        metricaProductos.innerText = listadoProductos.length;
    }else metricaProductos.innerText = 0;  
    let metricaUsuarios = document.getElementById("metricaUsuarios");
    metricaUsuarios.innerText = obtenerArregloUsuarios().length-1;
    let metricaCompras = document.getElementById("metricaCompras");
    let historial = obtenerHistorialDePedidos();
    metricaCompras.innerText = historial.length;
    let metricaVentas = document.getElementById("metricaVentas");
    let totalVentas = 0;
    for (let venta of historial){
        totalVentas += venta.montoTotal
    }
    metricaVentas.innerText = `$${totalVentas.toLocaleString("es-AR")}`

}
