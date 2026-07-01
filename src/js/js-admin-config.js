import { obtenerConfiguraciones, setConfiguraciones } from "./moduloLocalStorage.js";
import { controlIngreso } from "./moduloValidacion.js";

const botonGuardarConfig = document.getElementById("botonGuardarConfig");
const inputStockBajo = document.getElementById("inputStockBajo");
const inputStockMedio = document.getElementById("inputStockMedio");
const inputStockAlto = document.getElementById("inputStockAlto");
const inputProductosPorPagina = document.getElementById("inputProductosPorPagina");

window.addEventListener("load", function(){
    controlIngreso();
    inicializarPagina();
    botonGuardarConfig.addEventListener("click", function(){
        guardarConfiguracion();
    })
});

function inicializarPagina(){
    let configuracion = obtenerConfiguraciones();
    if(configuracion != null){
        inputStockAlto.value = configuracion.stockAlto;
    inputStockMedio.value = configuracion.stockMedio;
    inputStockBajo.value = configuracion.stockBajo;
    inputProductosPorPagina.value = configuracion.productosPorPagina;
    }
}

function guardarConfiguracion(){
    let configuracion = {
        stockBajo : inputStockBajo.value,
        stockMedio : inputStockMedio.value,
        stockAlto : inputStockAlto.value,
        productosPorPagina : inputProductosPorPagina.value
    }
    setConfiguraciones(configuracion);

}