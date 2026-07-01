import { setearBotonPerfil } from "./modulo-botones.js"
import { obtenerListadoProductos, obtenerUsuarioActivo, obtenerCarritoCompras, 
  setUsuarioActivo, obtenerArregloUsuarios, setArregloUsuarios, 
  obtenerHistorialDePedidos, setHistorialDePedidos, 
  obtenerConfiguraciones} from "./moduloLocalStorage.js";
import { agregarAlCarrito, confirmarCompra, setearCarrito } from "./moduloCarrito.js";

let listadoProductos;

window.addEventListener("load", function(){
    setearBotonPerfil();
    agregarListeners();
    listadoProductos = obtenerListadoProductos();
    setearCarrito();
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
    listadoProductos = obtenerListadoProductos();
    mostrarCatalogo();
  });
}

function mostrarCatalogo(){
    limpiarListadoProductos();
    if (listadoProductos === null || listadoProductos.length === 0 ){
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

export function alertaLoginRequerido(){
    const modalLogin = new bootstrap.Modal(document.getElementById("modalLoginRequerido"));
    modalLogin.show();
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
    let configuracion = obtenerConfiguraciones();
    let precioDescuento = producto.precio * (100 - configuracion.descuentoEfectivo)/100;
    let imagenProducto = document.getElementById("fotoModal");
    imagenProducto.src = producto.imagen;
    let modalNombreProducto = document.getElementById("modalNombreProducto");
    modalNombreProducto.innerText = producto.nombre;
    let modalPrecio = document.getElementById("modalPrecio");
    let modalCuotas = document.getElementById("modalCuotas");
    modalCuotas.innerText = `${configuracion.cuotasSinInteres} cuotas x $${(producto.precio/configuracion.cuotasSinInteres).toLocaleString("es-AR")} sin interes`
    modalPrecio.innerText = "$"+producto.precio.toLocaleString("es-AR")
    let modalDescuento = document.getElementById("modalDescuento");
    modalDescuento.innerText = `Con pago en efectivo o transferencia $${(precioDescuento).toLocaleString("es-AR")} (${configuracion.descuentoEfectivo}% de descuento!)`
    let modalStock = document.getElementById("modalStock");
    modalStock.innerText = `Stock restante: ${producto.stock}`;
    let modalDescripcion = document.getElementById("modalDescripcion")
    modalDescripcion.innerText = producto.descripcion;
    mostrarCategorias(producto);
    let botonCarritoModal = document.getElementById("botonCarritoModal");
     botonCarritoModal.onclick = function(){
            cerrarModalProducto();
            agregarAlCarrito(producto);
        };
}   
function mostrarCategorias(producto){
    let modalCategorias = document.getElementById("modalCategorias");
    let li;
    modalCategorias.innerText = "";
    if (producto.categoriasExtra !== null){
        for (let categoria of producto.categoriasExtra){
            li = document.createElement("li");
            li.innerText = categoria;
            modalCategorias.appendChild(li);
            modalCategorias.appendChild(li)
        }
    }
}
function cerrarModalProducto(){
    const modal = bootstrap.Modal.getInstance(document.getElementById("modal-mostrar"));
    if (modal) {
        modal.hide();
    }
}

function crearProducto(producto){
    const cardProducto = crearCol(producto);
    return cardProducto;
}
function crearCol(producto){
    let col = document.createElement("div");
    col.classList.add("col-sm-6", "col-md-4", "col-lg-3");
    const card = crearCard(producto);   
    col.appendChild(card);
    return col;
}
function crearCard(producto){
    let card = document.createElement("div");
    card.className = "card bg-dark bg-opacity-75 text-light shadow-lg h-100 border border-secondary border-opacity-25 rounded-3 overflow-hidden";
    card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    const botonImagen = crearBotonImagen(producto);
    const cardBody = crearCardBody(producto);
    card.appendChild(botonImagen);
    card.appendChild(cardBody);
    return card;
}
function crearBotonImagen(producto){
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "border-0 bg-transparent p-3 text-center w-100";
    boton.setAttribute("data-bs-toggle", "modal");
    boton.setAttribute("data-bs-target", `#modal-mostrar`);
    boton.addEventListener("click", function(){
        crearModal(producto);
    });
    const imagen = crearImagen(producto);
    boton.appendChild(imagen);
    return boton
}
function crearImagen(producto){
    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.className = "card-img-top img-fluid";
    imagen.style.height = "220px";
    imagen.style.objectFit = "contain";
    imagen.alt = producto.nombre;
    return imagen;
}
function crearCardBody(producto){
    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column justify-content-between pt-0";
    let infoContenedor = crearInfoContenedor(producto);
    let botonCarrito = crearBotonCarrito(producto);
    cardBody.appendChild(infoContenedor);
    cardBody.appendChild(botonCarrito);
    return cardBody;
}
function crearInfoContenedor(producto){
    const infoContenedor = document.createElement("div");
    infoContenedor.className = "d-flex flex-column flex-grow-1";
    let botonTitulo = crearBotonTitulo(producto);
    let precio = crearPrecio(producto);
    infoContenedor.appendChild(botonTitulo);
    infoContenedor.appendChild(precio);
    return infoContenedor;
}
function crearBotonTitulo(producto){
    const botonTitulo = document.createElement("button");
    botonTitulo.type = "button";
    botonTitulo.className = "border-0 bg-transparent text-start p-0 mb-2 w-100";
    botonTitulo.setAttribute("data-bs-toggle", "modal");
    botonTitulo.setAttribute("data-bs-target", `#modal-${producto.id}`);
    let titulo = crearTitulo(producto);
    //let stock = crearIconoStock(producto)
    //botonTitulo.appendChild(stock);
    botonTitulo.appendChild(titulo);
    
    return botonTitulo;
}
function crearTitulo(producto){
    const titulo = document.createElement("h5");
    titulo.className = "card-title text-white fw-bold m-0 fs-5";
    
    titulo.appendChild(document.createTextNode(producto.nombre));
    titulo.appendChild(crearIconoStock(producto));
    return titulo;
}
function crearIconoStock(producto){
    console.log(producto);
    let icono = document.createElement("i");
    let configuracion = obtenerConfiguraciones()
    console.log(configuracion)
    console.log(producto.stock)
    if (producto.stock <= configuracion.stockBajo){
        icono.className = "bi bi-bag-x text-danger ms-2";
        return icono;
    }
    if(producto.stock >= configuracion.stockAlto){
        icono.className = "bi bi-bag-check text-success ms-2"
        return icono;
    }
    icono.className = "bi bi-bag-dash text-warning ms-2";
    return icono
}
function crearPrecio(producto){
    const precio = document.createElement("p");
    precio.className = "fs-4 text-info fw-bold mb-2 mt-auto";
    precio.textContent = `$${producto.precio.toFixed(2)}`;
    return precio;
}
function crearBotonCarrito(producto){
    const botonCarrito = document.createElement("button");
    botonCarrito.className = "btn w-100 mt-2 d-flex align-items-center justify-content-center gap-2 fw-semibold";
    botonCarrito.innerHTML = '<i class="bi bi-cart"></i> ';
    configurarBotonCarrito(botonCarrito, producto);
    return botonCarrito;
}
function configurarBotonCarrito(boton, producto){
    if (producto.stock > 0){
        boton.className += " btn-info text-dark";
        boton.innerHTML = '<i class="bi bi-cart-plus-fill"></i> Agregar al carrito';
        setListeners(boton,producto);
    }else{
        boton.className += " btn-outline-secondary text-muted";
        boton.disabled = true;
        boton.innerHTML = '<i class="bi bi-x-circle"></i> Sin Stock';
    }
}
function setListeners(boton, producto){
    boton.addEventListener("click", function(){
        agregarAlCarrito(producto);
    })
}