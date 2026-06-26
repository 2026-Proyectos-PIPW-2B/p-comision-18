import { obtenerUsuarioActivo, setUsuarioActivo } from "./moduloLocalStorage.js";
import { controlIngreso, redirigir } from "./moduloValidacion.js";

export function setearBoton() {
  let boton = document.getElementById("botonPerfil");
  configurarEstiloBoton(boton);
  boton.addEventListener("click", function(){
      redirigir();
  });
}

function configurarEstiloBoton(boton) {
  if (obtenerUsuarioActivo() == null) {
    boton.innerText = "Iniciar Sesion";
  } else boton.innerText = "Perfil";
}

