export function obtenerArregloUsuarios() {
  let admin = [{"username":"admin@dcicell","password":"admin123","admin":true}];
  let usuarios = JSON.parse(localStorage.getItem("arregloUsuarios"));
  if (usuarios != null) {
    return usuarios;
  } else{ 
    setArregloUsuarios(admin);
    return admin;
  }

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
    return [];
}

export function setListadoProductos(listado){
  localStorage.setItem("productos", JSON.stringify(listado));
}

export function obtenerCarritoCompras(){
    let usuario = obtenerUsuarioActivo();
    if (usuario == null){
        return [];
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

export function obtenerCategoriasExtras(){
  let categoriasExtra = JSON.parse(localStorage.getItem("categorias"));
  if (categoriasExtra == null){
    return [];
  }else return categoriasExtra;
}

export function setCategoriasExtras(categoriasExtra){
  localStorage.setItem("categorias", JSON.stringify(categoriasExtra));
}

export function obtenerConfiguraciones(){
  let configuraciones = JSON.parse(localStorage.getItem("configuraciones"));
  if (configuraciones == null){
    let configuraciones = {
      stockBajo: 1,
      stockMedio: 5,
      stockAlto: 10,
      productosPorPagina : 10,
      descuentoEfectivo: 10,
      cuotasSinInteres : 3
    };
    setConfiguraciones(configuraciones);
    return configuraciones;
  }else return configuraciones
}

export function setConfiguraciones(configuraciones){
  localStorage.setItem("configuraciones", JSON.stringify(configuraciones));
}