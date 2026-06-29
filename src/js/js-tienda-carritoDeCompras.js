import {
  obtenerUsuarioActivo,
  setUsuarioActivo,
  obtenerRegistroPedidos,
  setRegistroPedidos,
  obtenerArregloUsuarios,
  setArregloUsuarios,
} from "./moduloLocalStorage.js";
// Contenedor del HTML donde se renderizan los productos dentro del Offcanvas
const contenedorCarrito = document.getElementById("productosCarrito");
document.addEventListener("DOMContentLoaded", carritoInicializar);
agregarListener();
function carritoInicializar() {
  const miCarrito = document.getElementById("carritoCompras");
  if (miCarrito) {
    miCarrito.addEventListener("show.bs.offcanvas", visualizarCarrito);
  }
}

function guardarUsuarioActivo(usuario) {
  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

  // Buscamos en 'arregloUsuarios' para persistir los cambios al cerrar sesión
  let listaUsuarios = JSON.parse(localStorage.getItem("arregloUsuarios")) || [];
  const indice = listaUsuarios.findIndex(
    (u) => u.email === usuario.email || u.id === usuario.id,
  );
  if (indice !== -1) {
    listaUsuarios[indice] = usuario;
    localStorage.setItem("arregloUsuarios", JSON.stringify(listaUsuarios));
  }
}

export function agregarAlCarritoReal(idProducto) {
  const usuarioActivo = obtenerUsuarioActivo();

  // 1. SI NO ESTÁ LOGUEADO: Desplegamos el modal de redirección/advertencia
  if (!usuarioActivo) {
    const modalLogin = new bootstrap.Modal(
      document.getElementById("modalLoginRequerido"),
    );
    modalLogin.show();
    return;
  }

  if (!usuarioActivo.carritoDeCompras) {
    usuarioActivo.carritoDeCompras = [];
  }

  const listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
  const productoAgregar = listaProductos.find((p) => p.id === idProducto);

  if (!productoAgregar) return;

  // Buscamos si el producto ya existe dentro del carrito de este usuario
  const itemExistente = usuarioActivo.carritoDeCompras.find(
    (item) => item.id === idProducto,
  );

  if (itemExistente) {
    // Si ya existe, simplemente incrementamos su cantidad en 1
    itemExistente.cantidad = (itemExistente.cantidad || 1) + 1;
  } else {
    // Si es nuevo, lo agregamos estructurado con la propiedad cantidad en 1
    usuarioActivo.carritoDeCompras.push({
      ...productoAgregar,
      cantidad: 1,
    });
  }

  // Guardamos los cambios de forma persistente
  guardarUsuarioActivo(usuarioActivo);

  // 2. SI ESTÁ LOGUEADO: Personalizamos el texto del modal de éxito y lo mostramos
  const textoModal = document.getElementById("textoProductoAgregado");
  if (textoModal) {
    textoModal.textContent = `"${productoAgregar.nombre}" se sumó a tu carrito correctamente.`;
  }

  const modalExito = new bootstrap.Modal(
    document.getElementById("modalProductoAgregado"),
  );
  modalExito.show();
}

function visualizarCarrito() {
  if (!contenedorCarrito) return;

  contenedorCarrito.innerHTML = "";
  const usuarioActivo = obtenerUsuarioActivo();

  if (
    !usuarioActivo ||
    !usuarioActivo.carritoDeCompras ||
    usuarioActivo.carritoDeCompras.length === 0
  ) {
    let p = document.createElement("p");
    p.className = "text-muted text-center my-3";
    p.textContent = "El carrito está vacío.";
    contenedorCarrito.appendChild(p);
    return;
  }

  usuarioActivo.carritoDeCompras.forEach((producto, indice) => {
    const nodoProducto = crearCardProductoCarrito(producto, indice);
    contenedorCarrito.appendChild(nodoProducto);
  });
}

function crearCardProductoCarrito(producto, indice) {
  const cantidad = producto.cantidad || 1;
  const subtotal = producto.precio * cantidad;

  // Contenedor principal de la fila
  const divProducto = document.createElement("div");
  // Cambiado col-12 por w-100 para mejor compatibilidad con flex-column y align-items-center para centrar verticalmente el contenido interno
  divProducto.className =
    "w-100 d-flex align-items-center justify-content-between mb-3 p-2 bg-secondary bg-opacity-10 border border-secondary border-opacity-25 rounded-3 shadow-sm";

  // EL TRUCO CLAVE: Forzamos a que el alto sea exactamente el del contenido
  divProducto.style.height = "fit-content";

  // Contenedor de la info izquierda (imagen + textos)
  const divInfo = document.createElement("div");
  divInfo.className = "d-flex align-items-center gap-3";

  // Imagen del producto
  const img = document.createElement("img");
  img.src = producto.imagen;
  img.alt = producto.nombre;
  img.style.width = "55px";
  img.style.height = "55px";
  img.style.objectFit = "contain";
  img.className = "bg-white p-1 rounded-2";

  const divTextos = document.createElement("div");

  // Título del producto
  const titulo = document.createElement("h6");
  titulo.className = "mb-0 text-white fw-semibold text-truncate";
  titulo.style.maxWidth = "140px";
  titulo.textContent = producto.nombre;

  // Detalle de cantidad y precio unitario
  const detallePrecio = document.createElement("small");
  detallePrecio.className = "text-light-50 d-block lh-sm my-1";
  detallePrecio.textContent = `Cant: ${cantidad} x $${producto.precio.toFixed(2)}`;

  // Precio subtotal acumulado
  const spanSubtotal = document.createElement("span");
  spanSubtotal.className = "text-info fw-bold fs-6";
  spanSubtotal.textContent = `$${subtotal.toFixed(2)}`;

  // Armamos la estructura de textos
  divTextos.appendChild(titulo);
  divTextos.appendChild(detallePrecio);
  divTextos.appendChild(spanSubtotal);

  // Armamos la info uniendo imagen y textos
  divInfo.appendChild(img);
  divInfo.appendChild(divTextos);

  // 3. Botón de eliminar
  const botonEliminar = document.createElement("button");
  botonEliminar.className =
    "btn btn-sm btn-outline-danger border-0 p-2 d-flex align-items-center justify-content-center rounded-circle";
  botonEliminar.style.width = "35px";
  botonEliminar.style.height = "35px";
  botonEliminar.addEventListener("click", () => eliminarDelCarrito(indice));

  // Icono del botón
  const iconoTrash = document.createElement("i");
  iconoTrash.className = "bi bi-trash fs-5";
  botonEliminar.appendChild(iconoTrash);

  // 4. Ensamble final en el contenedor principal de la fila
  divProducto.appendChild(divInfo);
  divProducto.appendChild(botonEliminar);

  return divProducto;
}

function eliminarDelCarrito(indice) {
  const usuarioActivo = obtenerUsuarioActivo();
  if (!usuarioActivo || !usuarioActivo.carritoDeCompras) return;

  // Quitamos el elemento del arreglo completo basándonos en su índice
  usuarioActivo.carritoDeCompras.splice(indice, 1);

  // Guardamos e impactamos los cambios en la vista
  guardarUsuarioActivo(usuarioActivo);
  visualizarCarrito();
}

function agregarListener() {
  const botonCarrito = document.getElementById("compraCarrito");
  if (!botonCarrito) return;

  botonCarrito.addEventListener("click", function () {
    cerrarCarrito();

    almacenarPedido();
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

function almacenarPedido() {
  let historialPedidos = obtenerRegistroPedidos();
  let nroPedidoActual = historialPedidos.nroPedido;
  let pedido = almacenarCarritoEnUsuario(nroPedidoActual);

  almacenarEnHistorialGeneral(pedido);
}

function almacenarCarritoEnUsuario(nroPedido) {
  let usuario = obtenerUsuarioActivo();
  if (!usuario) return;

  let pedidoCreado = {
    nroPedido: nroPedido,
    pedidosUsuario: usuario.carritoDeCompras || [],
  };

  if (!usuario.historialProductos) {
    usuario.historialProductos = [pedidoCreado];
  } else {
    usuario.historialProductos.push(pedidoCreado);
  }

  // 5. Guardamos de forma local el usuario actualizado (con historial nuevo y carrito vacío)
  setUsuarioActivo(usuario);

  // 6. Impactamos los cambios en el arreglo general de usuarios de la base de datos
  let arregloUsuarios = obtenerArregloUsuarios() || [];
  const index = arregloUsuarios.findIndex(
    (u) => u.email === usuario.email || u.id === usuario.id,
  );

  if (index !== -1) {
    arregloUsuarios[index] = usuario;
    setArregloUsuarios(arregloUsuarios);
  }
  let pedidoParaHistorialGeneral = {
    emailUsuario: usuario.email,
    pedido: pedidoCreado,
  };
  return pedidoParaHistorialGeneral;
}

function almacenarEnHistorialGeneral(pedido) {
  let historialGeneralPedidos = obtenerRegistroPedidos();
  historialGeneralPedidos.nroPedido += 1;
  historialGeneralPedidos.pedidosHistorial.push(pedido);
  setRegistroPedidos(historialGeneralPedidos);
}
