import { obtenerHistorialDePedidos, obtenerUsuarioActivo } from "./moduloLocalStorage.js";

const tablaCuerpo = document.getElementById("tablaBody");

// Capturamos los inputs de ordenamiento
const selectMonto = document.getElementById("ordenarMonto");
const selectPedidos = document.getElementById("ordenarPedidos");

let usuarioActivo = obtenerUsuarioActivo();
let historialDelUsuario;

document.addEventListener("DOMContentLoaded", function () {
  inicializarHistorial();
  inicializarPagina();
});

function inicializarHistorial(){
  historialDelUsuario = obtenerHistorialDePedidos().filter(pedido => pedido.comprador === usuarioActivo.username);
}

function inicializarPagina() {
  //cargamos tabla segun el filtro puesto
  selectMonto.addEventListener("change", () => {
    if (selectMonto.value !== "sin-ordenar") {
      selectPedidos.value = "recientes";
    }
    procesarYMostrarTabla(historialDelUsuario);
  });

  selectPedidos.addEventListener("change", () => {
    if (
      selectPedidos.value !== "recientes" ||
      selectMonto.value !== "sin-ordenar"
    ) {
      selectMonto.value = "sin-ordenar";
    }
    procesarYMostrarTabla(historialDelUsuario);
  });

  procesarYMostrarTabla(historialDelUsuario);
}

function procesarYMostrarTabla(arreglo) {
  let pedidosProcesados = [...arreglo];

  //suma de productos
  pedidosProcesados.forEach((pedido) => {
    pedido._totalCalculado = pedido.productos.reduce((acum, item) => {
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
      const { filaPrincipal, filaDetalle } = crearPedidoDelHistorial(pedido);

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





function crearTituloDetalle(pedido){
  const tituloDetalle = document.createElement("h6");
  tituloDetalle.className =
    "fw-bold text-primary mb-3 d-flex align-items-center gap-2";

  const iconoTitulo = document.createElement("i");
  iconoTitulo.className = "bi bi-box-seam";
  const textoTitulo = document.createTextNode(
    ` Resumen de Productos - Compra #${pedido.id}`,
  );
  tituloDetalle.appendChild(iconoTitulo);
  tituloDetalle.appendChild(textoTitulo);
  return tituloDetalle;
}

function crearPedidoDelHistorial(pedido) {
  const {filaPrincipal, botonVerMas} = crearFilaPrincipal(pedido); 
  const filaDetalle = crearFilaDetalle(pedido);
  configurarBotonVerMas(botonVerMas, filaPrincipal, filaDetalle);

  return { filaPrincipal, filaDetalle };
}
function crearFilaPrincipal(pedido){
  const filaPrincipal = document.createElement("tr");
  filaPrincipal.className = "align-middle";
  filaPrincipal.appendChild(crearCeldaDeFecha(pedido.id));
  filaPrincipal.appendChild(crearCeldaDeID(pedido.id));
  filaPrincipal.appendChild(crearCeldaCantidad(pedido));
  filaPrincipal.appendChild(crearCeldaTotal(pedido.montoTotal));
  let botonVerMas = crearBotonVerMas();
  filaPrincipal.appendChild(crearCeldaVerMas(botonVerMas));
  return {filaPrincipal, botonVerMas}
}

function crearFilaDetalle(pedido){
  const filaDetalle = document.createElement("tr");
  filaDetalle.className = "d-none bg-light bg-opacity-50";
  filaDetalle.appendChild(crearCeldaDetalle(pedido));
  return filaDetalle;
}

function crearCeldaDetalle(pedido){
  const celdaDetalle = document.createElement("td");
  celdaDetalle.colSpan = 5;
  celdaDetalle.className = "p-3 border-top-0";
  celdaDetalle.appendChild(crearContenedorInterno(pedido));
  return celdaDetalle;
}

function crearContenedorInterno(pedido){
  const contenedorInterno = document.createElement("div");
  contenedorInterno.className =
    "p-3 rounded bg-white shadow-sm border-start border-3 border-primary";
  contenedorInterno.appendChild(crearTituloDetalle(pedido))
  pedido.productos.forEach((item) => {
    const subtotalItem = item.precio * item.cantidad;
    const divProducto = document.createElement("div");
    divProducto.className =
      "d-flex justify-content-between align-items-center mb-2 py-2 border-bottom border-light text-secondary small";
    const divInfoIzquierda = document.createElement("div");
    const spanCant = document.createElement("span");
    spanCant.className = "fw-bold text-dark me-1";
    spanCant.textContent = `${item.cantidad}x`;

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
  return contenedorInterno;
}

function  crearCeldaDeFecha(fechaSinFormato){
  const fechaCompra = new Date(fechaSinFormato).toLocaleDateString("es-AR");
  const tdFecha = document.createElement("td");
  tdFecha.textContent = fechaCompra;
  return tdFecha
}

function crearCeldaDeID(id){
  const tdId = document.createElement("td");
  tdId.className = "fw-bold text-secondary";
  tdId.textContent = `#${id}`;
  return tdId;
}
function crearCeldaCantidad(pedido){
  let cantidadProductos = 0;
  pedido.productos.forEach((item) => {
    cantidadProductos += item.cantidad;
  });
  const tdCantidad = document.createElement("td");
  tdCantidad.textContent = `${cantidadProductos} ${cantidadProductos === 1 ? "artículo" : "artículos"}`;
  return tdCantidad
}
function crearCeldaTotal(total){
  const tdTotal = document.createElement("td");
  tdTotal.className = "fw-semibold text-dark";
  tdTotal.textContent = `$${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
  return tdTotal;
}
function crearCeldaVerMas(boton){
  const tdVerMas = document.createElement("td");
  tdVerMas.appendChild(boton);
  return tdVerMas;
}
function crearBotonVerMas(){
  const botonVerMas = document.createElement("button");
  botonVerMas.className =
    "btn btn-sm btn-outline-primary fw-medium d-flex align-items-center gap-1";
  const iconoBoton = document.createElement("i");
  iconoBoton.className = "bi bi-eye";
  const textoBoton = document.createTextNode(" Ver más");
  botonVerMas.appendChild(iconoBoton);
  botonVerMas.appendChild(textoBoton);
  return botonVerMas
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
