import { setearBoton } from "./modulo-botones.js";
import { agregarAlCarritoReal } from "./js-tienda-carritoDeCompras.js";
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
  const usuarioLogueado =
    JSON.parse(localStorage.getItem("usuarioActivo")) || null;
  if (usuarioLogueado) {
    usuarioLogueado.carritoDeCompras = [];
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioLogueado));

    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = listaUsuarios.findIndex(
      (u) => u.email === usuarioLogueado.email || u.id === usuarioLogueado.id,
    );
    if (index !== -1) {
      listaUsuarios[index] = usuarioLogueado;
      localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
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
    mensaje.className = "text-muted text-center my-5 w-100";
    mensaje.textContent = "No hay productos para mostrar.";
    contenedorProductos.appendChild(mensaje);
    return;
  }

  productosAMostrar.forEach((producto) => {
    // cuerpo del producto
    const col = document.createElement("div");
    col.classList.add("col-sm-6", "col-md-4", "col-lg-3");

    // creacion de card
    const card = document.createElement("div");
    card.className = "card shadow-lg h-100 border-0 rounded-3 overflow-hidden";

    // 3. Crear el botón de la imagen (para el modal)
    const btnImg = document.createElement("button");
    btnImg.type = "button";
    btnImg.className = "border-0 bg-transparent p-3 text-center";
    btnImg.setAttribute("data-bs-toggle", "modal");
    btnImg.setAttribute("data-bs-target", `#modal-${producto.id}`);

    const img = document.createElement("img");
    img.src = producto.imagen;
    img.className = "card-img-top";
    img.style.height = "220px";
    img.style.objectFit = "contain";
    img.alt = producto.nombre;

    btnImg.appendChild(img); // Metemos la imagen dentro del botón

    // Creamos el cuerpo de la tarjeta
    const cardBody = document.createElement("div");
    cardBody.className = "card-body d-flex flex-column justify-content-between";

    // Contenedor para título y precio
    const infoContenedor = document.createElement("div");

    const btnTitulo = document.createElement("button");
    btnTitulo.type = "button";
    btnTitulo.className = "border-0 bg-transparent text-start p-0 mb-2";
    btnTitulo.setAttribute("data-bs-toggle", "modal");
    btnTitulo.setAttribute("data-bs-target", `#modal-${producto.id}`);

    const titulo = document.createElement("h4");
    titulo.className = "card-title text-dark fw-bold m-0";
    titulo.textContent = producto.nombre;
    btnTitulo.appendChild(titulo);

    const precio = document.createElement("p");
    precio.className = "fs-5 text-primary fw-bold mb-2";
    precio.textContent = `$${producto.precio.toFixed(2)}`;

    infoContenedor.appendChild(btnTitulo);
    infoContenedor.appendChild(precio);

    // Crear el botón de Agregar al carrito
    const btnCarrito = document.createElement("button");
    btnCarrito.className =
      "btn btn-primary w-100 mt-2 d-flex align-items-center justify-content-center gap-2";
    btnCarrito.innerHTML = '<i class="bi bi-cart"></i> ';

    if (producto.stock <= 0) {
      btnCarrito.disabled = true;
      btnCarrito.appendChild(document.createTextNode("Sin Stock"));
    } else {
      btnCarrito.appendChild(document.createTextNode("Agregar al carrito"));
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
