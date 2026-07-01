function limpiarLocalStorage(){
    localStorage.removeItem("arregloUsuarios");
    localStorage.removeItem("categorias");
    localStorage.removeItem("configuraciones");
    localStorage.removeItem("historialPedido");
    localStorage.removeItem("productos");
    localStorage.removeItem("usuarioActivo");
}

function setLocalStorageParaExponer(){
    let arregloUsuarios = [
        {"username":"admin@dcicell","password":"admin123","admin":true},
        {"username":"tomasjuanes@hotmail.com","password":"Password123.","nombre":"Tomas","apellido":"Juanes","direccion":"Callle Falsa 123, Bahia Blanca","telefono":"2915057209","carrito":[],"admin":false,"activo":true},
        {"username":"sebastianagunin@hotmail.com","password":"Password123.","nombre":"Sebastian","apellido":"Agunin","direccion":"Calle Falsa 456, Bahia Blanca","telefono":"2915092429","carrito":[],"admin":false,"activo":true},
        {"username":"juanperez@example.com","password":"Password123.","nombre":"Juan","apellido":"Perez","direccion":"Calle Falsa 789, Ciudad","telefono":"2911234567","carrito":[],"admin":false,"activo":true},
        {"username":"fulanitodetal@hotmail.com","password":"Password123.","nombre":"Fulano","apellido":"De Tal","direccion":"Calle Falsa 100, Ciudad","telefono":"2917654321","carrito":[],"admin":false,"activo":true}]
}