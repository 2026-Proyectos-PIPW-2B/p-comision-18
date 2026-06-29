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

export function obtenerRegistroPedidos() {
  let registro = JSON.parse(localStorage.getItem("registroPedidos"));

  if (!registro) {
    registro = {
      nroPedido: 0,
      pedidosHistorial: [],
    };
    localStorage.setItem("registroPedidos", JSON.stringify(registro));
  }

  return registro;
}

export function setRegistroPedidos(registro) {
  localStorage.setItem("registroPedidos", JSON.stringify(registro));
}
