const categoriOpcionalSelect = document.getElementById("categoriaOpcional");
const btnAgregarCategoria = document.getElementById("btnAgregarCategoria");
const categoriaInput = document.getElementById("nuevaCategoria");
let listaCategorias = JSON.parse(localStorage.getItem("categorias")) || [];
btnAgregarCategoria.addEventListener("click", agregarCategoria);
mostrarCategoriaDisponibles();

function agregarCategoria() {
  const nuevaCategoria = categoriaInput.value.trim();

  let categoriaValida = validarCategoria(nuevaCategoria);
  if (categoriaValida) {
    agregarCategoriaALista(nuevaCategoria);
    actualizarLocalStorageCategorias();
    categoriaInput.value = "";
    mostrarCategoriaDisponibles();
  }
}
function validarCategoria(categoria) {
  let resultado = true;
  const mensajeError = document.getElementById("mensajeCategoriaOpcional");
  mensajeError.classList.add("text-danger");
  if (categoria === "") {
    mensajeError.textContent = "La categoría no puede estar vacía.";
    resultado = false;
  } else if (
    listaCategorias.some(
      (cat) => cat.nombre.toLowerCase() === categoria.toLowerCase(),
    )
  ) {
    mensajeError.textContent = "La categoría ya existe.";
    resultado = false;
  } else {
    if (categoria.length < 3 || categoria.length > 30) {
      mensajeError.textContent =
        "La categoría debe tener entre 3 y 30 caracteres.";
      resultado = false;
    } else {
      mensajeError.classList.remove("text-danger");
      mensajeError.classList.add("text-success");
      mensajeError.textContent = "Categoría agregada correctamente.";
    }
  }
  return resultado;
}
function agregarCategoriaALista(categoria) {
  const objetoCategoria = { id: Date.now().toString(), nombre: categoria };

  listaCategorias.push(objetoCategoria);
}
function actualizarLocalStorageCategorias() {
  localStorage.setItem("categorias", JSON.stringify(listaCategorias));
}
function mostrarCategoriaDisponibles() {
  const listaDeCategoriasAVisualizar =
    document.getElementById("listaCategoria");
  listaDeCategoriasAVisualizar.innerHTML = "";

  for (let i = 0; listaCategorias.length > i; i++) {
    const elemento = document.createElement("li");
    elemento.className =
      "list-group-item d-flex justify-content-between align-items-center";
    elemento.textContent = listaCategorias[i].nombre;
    listaDeCategoriasAVisualizar.appendChild(elemento);
    const boton = document.createElement("button");
    boton.addEventListener("click", () =>
      eliminarCategoria(listaCategorias[i].id),
    );
    boton.className = "btn btn-sm btn-danger";
    boton.textContent = "eliminar";
    elemento.appendChild(boton);
  }
}

function eliminarCategoria(id) {
  listaCategorias = listaCategorias.filter((cat) => cat.id !== id);
  actualizarLocalStorageCategorias();
  mostrarCategoriaDisponibles();
}
