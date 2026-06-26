import { setearBoton } from "./modulo-botones.js";
import { agregarAlCarritoReal } from "./js-tienda-carritoDeCompras.js";
import {
  obtenerArregloUsuarios,
  obtenerUsuarioActivo,
  setArregloUsuarios,
  setUsuarioActivo,
} from "./moduloLocalStorage.js";
const contenedorProductos = document.getElementById("listado-productos");
let listaProductos = JSON.parse(localStorage.getItem("productos")) || [];

document.addEventListener("DOMContentLoaded", function () {
  setearBoton();
  agregarListener();
  renderizarCatalogo(listaProductos);
});

function agregarListener() {
  const botonCarrito = document.getElementById("compraCarrito");
  if (!botonCarrito) return;

  botonCarrito.addEventListener("click", function () {
    cerrarCarrito();
    limpiarCarrito();
    mostrarAviso();
  });
}

function cerrarCarrito() {
  const offcanvasElement = document.getElementById("carritoCompras");
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
  offcanvas.hide();
}
function limpiarCarrito() {
  const productosCarrito = document.getElementById("productosCarrito");
  if (productosCarrito) {
    productosCarrito.innerText = "";
  }
  const usuarioActivo = obtenerUsuarioActivo();
  if (usuarioActivo) {
    usuarioActivo.carritoDeCompras = [];
    setUsuarioActivo(usuarioActivo);
    let arregloUsuarios = obtenerArregloUsuarios();
    const index = arregloUsuarios.findIndex(
      (u) => u.email === usuarioActivo.email || u.id === usuarioActivo.id,
    );
    if (index !== -1) {
      arregloUsuarios[index] = usuarioActivo;
      setArregloUsuarios(arregloUsuarios);
    }
  }
}
function mostrarAviso() {
  const modal = new bootstrap.Modal(
    document.getElementById("modalCompraExitosa"),
  );
  modal.show();
}

export function renderizarCatalogo(productosAMostrar) {
  contenedorProductos.innerHTML = "";

  if (productosAMostrar.length === 0) {
    const mensaje = document.createElement("h4");
    // Cambiado text-muted por text-light-50 para que sea legible sobre el fondo azul
    mensaje.className = "text-light-50 text-center my-5 w-100";
    mensaje.textContent = "No hay productos para mostrar.";
    contenedorProductos.appendChild(mensaje);
    return;
  }

  productosAMostrar.forEach((producto) => {
    // cuerpo del producto
    const col = document.createElement("div");
    col.classList.add("col-sm-6", "col-md-4", "col-lg-3");

    // creacion de card (Adaptada al modo oscuro con bordes sutiles)
    const card = document.createElement("div");
    card.className =
      "card bg-dark bg-opacity-75 text-light shadow-lg h-100 border border-secondary border-opacity-25 rounded-3 overflow-hidden";
    // Agregamos un efecto de transición sutil por si querés ponerle hover en CSS
    card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

    // 3. Crear el botón de la imagen (para el modal)
    const btnImg = document.createElement("button");
    btnImg.type = "button";
    btnImg.className = "border-0 bg-transparent p-3 text-center w-100";
    btnImg.setAttribute("data-bs-toggle", "modal");
    btnImg.setAttribute("data-bs-target", `#modal-${producto.id}`);

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.className = "card-img-top img-fluid";
    img.style.height = "220px";
    img.style.objectFit = "contain";
    img.alt = producto.nombre;

    btnImg.appendChild(img);

    // Creamos el cuerpo de la tarjeta
    const cardBody = document.createElement("div");
    cardBody.className =
      "card-body d-flex flex-column justify-content-between pt-0";

    // Contenedor para título y precio
    const infoContenedor = document.createElement("div");

    const btnTitulo = document.createElement("button");
    btnTitulo.type = "button";
    btnTitulo.className = "border-0 bg-transparent text-start p-0 mb-2 w-100";
    btnTitulo.setAttribute("data-bs-toggle", "modal");
    btnTitulo.setAttribute("data-bs-target", `#modal-${producto.id}`);

    const titulo = document.createElement("h4");
    // Cambiado text-dark por text-white para el contraste
    titulo.className = "card-title text-white fw-bold m-0 fs-5";
    titulo.textContent = producto.nombre;
    btnTitulo.appendChild(titulo);

    const precio = document.createElement("p");
    // Cambiado text-primary por text-info (Celeste Neón) para encajar con el fondo
    precio.className = "fs-4 text-info fw-bold mb-2";
    precio.textContent = `$${producto.precio.toFixed(2)}`;

    infoContenedor.appendChild(btnTitulo);
    infoContenedor.appendChild(precio);

    // Crear el botón de Agregar al carrito
    const btnCarrito = document.createElement("button");
    btnCarrito.className =
      "btn w-100 mt-2 d-flex align-items-center justify-content-center gap-2 fw-semibold";

    if (producto.stock <= 0) {
      // Estilo deshabilitado para modo oscuro
      btnCarrito.className += " btn-outline-secondary text-muted";
      btnCarrito.disabled = true;
      btnCarrito.innerHTML = '<i class="bi bi-x-circle"></i> Sin Stock';
    } else {
      // Estilo activo con btn-info (Cian / Texto oscuro) como los otros botones de la app
      btnCarrito.className += " btn-info text-dark";
      btnCarrito.innerHTML =
        '<i class="bi bi-cart-plus-fill"></i> Agregar al carrito';
      btnCarrito.addEventListener("click", () =>
        agregarAlCarritoReal(producto.id),
      );
    }

    cardBody.appendChild(infoContenedor);
    cardBody.appendChild(btnCarrito);
    card.appendChild(btnImg);
    card.appendChild(cardBody);
    col.appendChild(card);

    contenedorProductos.appendChild(col);
  });
}
