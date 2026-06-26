export function obtenerArregloUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem("arregloUsuarios"));
  if (usuarios != null) {
    return usuarios;
  } else return null;
}

export function setArregloUsuarios(arregloUsuarios) {
  localStorage.setItem("arregloUsuarios", JSON.stringify(arregloUsuarios));
}

export function obtenerUsuarioActivo() {
  const user = localStorage.getItem("usuarioActivo");
  if (!user || user === "undefined") {
    return null;
  }
  return JSON.parse(user);
}

export function setUsuarioActivo(user) {
  localStorage.setItem("usuarioActivo", JSON.stringify(user));
}
