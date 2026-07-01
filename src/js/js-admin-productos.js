import { obtenerCategoriasExtras, obtenerListadoProductos, setListadoProductos } from "./moduloLocalStorage.js";
import { controlIngreso, limpiarEstados } from "./moduloValidacion.js";

const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputDescripcion = document.getElementById("descripcion");
const inputCategoriaObligatoria = document.getElementById("categoriaObligatoria");
const inputCategoriaOpcional = document.getElementById("categoriaOpcional");
const inputImagen = document.getElementById("imagen");
const btnImagenes = document.getElementById("btnImagenes");
const btnAgregarProducto = document.getElementById("btnAgregarProducto");
const inputStock = document.getElementById("stock");
const tablaProductos = document.getElementById("tablaProductos");

let listaProductos;

const cantidadTelefonos = 4;
const cantidadCargadores = 2;
const cantidadAuriculares = 3;
let imagenSeleccionada = "";

window.addEventListener("load", function(){
  controlIngreso();
  btnImagenes.addEventListener("click", mostrarCatalogoImagenes);
  btnAgregarProducto.addEventListener("click", agregarProducto);
  mostrarCategoriasExtras();
  listaProductos = obtenerListadoProductos();
  mostrarEnTabla();
});

function agregarProducto() {
 limpiarEstados();
 if (productoValido()){

  let producto = crearProducto();
  setListadoProductos(listaProductos);
  mostrarEnTabla();
  const timeoutId = setTimeout(() => {
    limpiarInputs();
  }, 3000); 
    
 }
}
function productoValido() {
  let resultado = true;

  const errorNombre = document.getElementById("errorNombre");
  const errorPrecio = document.getElementById("errorPrecio");
  const errorDescripcion = document.getElementById("errorDescripcion");
  const errorCategoriaObligatoria = document.getElementById("errorCategoriaObligatoria");
  const errorStock = document.getElementById("errorStock");
  const errorImagen = document.getElementById("errorImagen")

  if (inputNombre.value == ""){
    resultado = false;
    inputNombre.classList.add("is-invalid");
    errorNombre.innerText = "El nombre no puede ser vacio. Ingrese un nombre"
  }else if (inputNombre.value.length<3){
    resultado = false;
    inputNombre.classList.add("is-invalid");
    errorNombre.innerText = "El nombre debe tener mas de 3 caracteres."
  } else inputNombre.classList.add("is-valid");
  if (!(inputPrecio.value > 0)){
    resultado = false;
    inputPrecio.classList.add("is-invalid");
    errorPrecio.innerText = "El producto debe tener un costo mayor a $0."
  } else inputPrecio.classList.add("is-valid");

  if (inputDescripcion.value.length == 0){
    resultado = false;
    inputDescripcion.classList.add("is-invalid");
    errorDescripcion.innerText = "La descripcion no puede estar vacia"
  } else inputDescripcion.classList.add("is-valid");
  if (inputCategoriaObligatoria.value == ""){
    resultado = false;
    inputCategoriaObligatoria.classList.add("is-invalid");
    errorCategoriaObligatoria.innerText = "Ingrese una categoria."
  } else inputCategoriaObligatoria.classList.add("is-valid");
  if (imagenSeleccionada === "") {
    resultado = false;
    inputImagen.classList.add("is-invalid");
    errorImagen.innerText = "Debe seleccionar una imagen para el producto.";
  } else inputImagen.classList.add("is-valid");
  if (inputStock.value < 1){
    resultado = false;
    inputStock.classList.add("is-invalid")
    errorStock.innerText="Ingrese una cantidad valida de stock"
  } else inputStock.classList.add("is-valid");
  return resultado;
}

function mostrarErrores(errores) {
  const mensajeError = document.getElementById("mensajeError");
  const errorNombre = document.getElementById("errorNombre");
  const errorPrecio = document.getElementById("errorPrecio");
  const errorDescripcion = document.getElementById("errorDescripcion");
  const errorCategoriaObligatoria = document.getElementById(
    "errorCategoriaObligatoria",
  );
  const errorImagen = document.getElementById("errorImagen");
  const errorStock = document.getElementById("errorStock");
  mensajeError.innerHTML = "";
  if (errores[0]) {
    errorNombre.textContent = errores[0];
    nombre.classList.add("is-invalid");
  }
  if (errores[1]) {
    errorPrecio.textContent = errores[1];
    precio.classList.add("is-invalid");
  }
  if (errores[2]) {
    errorDescripcion.textContent = errores[2];
    descripcion.classList.add("is-invalid");
  }
  if (errores[3]) {
    errorCategoriaObligatoria.textContent = errores[3];
    categoriaObligatoria.classList.add("is-invalid");
  }
  if (errores[4]) {
    errorStock.textContent = errores[4];
    stock.classList.add("is-invalid");
  }
  if (errores[5]) {
    errorImagen.textContent = errores[5];
    btnImagenes.classList.add("is-invalid");
  }
}
function crearProducto() {
  const id = Date.now().toString();
  const nombreValue = nombre.value.trim();
  const precioValue = parseFloat(precio.value.trim());
  const descripcionValue = descripcion.value.trim();
  const categoriaObligatoriaValue = categoriaObligatoria.value.trim();
  const categoriasExtra = colectCategoriasExtra();
  const stockValue = parseInt(stock.value.trim());
  const producto = {
    nombre: nombreValue,
    precio: precioValue,
    descripcion: descripcionValue,
    categoriaObligatoria: categoriaObligatoriaValue,
    categoriasExtra: categoriasExtra,
    stock: stockValue,
    id: id,
    imagen: imagenSeleccionada,
  };

  listaProductos.push(producto);
  return producto;
}

function mostrarEnTabla() {
  tablaProductos.innerHTML = "";
  for (let i = 0; i < listaProductos.length; i++) {
    const producto = listaProductos[i];
    const fila = document.createElement("tr");
    let tdId = document.createElement("td");
    tdId.textContent = producto.id;
    let tdNombre = document.createElement("td");
    tdNombre.textContent = producto.nombre;
    let tdPrecio = document.createElement("td");
    tdPrecio.textContent = `$${producto.precio.toFixed(2)}`;
    let tdStock = document.createElement("td");
    tdStock.textContent = producto.stock;

    let btnEliminar = botonEliminar(producto.id);
    let btnVer = botonVer(producto.id);
    let tdBotones = document.createElement("td");

    tdBotones.appendChild(btnVer);
    tdBotones.appendChild(btnEliminar);

    fila.appendChild(tdId);
    fila.appendChild(tdNombre);
    fila.appendChild(tdPrecio);
    fila.appendChild(tdStock);
    fila.appendChild(tdBotones);

    tablaProductos.appendChild(fila);
    let trSecundario = filaAmpliadaProducto(producto);
    tablaProductos.appendChild(trSecundario);
  }
}
function filaAmpliadaProducto(producto) {
  const filaDetalle = document.createElement("tr");
  filaDetalle.id = `detalle-${producto.id}`;
  filaDetalle.style.display = "none";
  filaDetalle.className = "bg-light";

  let tdDetalleCompleto = document.createElement("td");
  tdDetalleCompleto.colSpan = 5;

  tdDetalleCompleto.innerHTML = `
      <div class="p-3 border rounded bg-white shadow-sm m-2">
        <div class="row align-items-center">
          <div class="col-md-3 text-center mb-3 mb-md-0">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-thumbnail img-fluid" style="max-height: 120px;">
          </div>
          
          <div class="col-md-6">
            <h5><strong>Descripción:</strong></h5>
            <p class="text-muted mb-3">${producto.descripcion || "Sin descripción disponible."}</p>
            
            <div class="row g-2 bg-light p-2 rounded border mb-2">
              <div class="col-6">
                <label class="form-label small fw-bold">Nuevo Precio ($)</label>
                <input type="number" step="0.01" id="edit-precio-${producto.id}" class="form-control form-control-sm" value="${producto.precio}">
                <div id="error-edit-precio-${producto.id}" class="form-text text-danger small"></div>
              </div>
              <div class="col-6">
                <label class="form-label small fw-bold">Nuevo Stock</label>
                <input type="number" id="edit-stock-${producto.id}" class="form-control form-control-sm" value="${producto.stock}">
                <div id="error-edit-stock-${producto.id}" class="form-text text-danger small"></div>
              </div>
            </div>

            <p class="mb-1 small"><strong>Categoría Primaria:</strong> <span class="badge bg-secondary">${producto.categoriaObligatoria}</span></p>
            <p class="mb-1 small"><strong>Categoría Opcional:</strong> <span class="badge bg-info">${producto.categoriaOpcional}</span></p>
          </div>
          
          <div class="col-md-3 text-md-end text-center">
            <button class="btn btn-success btn-sm w-100 mb-2 btn-guardar-cambios">
              <i class="bi bi-check-circle"></i> Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    `;

  filaDetalle.appendChild(tdDetalleCompleto);

  const botonGuardar = filaDetalle.querySelector(".btn-guardar-cambios");
  if (botonGuardar) {
    botonGuardar.addEventListener("click", () => guardarEdicion(producto.id));
  }

  return filaDetalle;
}

function limpiarInputs() {
  nombre.value = "";
  precio.value = "";
  descripcion.value = "";
  categoriaObligatoria.value = "";
  stock.value = "";
  let checkboxes = document.querySelectorAll(".form-check-input")
  for (let input of checkboxes){
    input.checked = false;
  }
  limpiarEstados();
  imagenSeleccionada = "";
  if (imagen) imagen.value = "";
  btnImagenes.classList.remove("is-invalid");
  const contenedor = document.getElementById("imagenesDisponibles");
  if (contenedor) {
    const todasLasImagenes = contenedor.querySelectorAll("img.img-catalogo");
    todasLasImagenes.forEach((img) => {
      img.classList.remove("border-primary", "border-3");
    });
  }
}

function mostrarCatalogoImagenes() {
  const contenedor = document.getElementById("imagenesDisponibles");
  if (contenedor.style.display === "flex") {
    contenedor.style.display = "none";
    btnImagenes.textContent = "Mostrar imágenes disponibles";
    contenedor.innerHTML = "";
    return;
  }
  contenedor.style.display = "flex";
  btnImagenes.textContent = "Ocultar imágenes disponibles";

  contenedor.innerHTML = "";

  btnImagenes.classList.remove("is-invalid");
  document.getElementById("errorImagen").textContent = "";

  for (let i = 1; i <= cantidadTelefonos; i++) {
    const rutaImg = `../img/celular-${i}.png`;
    crearElementoImagen(rutaImg, `Teléfono ${i}`, contenedor);
  }
  for (let i = 1; i <= cantidadCargadores; i++) {
    const rutaImg = `../img/cargador-${i}.png`;
    crearElementoImagen(rutaImg, `Cargador ${i}`, contenedor);
  }
  for (let i = 1; i <= cantidadAuriculares; i++) {
    const rutaImg = `../img/auriculares-${i}.png`;
    crearElementoImagen(rutaImg, `Auriculares ${i}`, contenedor);
  }
}

function crearElementoImagen(rutaImg, altText, contenedor) {
  const col = document.createElement("div");
  col.className = "col-4 col-sm-3 col-md-2 text-center mb-2";

  const imgElement = document.createElement("img");
  imgElement.src = rutaImg;
  imgElement.alt = altText;
  imgElement.classList.add("img-thumbnail", "img-fluid", "img-catalogo");
  imgElement.style.cursor = "pointer";

  if (imagenSeleccionada === rutaImg) {
    imgElement.classList.add("border-primary", "border-3");
  }

  imgElement.addEventListener("click", function () {
    const todasLasImagenes = contenedor.querySelectorAll("img.img-catalogo");
    todasLasImagenes.forEach((img) => {
      img.classList.remove("border-primary", "border-3");
    });
    imgElement.classList.add("border-primary", "border-3");
    imagenSeleccionada = rutaImg;
    if (imagen) imagen.value = rutaImg;
  });

  col.appendChild(imgElement);
  contenedor.appendChild(col);
}

function botonEliminar(id) {
  const boton = document.createElement("button");
  boton.className = "btn btn-sm btn-danger";
  boton.textContent = "Eliminar";
  boton.addEventListener("click", () => eliminarProducto(id));
  return boton;
}

function eliminarProducto(id) {
  listaProductos = listaProductos.filter((producto) => producto.id !== id);
  setListadoProductos(listaProductos);
  mostrarEnTabla();
}

function botonVer(id) {
  const boton = document.createElement("button");
  boton.className = "btn btn-sm btn-info text-white me-2";
  boton.type = "button"
  boton.textContent = "Ver mas";
  boton.addEventListener("click", () => verMasInfo(id, boton));
  return boton;
}

function verMasInfo(id, boton) {
  const filaDetalle = document.getElementById(`detalle-${id}`);
  if (boton.textContent === "Ver mas") {
    boton.textContent = "Ocultar detalles";
  } else {
    boton.textContent = "Ver mas";
  }

  if (filaDetalle) {
    if (filaDetalle.style.display === "none") {
      filaDetalle.style.display = "table-row";
    } else {
      filaDetalle.style.display = "none";
    }
  }
}

function guardarEdicion(id) {
  const producto = listaProductos.find((p) => p.id === id);
  if (!producto) return;

  const inputPrecio = document.getElementById(`edit-precio-${id}`);
  const inputStock = document.getElementById(`edit-stock-${id}`);
  const errorPrecio = document.getElementById(`error-edit-precio-${id}`);
  const errorStock = document.getElementById(`error-edit-stock-${id}`);

  inputPrecio.classList.remove("is-invalid");
  inputStock.classList.remove("is-invalid");
  errorPrecio.textContent = "";
  errorStock.textContent = "";

  let edicionValida = true;

  const nuevoPrecio = Number(inputPrecio.value.trim());
  if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
    errorPrecio.textContent = "El precio debe ser un número positivo.";
    inputPrecio.classList.add("is-invalid");
    edicionValida = false;
  }

  const nuevoStock = Number(inputStock.value.trim());
  if (isNaN(nuevoStock) || nuevoStock < 0) {
    errorStock.textContent = "El stock no puede ser negativo.";
    inputStock.classList.add("is-invalid");
    edicionValida = false;
  }
  if (edicionValida) {
    producto.precio = nuevoPrecio;
    producto.stock = nuevoStock;
    inputStock.classList.add("is-valid");
    inputPrecio.classList.add("is-valid");

    setListadoProductos(listaProductos);
    const timeoutId = setTimeout(() => {
      mostrarEnTabla(); 
    }, 2000); 
  }
}

export function mostrarCategoriasExtras(){
  let categoriasExtras = obtenerCategoriasExtras();
  let contenedor = document.getElementById("contenedorCategoriasOpcionales");
  contenedor.innerHTML = "";
  for (let categoria of categoriasExtras){
    let div = document.createElement("div");
    div.className = "form-check";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "form-check-input";
    input.value = categoria.nombre;
    input.name = "categoriasOpcionales";

    const label = document.createElement("label");
    label.className = "form-check-label";
    label.textContent = categoria.nombre;

    div.appendChild(input);
    div.appendChild(label);
    contenedor.appendChild(div);
  }
}

function colectCategoriasExtra(){
  const seleccionadas = [];
  const checks = document.querySelectorAll('input[name="categoriasOpcionales"]:checked');

  checks.forEach((check) => {
    seleccionadas.push(check.value);
  });

  return seleccionadas;
}
