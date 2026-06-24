import { renderizarCatalogo } from "./js-tienda.js";
// Importamos validator.js desde una CDN compatible con módulos ES
import validator from "https://cdn.jsdelivr.net/npm/validator@13.11.0/+esm";

document.addEventListener("DOMContentLoaded", inicializarFiltros);

function inicializarFiltros() {
  const botonAplicarFiltro = document.getElementById("btnAplicarFiltros");
  const botonBorraFiltros = document.getElementById("btnBorrarFiltros");
  if (botonAplicarFiltro) {
    botonAplicarFiltro.addEventListener("click", aplicarFiltrosYOrden);
  }
  if (botonBorraFiltros) {
    botonBorraFiltros.addEventListener("click", borrarFiltros);
  }
}

function aplicarFiltrosYOrden() {
  const listaTotalDeProductos =
    JSON.parse(localStorage.getItem("productos")) || [];

  let productosProcesados = filtrarPorPrecio(listaTotalDeProductos);
  productosProcesados = filtrarPorCategoria(productosProcesados);
  productosProcesados = ordenar(productosProcesados);

  renderizarCatalogo(productosProcesados);

  cerrarOffcanvasFiltros();
}

function filtrarPorPrecio(listaAFiltrar) {
  const inputMin = document.getElementById("inputPrecioMinimo");
  const inputMax = document.getElementById("inputPrecioMaximo");

  let resultado = [...listaAFiltrar];

  if (inputMin && inputMin.value.trim() !== "") {
    const valorMin = inputMin.value.trim();
    if (validator.isFloat(valorMin, { min: 0 })) {
      resultado = resultado.filter((p) => p.precio >= Number(valorMin));
    } else {
      console.warn("Precio mínimo inválido.");
    }
  }

  // Validación con validator.js para Precio Máximo
  if (inputMax && inputMax.value.trim() !== "") {
    const valorMax = inputMax.value.trim();
    if (validator.isFloat(valorMax, { min: 0 })) {
      resultado = resultado.filter((p) => p.precio <= Number(valorMax));
    } else {
      console.warn("Precio máximo inválido.");
    }
  }

  return resultado;
}

function filtrarPorCategoria(listaAFiltrar) {
  const radioCelulares = document.getElementById("inputCelulares");
  const radioAuriculares = document.getElementById("inputAuriculares");
  const radioCargadores = document.getElementById("inputCargadores");
  const radioFundas = document.getElementById("inputFundas");

  if (
    (!radioCelulares || !radioCelulares.checked) &&
    (!radioAuriculares || !radioAuriculares.checked) &&
    (!radioCargadores || !radioCargadores.checked) &&
    (!radioFundas || !radioFundas.checked)
  ) {
    return listaAFiltrar;
  }

  let resultado = [];
  if (radioCelulares && radioCelulares.checked) {
    resultado = listaAFiltrar.filter(
      (p) => p.categoriaObligatoria.toLowerCase() === "telefono",
    );
  } else if (radioAuriculares && radioAuriculares.checked) {
    resultado = listaAFiltrar.filter(
      (p) => p.categoriaObligatoria.toLowerCase() === "auriculares",
    );
  } else if (radioCargadores && radioCargadores.checked) {
    resultado = listaAFiltrar.filter(
      (p) => p.categoriaObligatoria.toLowerCase() === "cargadores",
    );
  } else if (radioFundas && radioFundas.checked) {
    resultado = listaAFiltrar.filter(
      (p) => p.categoriaObligatoria.toLowerCase() === "fundas",
    );
  }

  return resultado;
}

function ordenar(listaAOrdenar) {
  const selectOrdenar = document.getElementById("inputOrdenar");

  let resultado = [...listaAOrdenar];

  if (selectOrdenar && selectOrdenar.value !== "vacio") {
    if (selectOrdenar.value === "menorPrecio") {
      resultado.sort((a, b) => a.precio - b.precio);
    } else if (selectOrdenar.value === "mayorPrecio") {
      resultado.sort((a, b) => b.precio - a.precio);
    }
  }

  return resultado;
}

function cerrarOffcanvasFiltros() {
  const offcanvasElement = document.getElementById("formularioFiltros");
  if (offcanvasElement) {
    let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (!offcanvas) {
      offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    }
    offcanvas.hide();
  }
}

function borrarFiltros() {
  const inputMin = document.getElementById("inputPrecioMinimo");
  const inputMax = document.getElementById("inputPrecioMaximo");
  if (inputMin) inputMin.value = "";
  if (inputMax) inputMax.value = "";

  const selectOrdenar = document.getElementById("inputOrdenar");
  if (selectOrdenar) selectOrdenar.value = "vacio";

  const radiosCategorias = document.querySelectorAll(
    'input[name="radioFiltro"]',
  );
  radiosCategorias.forEach((radio) => {
    radio.checked = false;
  });

  const listaTotalDeProductos =
    JSON.parse(localStorage.getItem("productos")) || [];
  renderizarCatalogo(listaTotalDeProductos);

  cerrarOffcanvasFiltros();
}
