import { controlIngreso, setBotonCerrarSesion } from "./moduloValidacion.js";

window.addEventListener("load", function(){
    controlIngreso();
    setBotonCerrarSesion();
});