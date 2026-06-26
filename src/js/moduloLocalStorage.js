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

export function setUsuarioActivo(user){
    localStorage.setItem("usuarioActivo", JSON.stringify(user));
}

export function obtenerListadoProductos(){
    const listado = localStorage.getItem("productos");
    if (listado != null){
        return JSON.parse(listado);
    }  
    return null;
}

export function obtenerCarritoCompras(){
    let usuario = obtenerUsuarioActivo();
    if (usuario != null && usuario.carrito != null){
        return usuario.carrito;
    }else return null;
}
