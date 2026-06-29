import { obtenerUsuarioActivo } from "./moduloLocalStorage.js";

const tablaCuerpo = document.getElementById("tablaBody");

// Capturamos los inputs de ordenamiento
const selectMonto = document.getElementById("ordenarMonto");
const selectPedidos = document.getElementById("ordenarPedidos");

let usuarioActivo = obtenerUsuarioActivo();

document.addEventListener("DOMContentLoaded", function () {
  inicializarPagina();
});

function inicializarPagina() {
  let arregloPedidos =
    usuarioActivo && usuarioActivo.historialProductos
      ? usuarioActivo.historialProductos
      : [];

  //cargamos tabla segun el filtro puesto
  selectMonto.addEventListener("change", () => {
    if (selectMonto.value !== "sin-ordenar") {
      selectPedidos.value = "recientes";
    }
    procesarYMostrarTabla(arregloPedidos);
  });

  selectPedidos.addEventListener("change", () => {
    if (
      selectPedidos.value !== "recientes" ||
      selectMonto.value !== "sin-ordenar"
    ) {
      selectMonto.value = "sin-ordenar";
    }
    procesarYMostrarTabla(arregloPedidos);
  });

  procesarYMostrarTabla(arregloPedidos);
}

function procesarYMostrarTabla(arreglo) {
  let pedidosProcesados = [...arreglo];

  //suma de productos
  pedidosProcesados.forEach((pedido) => {
    pedido._totalCalculado = pedido.pedidosUsuario.reduce((acum, item) => {
      return acum + item.precio * (item.cantidad || 1);
    }, 0);
  });

  //Filtro por Monto
  if (selectMonto.value === "monto-asc") {
    pedidosProcesados.sort((a, b) => a._totalCalculado - b._totalCalculado);
  } else if (selectMonto.value === "monto-desc") {
    pedidosProcesados.sort((a, b) => b._totalCalculado - a._totalCalculado);
  }
  //Si no hay orden de monto, aplica el orden cronológico
  else {
    if (selectPedidos.value === "recientes") {
      pedidosProcesados.reverse();
    }
    // Si es "antiguos", mantenemos el orden natural ascendente de cómo se guardaron
  }

  mostrarTabla(pedidosProcesados);
}

function mostrarTabla(arreglo) {
  tablaCuerpo.innerHTML = "";

  if (arreglo.length === 0) {
    const filaVacia = generarParaFilavacia();
    tablaCuerpo.appendChild(filaVacia);
  } else {
    arreglo.forEach((pedido) => {
      const { filaPrincipal, filaDetalle } = crearFilaPedido(pedido);

      tablaCuerpo.appendChild(filaPrincipal);
      tablaCuerpo.appendChild(filaDetalle);
    });
  }
}

function generarParaFilavacia() {
  const filaVacia = document.createElement("tr");
  const celdaVacia = document.createElement("td");
  celdaVacia.colSpan = 5;
  celdaVacia.className = "text-center text-muted py-4";

  const icono = document.createElement("i");
  icono.className = "bi bi-bag-x fs-3 d-block mb-2";
  const textoAviso = document.createTextNode(
    "Aún no realizaste ninguna compra.",
  );

  celdaVacia.appendChild(icono);
  celdaVacia.appendChild(textoAviso);
  filaVacia.appendChild(celdaVacia);
  return filaVacia;
}

function crearFilaPedido(pedido) {
  let cantidadProductos = 0;
  let precioTotalPedido = 0;

  pedido.pedidosUsuario.forEach((item) => {
    const cant = item.cantidad || 1;
    cantidadProductos += cant;
    precioTotalPedido += item.precio * cant;
  });

  const fechaCompra = pedido.fecha || new Date().toLocaleDateString("es-AR");

  const filaPrincipal = document.createElement("tr");
  filaPrincipal.className = "align-middle";

  const tdFecha = document.createElement("td");
  tdFecha.textContent = fechaCompra;
  filaPrincipal.appendChild(tdFecha);

  const tdId = document.createElement("td");
  tdId.className = "fw-bold text-secondary";
  tdId.textContent = `#${pedido.nroPedido}`;
  filaPrincipal.appendChild(tdId);

  const tdCantidad = document.createElement("td");
  tdCantidad.textContent = `${cantidadProductos} ${cantidadProductos === 1 ? "artículo" : "artículos"}`;
  filaPrincipal.appendChild(tdCantidad);

  const tdTotal = document.createElement("td");
  tdTotal.className = "fw-semibold text-dark";
  tdTotal.textContent = `$${precioTotalPedido.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
  filaPrincipal.appendChild(tdTotal);

  const tdAccion = document.createElement("td");
  const botonVerMas = document.createElement("button");
  botonVerMas.className =
    "btn btn-sm btn-outline-primary fw-medium d-flex align-items-center gap-1";

  const iconoBoton = document.createElement("i");
  iconoBoton.className = "bi bi-eye";
  const textoBoton = document.createTextNode(" Ver más");

  botonVerMas.appendChild(iconoBoton);
  botonVerMas.appendChild(textoBoton);
  tdAccion.appendChild(botonVerMas);
  filaPrincipal.appendChild(tdAccion);

  const filaDetalle = document.createElement("tr");
  filaDetalle.className = "d-none bg-light bg-opacity-50";

  const celdaDetalle = document.createElement("td");
  celdaDetalle.colSpan = 5;
  celdaDetalle.className = "p-3 border-top-0";

  const contenedorInterno = document.createElement("div");
  contenedorInterno.className =
    "p-3 rounded bg-white shadow-sm border-start border-3 border-primary";

  const tituloDetalle = document.createElement("h6");
  tituloDetalle.className =
    "fw-bold text-primary mb-3 d-flex align-items-center gap-2";

  const iconoTitulo = document.createElement("i");
  iconoTitulo.className = "bi bi-box-seam";
  const textoTitulo = document.createTextNode(
    ` Resumen de Productos - Compra #${pedido.nroPedido}`,
  );

  tituloDetalle.appendChild(iconoTitulo);
  tituloDetalle.appendChild(textoTitulo);
  contenedorInterno.appendChild(tituloDetalle);

  pedido.pedidosUsuario.forEach((item) => {
    const cant = item.cantidad || 1;
    const subtotalItem = item.precio * cant;

    const divProducto = document.createElement("div");
    divProducto.className =
      "d-flex justify-content-between align-items-center mb-2 py-2 border-bottom border-light text-secondary small";

    const divInfoIzquierda = document.createElement("div");
    const spanCant = document.createElement("span");
    spanCant.className = "fw-bold text-dark me-1";
    spanCant.textContent = `${cant}x`;

    const textoNombre = document.createTextNode(` ${item.nombre} `);
    const smallPrecioUnitario = document.createElement("small");
    smallPrecioUnitario.className = "text-muted";
    smallPrecioUnitario.textContent = `($${item.precio.toLocaleString("es-AR")} c/u)`;

    divInfoIzquierda.appendChild(spanCant);
    divInfoIzquierda.appendChild(textoNombre);
    divInfoIzquierda.appendChild(smallPrecioUnitario);

    const spanSubtotal = document.createElement("span");
    spanSubtotal.className = "fw-semibold text-dark";
    spanSubtotal.textContent = `$${subtotalItem.toLocaleString("es-AR")}`;

    divProducto.appendChild(divInfoIzquierda);
    divProducto.appendChild(spanSubtotal);
    contenedorInterno.appendChild(divProducto);
  });

  celdaDetalle.appendChild(contenedorInterno);
  filaDetalle.appendChild(celdaDetalle);

  configurarBotonVerMas(botonVerMas, filaPrincipal, filaDetalle);

  return { filaPrincipal, filaDetalle };
}

function configurarBotonVerMas(boton, filaPrincipal, filaDetalle) {
  boton.addEventListener("click", () => {
    const estaOculto = filaDetalle.classList.contains("d-none");

    boton.innerHTML = "";
    const nuevoIcono = document.createElement("i");

    if (estaOculto) {
      filaDetalle.classList.remove("d-none");
      nuevoIcono.className = "bi bi-eye-slash";
      boton.appendChild(nuevoIcono);
      boton.appendChild(document.createTextNode(" Ocultar"));

      boton.classList.replace("btn-outline-primary", "btn-secondary");
      filaPrincipal.classList.add("table-primary");
    } else {
      filaDetalle.classList.add("d-none");
      nuevoIcono.className = "bi bi-eye";
      boton.appendChild(nuevoIcono);
      boton.appendChild(document.createTextNode(" Ver más"));

      boton.classList.replace("btn-secondary", "btn-outline-primary");
      filaPrincipal.classList.remove("table-primary");
    }
  });
}
