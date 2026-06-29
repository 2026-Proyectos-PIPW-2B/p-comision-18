import { agregarAlCarrito, crearModal, eliminarDelCarrito } from "./js-tienda.js";

export function crearProducto(producto){
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
    botonTitulo.appendChild(titulo);
    return botonTitulo;
}
function crearTitulo(producto){
    const titulo = document.createElement("h4");
    titulo.className = "card-title text-white fw-bold m-0 fs-5";
    titulo.textContent = producto.nombre;
    return titulo;
}
function crearPrecio(producto){
    const precio = document.createElement("p");
    precio.className = "fs-4 text-info fw-bold mb-2";
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
       //boton.appendChild(document.createTextNode("Agregar al carrito."));
       //por que?
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


let productoCarrito;
export function crearCardProductoCarrito(productoAgregado){
    productoCarrito = productoAgregado;
    let cardCarrito = crearColCarrito();
    return cardCarrito;
}

function crearColCarrito(){
    let colCarrito = document.createElement("div");
    colCarrito.className = "w-100 d-flex align-items-center justify-content-between mb-3 p-2 bg-secondary bg-opacity-10 border border-secondary border-opacity-25 rounded-3 shadow-sm";
    colCarrito.style.height = "fit-content";
    let divInfo = crearDivInfo();
    let botonEliminar = crearBotonEliminarCarrito();
    colCarrito.appendChild(divInfo);
    colCarrito.appendChild(botonEliminar);
    return colCarrito;
}
function crearDivInfo(){
    let divInfo = document.createElement("div");
    divInfo.className = "d-flex align-items-center gap-3";
    let imagen = crearImagenCarrito();
    let divTextos = crearDivTextosCarrito() ;
    divInfo.appendChild(imagen);
    divInfo.appendChild(divTextos);
    return divInfo;
}

function crearImagenCarrito(){
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
function crearDivTextosCarrito(){
    const divTextos = document.createElement("div");
    let titulo = crearTituloCarrito();
    let detallePrecio = crerPrecioCarrito();
    let br = document.createElement("br");
    let spanSubtotal = crearSubtotalCarrito();
    divTextos.appendChild(titulo);
    divTextos.appendChild(detallePrecio);
    divTextos.appendChild(br);
    divTextos.appendChild(spanSubtotal);
    return divTextos;
}
function crearTituloCarrito(){
    let titulo = document.createElement("h6");
    titulo.className = "mb-0 text-white fw-semibold text-truncate";
    titulo.style.maxWidth = "140px";
    //esto deberia ser dinamico, no tamaños fijos!
    titulo.textContent = productoCarrito.nombre;
    return titulo;
}
function crerPrecioCarrito(){
    let precio = document.createElement("small");
    precio.className = "text-light-50 d-block lh-sm my-1";
    precio.textContent = `Cant: ${productoCarrito.cantidad} x $${productoCarrito.precio.toFixed(2)}`;
    return precio;
}
function crearSubtotalCarrito(){
    let span = document.createElement("span");
    let subtotal = productoCarrito.precio * productoCarrito.cantidad;
    span.className = "text-info fw-bold fs-6";
    span.textContent = `$${subtotal.toFixed(2)}`;
    return span;
}
function crearBotonEliminarCarrito(){
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