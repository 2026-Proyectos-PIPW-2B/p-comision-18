import { obtenerConfiguraciones, setConfiguraciones } from "./moduloLocalStorage.js";
import { controlIngreso } from "./moduloValidacion.js";

const botonGuardarConfig = document.getElementById("botonGuardarConfig");
const inputStockBajo = document.getElementById("inputStockBajo");
const inputStockMedio = document.getElementById("inputStockMedio");
const inputStockAlto = document.getElementById("inputStockAlto");
const inputProductosPorPagina = document.getElementById("inputProductosPorPagina");
const inputDescuentoEfectivo = document.getElementById("inputDescuentoEfectivo")
const inputCuotasSinInteres = document.getElementById("inputCuotasSinInteres");

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
    inputStockBajo.value = configuracion.stockBajo;
    inputProductosPorPagina.value = configuracion.productosPorPagina;
    inputDescuentoEfectivo.value = configuracion.descuentoEfectivo;
    inputCuotasSinInteres.value = configuracion.cuotasSinInteres;
    }
}

function guardarConfiguracion(){
    let configuracion = {
        stockBajo : inputStockBajo.value,
        stockAlto : inputStockAlto.value,
        productosPorPagina : inputProductosPorPagina.value,
        descuentoEfectivo: inputDescuentoEfectivo.value,
        cuotasSinInteres : inputCuotasSinInteres.value
    }
    let divConfirmacion = document.getElementById("divConfirmacion");
    divConfirmacion.innerText = "Configurcion guardada exitosamente.";
    const timeoutId = setTimeout(() => {
        divConfirmacion.innerText = "";
    }, 3000);
    setConfiguraciones(configuracion);
    inicializarPagina();

}