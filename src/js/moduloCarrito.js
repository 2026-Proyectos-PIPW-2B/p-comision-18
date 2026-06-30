import { alertaLoginRequerido } from "./js-tienda.js";
import { obtenerArregloUsuarios, obtenerCarritoCompras, obtenerHistorialDePedidos, obtenerListadoProductos, obtenerUsuarioActivo, setArregloUsuarios, setHistorialDePedidos, setListadoProductos, setUsuarioActivo } from "./moduloLocalStorage.js";

let carritoDeCompras;
export function confirmarCompra(){
    cerrarCarrito();
    limpiarCarrito();
    registrarCompra();
    carritoDeCompras = []
    actualizarCarrito();
    mostrarAviso();
}
function mostrarAviso() {
  const modal = new bootstrap.Modal(
    document.getElementById("modalCompraExitosa"),
  );
  modal.show();
}
export function setearCarrito(){
    carritoDeCompras = obtenerCarritoCompras();
    agregarListenerMostrarCarrito();
}
function cerrarCarrito() {
  const offcanvasElement = document.getElementById("carritoCompras");
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
  offcanvas.hide();
}
function limpiarCarrito() {
    const productosCarrito = document.getElementById("productosCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    actualizarCarrito();
    totalCarrito.innerText = "";
    productosCarrito.innerText = "";
}
function agregarListenerMostrarCarrito(){
    const carrito = document.getElementById("carritoCompras");
    carrito.addEventListener("show.bs.offcanvas",  visualizarCarrito);
}

function actualizarCarrito(){
    let usuarioActualizado = obtenerUsuarioActivo();
    if (usuarioActualizado != null){
    usuarioActualizado.carrito = carritoDeCompras;
    setUsuarioActivo(usuarioActualizado);
    let arregloUsuariosActualizado = obtenerArregloUsuarios();
    /*
    Opcion para verificar que no falle

    let arregloUsuariosActualizado = obtenerArregloUsuarios().filter(usuario => usuario.username != usuarioActualizado.username)
    arregloUsuariosActualizado.push(usuarioActualizado)
    */
    const indice = arregloUsuariosActualizado.findIndex(
    user => user.username === usuarioActualizado.username
    );    
    arregloUsuariosActualizado[indice] = usuarioActualizado;
    setArregloUsuarios(arregloUsuariosActualizado);}
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
    let h4 = document.createElement("h4");
    h4.className = "text-light text-center my-3";
    h4.textContent = "El carrito esta vacio."
    contenedorCarrito.appendChild(h4);
}
function crearCarrito(contenedorCarrito){
    let carrito = obtenerCarritoCompras();
    let costoCarrito = 0;
    for (let producto of carrito){
        let cardProducto = crearCardProductoCarrito(producto);
        costoCarrito += producto.cantidad * producto.precio;
        contenedorCarrito.appendChild(cardProducto);
    }
    let totalCarrito = document.getElementById("totalCarrito");
    totalCarrito.innerText = "Total: $" + costoCarrito.toLocaleString("es-AR");
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
export function agregarAlCarrito(producto){
    const usuario = obtenerUsuarioActivo();
    if (usuario == null){
        alertaLoginRequerido();
        return;
    }
    let productoEnCarrito = getItemCarrito(producto);
    if (productoEnCarrito == null){
         carritoDeCompras.push({
            ...producto,
            cantidad: 1
        });
        actualizarCarrito();
        mostrarConfirmacionCarrito(producto);
        return
    }
    if (productoEnCarrito.cantidad < producto.stock){
        productoEnCarrito.cantidad++;
        actualizarCarrito();
        mostrarConfirmacionCarrito(producto);
    }else{
        mostrarAvisoNoStock();
        return;
    }
    /*if (productoEstaEnCarrito(producto)){
        let productoEnCarrito = getItemCarrito(producto);
        productoEnCarrito.cantidad++;
    }else{
        carritoDeCompras.push({
            ...producto,
            cantidad: 1
        });
        
    }*/
    
}
function mostrarAvisoNoStock(){
  const modal = new bootstrap.Modal(
    document.getElementById("modalNoStock"),
  );
  modal.show();
}
function mostrarConfirmacionCarrito(producto){
    const textoModal = document.getElementById("textoProductoAgregado");
    textoModal.textContent = `"${producto.nombre}" se sumó a tu carrito correctamente.`;
    const modalExito = new bootstrap.Modal(
    document.getElementById("modalProductoAgregado"),
    );
    modalExito.show();
}

function registrarCompra(){
  let usuario = obtenerUsuarioActivo();
  let monto = CalcularMontoCarrito();
  let pedidoNuevo = {
    id : Date.now(),
    comprador : usuario.username,
    productos : carritoDeCompras,
    montoTotal : monto
  }
  disminuirStock();
  agregarAlHistorialGeneral(pedidoNuevo);
}
function disminuirStock(){
    let productos = obtenerListadoProductos();
    let productoEnCarrito
    for (let producto of productos){
        productoEnCarrito = getItemCarrito(producto);
        if (productoEnCarrito != null){
            console.log(producto.stock)
            producto.stock -= productoEnCarrito.cantidad;
            console.log(producto.stock)
        }
    }
    setListadoProductos(productos);
    
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
  return monto;
}


export function crearCardProductoCarrito(productoAgregado){
    let productoCarrito = productoAgregado;
    let cardCarrito = crearColCarrito(productoCarrito);
    return cardCarrito;
}

function crearColCarrito(productoCarrito){
    let colCarrito = document.createElement("div");
    colCarrito.className = "w-100 d-flex align-items-center justify-content-between mb-3 p-2 bg-secondary bg-opacity-10 border border-secondary border-opacity-25 rounded-3 shadow-sm";
    colCarrito.style.height = "fit-content";
    let divInfo = crearDivInfo(productoCarrito);
    let botonEliminar = crearBotonEliminarCarrito(productoCarrito);
    colCarrito.appendChild(divInfo);
    colCarrito.appendChild(botonEliminar);
    return colCarrito;
}
function crearDivInfo(productoCarrito){
    let divInfo = document.createElement("div");
    divInfo.className = "d-flex align-items-center gap-3";
    let imagen = crearImagenCarrito(productoCarrito);
    let divTextos = crearDivTextosCarrito(productoCarrito) ;
    divInfo.appendChild(imagen);
    divInfo.appendChild(divTextos);
    return divInfo;
}

function crearImagenCarrito(productoCarrito){
    const imagen = document.createElement("img");
    imagen.src = productoCarrito.imagen;
    imagen.alt = productoCarrito.nombre;
    imagen.style.width = "55px";
    imagen.style.height = "55px";
    //esto deberia ser dinamico, no tamaños fijos!
    imagen.style.objectFit = "contain";
    imagen.className = "bg-white p-1 rounded-2"
    return imagen;
}
function crearDivTextosCarrito(productoCarrito){
    const divTextos = document.createElement("div");
    let titulo = crearTituloCarrito(productoCarrito);
    let detallePrecio = crerPrecioCarrito(productoCarrito);
    let cambiarCantidades = crearInputCambioCantidades(productoCarrito);
    let spanSubtotal = crearSubtotalCarrito(productoCarrito);
    divTextos.appendChild(titulo);
    divTextos.appendChild(detallePrecio);
    divTextos.appendChild(cambiarCantidades);
    divTextos.appendChild(spanSubtotal);
    return divTextos;
}
function crearTituloCarrito(productoCarrito){
    let titulo = document.createElement("h6");
    titulo.className = "mb-0 text-white fw-semibold text-truncate";
    titulo.style.maxWidth = "140px";
    //esto deberia ser dinamico, no tamaños fijos!
    titulo.textContent = productoCarrito.nombre;
    return titulo;
}
function crerPrecioCarrito(productoCarrito){
    let precio = document.createElement("small");
    precio.className = "text-light-50 d-block lh-sm my-1";
    precio.textContent = `Cant: ${productoCarrito.cantidad} x $${productoCarrito.precio.toFixed(2)}`;
    return precio;
}
function crearInputCambioCantidades(productoCarrito){
    const divCantidades = document.createElement("div");
    divCantidades.className = "d-flex align-items-center gap-1 my-2";
    const botonRestar = crearBotonCantidades("-");
    const botonSumar = crearBotonCantidades("+");
    const indicatorCantidad = document.createElement("span");
    indicatorCantidad.className = "d-flex align-items-center justify-content-center border border-secondary text-white fw-semibold rounded text-center cantidad-indicador";
    indicatorCantidad.style.width = "36px";
    indicatorCantidad.style.height = "28px";
    indicatorCantidad.style.fontSize = "0.9rem";
    indicatorCantidad.textContent = productoCarrito.cantidad;
    
    divCantidades.appendChild(botonRestar);
    divCantidades.appendChild(indicatorCantidad);
    divCantidades.appendChild(botonSumar);
    setBotonSumar(botonSumar, productoCarrito);
    setBotonRestar(botonRestar, productoCarrito);
    
    return divCantidades;
}
function crearBotonCantidades(icono){
    const boton = document.createElement("button");
    boton.className = "btn btn-sm btn-outline-info btn-disminuir d-flex align-items-center justify-content-center";
    boton.style.width = "28px";
    boton.style.height = "28px";
    boton.style.padding = "0";
    boton.innerText = icono
    return boton
}
function setBotonSumar(botonSumar, productoCarrito){
    if (productoCarrito.cantidad !== productoCarrito.stock){
        botonSumar.addEventListener("click", function(){
            let producto = getItemCarrito(productoCarrito);
            producto.cantidad++;
            actualizarCarrito();
            visualizarCarrito();
        });
    }else {
        botonSumar.classList.remove("btn-outline-info")
        botonSumar.classList.add("disabled", "btn-outline-danger");}
}
function setBotonRestar(botonRestar, productoCarrito){
    if (productoCarrito.cantidad !== 1){
        botonRestar.addEventListener("click", function(){
            let producto = getItemCarrito(productoCarrito);
            producto.cantidad--;
            actualizarCarrito();            
            visualizarCarrito();
        })
    }else {
        botonRestar.classList.remove("btn-outline-info")
        botonRestar.classList.add("disabled", "btn-outline-danger");
    }
}

function crearSubtotalCarrito(productoCarrito){
    let span = document.createElement("span");
    let subtotal = productoCarrito.precio * productoCarrito.cantidad;
    span.className = "text-info fw-bold fs-6";
    span.textContent = `$${subtotal.toFixed(2)}`;
    return span;
}
function crearBotonEliminarCarrito(productoCarrito){
    let botonEliminar = document.createElement("button");
    botonEliminar.className= "btn btn-sm btn-danger border-0 p-2 d-flexx align-items-center justify-content-center rounded-circle";
    botonEliminar.style.width = "35px"
    botonEliminar.style.height = "35px"
    botonEliminar.addEventListener("click", () => eliminarDelCarrito(productoCarrito));
    let iconoEliminar = document.createElement("i");
    iconoEliminar.className = "bi bi-trash fs-5";
    botonEliminar.append(iconoEliminar);
    return botonEliminar;
}