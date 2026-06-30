
import { crearCardProductoCarrito, crearProducto } from "./moduloCrearCards.js";
import { setearBotonPerfil } from "./modulo-botones.js"
import { obtenerListadoProductos, obtenerUsuarioActivo, obtenerCarritoCompras, 
  setUsuarioActivo, obtenerArregloUsuarios, setArregloUsuarios, 
  obtenerHistorialDePedidos, setHistorialDePedidos } from "./moduloLocalStorage.js";

let listadoProductos;
let carritoDeCompras;

window.addEventListener("load", function(){
    setearBotonPerfil();
    agregarListeners();
    listadoProductos = obtenerListadoProductos();
    carritoDeCompras = obtenerCarritoCompras();
    inicializarCarrito();
    mostrarCatalogo();
    inicializarFiltros();
});

function agregarListeners(){
    agregarListenerCompra();
}

function agregarListenerCompra(){
    const botonCompra = document.getElementById("compraCarrito");
    botonCompra.addEventListener("click", function () {
    confirmarCompra();
  });
}

function confirmarCompra(){
    cerrarCarrito();
    limpiarCarrito();
    registrarCompra();
    carritoDeCompras = []
    actualizarCarrito();
    mostrarAviso();
}

function cerrarCarrito() {
  const offcanvasElement = document.getElementById("carritoCompras");
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
  offcanvas.hide();
}

function limpiarCarrito() {
    const productosCarrito = document.getElementById("productosCarrito");
    actualizarCarrito();
    productosCarrito.innerText = "";
}

function mostrarAviso() {
  const modal = new bootstrap.Modal(
    document.getElementById("modalCompraExitosa"),
  );
  modal.show();
}
function inicializarCarrito(){
    const carrito = document.getElementById("carritoCompras");
    carrito.addEventListener("show.bs.offcanvas",  visualizarCarrito);
}

function mostrarCatalogo(){
    limpiarListadoProductos();
    if (listadoProductos.length === 0){
        mostrarMensajeSinProductos();
    }else{
       for (let producto of listadoProductos) {
        mostrarProducto(producto);
       }
    }
}

function limpiarListadoProductos(){
    let contenedorProductos = obtenerContenedorProductos();
    contenedorProductos.innerHTML = "";
}
function mostrarMensajeSinProductos(){
    const mensaje = document.createElement("h4");
    mensaje.className = "text-light-50 text-center my-5 w-100";
    mensaje.textContent = "No hay productos para mostrar.";
    let contenedorProductos = obtenerContenedorProductos();
    contenedorProductos.appendChild(mensaje);
}

function mostrarProducto(producto){
    let productoCreado = crearProducto(producto);
    let contenedorProductos = obtenerContenedorProductos();
    contenedorProductos.appendChild(productoCreado);
}

function obtenerContenedorProductos(){
    let contenedorProductos = document.getElementById("listado-productos");
    return contenedorProductos;
}

function actualizarCarrito(){
    let usuarioActualizado = obtenerUsuarioActivo();
    if (usuarioActualizado != null){
    usuarioActualizado.carrito = carritoDeCompras;
    setUsuarioActivo(usuarioActualizado);
    let arregloUsuariosActualizado = obtenerArregloUsuarios();
    const indice = arregloUsuariosActualizado.findIndex(
    user => user.username === usuarioActualizado.username
    );    
    arregloUsuariosActualizado[indice] = usuarioActualizado;
    setArregloUsuarios(arregloUsuariosActualizado);}
}

function alertaLoginRequerido(){
    const modalLogin = new bootstrap.Modal(document.getElementById("modalLoginRequerido"));
    modalLogin.show();
}
function productoEstaEnCarrito(producto){
    return carritoDeCompras.some((item) => item.id === producto.id);
}
function getItemCarrito(producto){
    let productoEnCarrito = carritoDeCompras.find((item) => item.id === producto.id);
    if (productoEnCarrito){
        return productoEnCarrito;
    }else return null;
}
function mostrarConfirmacionCarrito(producto){
    const textoModal = document.getElementById("textoProductoAgregado");
    textoModal.textContent = `"${producto.nombre}" se sumó a tu carrito correctamente.`;
    const modalExito = new bootstrap.Modal(
    document.getElementById("modalProductoAgregado"),
    );
    modalExito.show();
}

function visualizarCarrito(){
    limpiarCarrito();
    const botonCompra = document.getElementById("compraCarrito");
    botonCompra.classList.remove("disabled");
    const contenedorCarrito = document.getElementById("productosCarrito");
    if (obtenerUsuarioActivo() == null){
        botonCompra.classList.add("disabled")
        mostrarAvisoSesion();
        return;
    }
    if (obtenerCarritoCompras().length > 0){
        crearCarrito(contenedorCarrito);
    }else{
        botonCompra.classList.add("disabled");
        mostrarMensajeCarritoVacio(contenedorCarrito);
        return;
    }
}
function mostrarAvisoSesion(){
    let contenedor = document.getElementById("carritoSinUsuario");
    let titulo = document.createElement("h4");
    let boton = document.createElement("button");
    let icono = document.createElement("i");
    titulo.innerText = "Para ver su carrito o agregar productos, inicie sesion."
    icono.className = "bi bi-person";
    boton.className = "btn btn-info";
    boton .appendChild(icono)
    boton.innerHTML += "Iniciar Sesion";
    boton.addEventListener("click", function(){window.location.href = "ingreso-usuario.html"})
    contenedor.appendChild(titulo);
    contenedor.appendChild(boton);
}

function mostrarMensajeCarritoVacio(contenedorCarrito){
    let p = document.createElement("p");
    p.className = "text-muted text-center my-3";
    p.textContent = "El carrito esta vacio."
    contenedorCarrito.appendChild(p);
}
function crearCarrito(contenedorCarrito){
    let carrito = obtenerCarritoCompras();
    for (let producto of carrito){
        let cardProducto = crearCardProductoCarrito(producto);
        contenedorCarrito.appendChild(cardProducto);
    }
}

export function eliminarDelCarrito(producto){
    const usuario = obtenerUsuarioActivo();
    let indice = carritoDeCompras.findIndex(
    item => item.id === producto.id
    );
    if (indice !== -1){
    carritoDeCompras.splice(indice, 1)
    actualizarCarrito();
    visualizarCarrito();}
}

function inicializarFiltros() {
    const botonAplicarFiltro = document.getElementById("btnAplicarFiltros");
    const botonBorraFiltros = document.getElementById("btnBorrarFiltros");
    if (botonAplicarFiltro) {
        botonAplicarFiltro.addEventListener("click", function(){
            aplicarFiltrosYOrden()
        });
    }
    if (botonBorraFiltros) {
        botonBorraFiltros.addEventListener("click", borrarFiltros);
    }
}

function aplicarFiltrosYOrden(){
    listadoProductos = obtenerListadoProductos();
    listadoProductos = filtrarPorPrecio();
    listadoProductos = filtrarPorCategoria();
    listadoProductos = ordenar();
    mostrarCatalogo();
    cerrarOffCanvasFiltros();
}
function filtrarPorPrecio(){
    const inputMin = document.getElementById("inputPrecioMinimo");
    const inputMax = document.getElementById("inputPrecioMaximo");
    let resultado = listadoProductos;
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
function filtrarPorCategoria(){
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
    return listadoProductos;
    }
    let resultado = [];
    if (radioCelulares && radioCelulares.checked) {
    resultado = listadoProductos.filter(
      (p) => p.categoriaObligatoria.toLowerCase() === "telefono",
    );
  } else if (radioAuriculares && radioAuriculares.checked) {
    resultado = listadoProductos.filter(
      (p) => p.categoriaObligatoria.toLowerCase() === "auriculares",
    );
  } else if (radioCargadores && radioCargadores.checked) {
    resultado = listadoProductos.filter(
      (p) => p.categoriaObligatoria.toLowerCase() === "cargadores",
    );
  } else if (radioFundas && radioFundas.checked) {
    resultado = listadoProductos.filter(
      (p) => p.categoriaObligatoria.toLowerCase() === "fundas",
    );
  }
  return resultado;    
}
function ordenar(){
    const selectOrdenar = document.getElementById("inputOrdenar");
    let resultado = listadoProductos;

    if (selectOrdenar && selectOrdenar.value !== "vacio") {
        if (selectOrdenar.value === "menorPrecio") {
            resultado.sort((a, b) => a.precio - b.precio);
        } else if (selectOrdenar.value === "mayorPrecio") {
            resultado.sort((a, b) => b.precio - a.precio);
        }
    }
  return resultado;
}
function borrarFiltros(){
    limpiarInputsFiltros();
    listadoProductos = obtenerListadoProductos();
    mostrarCatalogo();
    cerrarOffCanvasFiltros();
}
function limpiarInputsFiltros(){
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
}
function cerrarOffCanvasFiltros(){
    const offcanvasElement = document.getElementById("formularioFiltros");
    if (offcanvasElement) {
        let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (!offcanvas) {
        offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    }
    offcanvas.hide();
    }
}

export function crearModal(producto){
    let imagenProducto = document.getElementById("fotoModal");
    imagenProducto.src = producto.imagen;
    let modalNombreProducto = document.getElementById("modalNombreProducto");
    modalNombreProducto.innerText = producto.nombre;
    let modalPrecio = document.getElementById("modalPrecio");
    modalPrecio.innerText = "$"+producto.precio; //dar formato
    let modalDescripcion = document.getElementById("modalDescripcion")
    modalDescripcion.innerText = producto.descripcion;
    let botonCarritoModal = document.getElementById("botonCarritoModal");
     botonCarritoModal.onclick = function(){
            cerrarModalProducto();
            agregarAlCarrito(producto);
        };
}
function cerrarModalProducto(){
    const modal = bootstrap.Modal.getInstance(document.getElementById("modal-mostrar"));
    if (modal) {
        modal.hide();
    }
}

export function agregarAlCarrito(producto){
    const usuario = obtenerUsuarioActivo();
    if (usuario == null){
        alertaLoginRequerido();
        return;
    }
    if (productoEstaEnCarrito(producto)){
        let productoEnCarrito = getItemCarrito(producto);
        productoEnCarrito.cantidad++;
    }else{
        console.log(usuario)
        console.log(carritoDeCompras)
        carritoDeCompras.push({
            ...producto,
            cantidad: 1
        });
        
    }
    actualizarCarrito();
    mostrarConfirmacionCarrito(producto);

}
//=======================================
//Merge de seba
//=======================================

function registrarCompra(){
  let usuario = obtenerUsuarioActivo();
  let monto = CalcularMontoCarrito();
  let pedidoNuevo = {
    id : Date.now(),
    comprador : usuario.username,
    pedido : carritoDeCompras,
    montoTotal : monto
  }
  console.log(pedidoNuevo)
  agregarAlHistorialGeneral(pedidoNuevo);
  
}
function agregarAlHistorialGeneral(pedido){
  let historialDePedidos = obtenerHistorialDePedidos();
  historialDePedidos.push(pedido);
  setHistorialDePedidos(historialDePedidos);
}

function CalcularMontoCarrito(){
  let monto = 0;
  for (let producto of carritoDeCompras){
    monto += (producto.precio * producto.cantidad);
  }
  console.log(monto);
  return monto;
}
