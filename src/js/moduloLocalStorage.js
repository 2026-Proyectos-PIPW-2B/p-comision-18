export function obtenerArregloUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem("arregloUsuarios"));
  if (usuarios != null) {
    return usuarios;
  } else return null;
}

export function setArregloUsuarios(arregloUsuarios) {
  localStorage.setItem("arregloUsuarios", JSON.stringify(arregloUsuarios));
}

export function obtenerUsuarioActivo(){
    const user = localStorage.getItem("usuarioActivo");
    if (user){
        return JSON.parse(user);
    }else return null;
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
    if (usuario == null){
        return null;
    }
    if (usuario.carrito != null){
        return usuario.carrito
    }else return []
}

export function obtenerHistorialDePedidos() {
  let historialDePedidos = JSON.parse(localStorage.getItem("historialPedidos"));
  if (!historialDePedidos) {
    historialDePedidos = []
    localStorage.setItem("historialPedidos", JSON.stringify(historialDePedidos));
  }
  return historialDePedidos;
}

export function setHistorialDePedidos(historialDePedidos) {
  localStorage.setItem("historialPedidos", JSON.stringify(historialDePedidos));
}
