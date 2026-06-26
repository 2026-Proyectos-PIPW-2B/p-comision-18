import { controlIngreso, setBotonCerrarSesion } from "./moduloValidacion.js";

window.addEventListener("load", function(){
    //controlIngresoAdmin();
    controlIngreso();
    setBotonCerrarSesion();
});