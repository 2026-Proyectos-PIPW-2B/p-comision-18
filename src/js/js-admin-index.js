import { botonCerrarSesion } from "./modulo-botones.js";
import { controlIngresoAdmin } from "./moduloValidacion.js";

window.addEventListener("load", function(){
    controlIngresoAdmin();
    botonCerrarSesion();
});