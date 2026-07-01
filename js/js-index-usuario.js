import { setearBotonPerfil } from "./modulo-botones.js";
import { limpiarLocalStorage, setLocalStorageParaExponer } from "./moduloExposicion.js";

window.addEventListener("load", function(){
    setearBotonPerfil();
    setBotonExponer();
})

function setBotonExponer(){
   let boton = document.getElementById("botonInicializarProyecto");
   boton.addEventListener("click", function(){
    limpiarLocalStorage();
    setLocalStorageParaExponer()
   })
}