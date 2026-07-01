import { setArregloUsuarios, setCategoriasExtras, setConfiguraciones, setListadoProductos } from "./moduloLocalStorage";

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
        {"username":"fulanitodetal@hotmail.com","password":"Password123.","nombre":"Fulano","apellido":"De Tal","direccion":"Calle Falsa 100, Ciudad","telefono":"2917654321","carrito":[],"admin":false,"activo":true}
    ]
    setArregloUsuarios(arregloUsuarios);
    let productos = crearProductos();
    setListadoProductos(productos);
    let configuracion = {"stockBajo":"5","stockMedio":"10","stockAlto":"20","productosPorPagina":"10","descuentoEfectivo":"10","cuotasSinInteres":"3"}
    setConfiguraciones(configuracion);
    let categorias = [{"id":"1782921477672","nombre":"iPhone"},{"id":"1782921482616","nombre":"Apple"},{"id":"1782921500490","nombre":"128 GB"},{"id":"1782921526133","nombre":"Pantalla de 6.7\""},{"id":"1782921549902","nombre":"Cámara de 48 MP"},{"id":"1782922028491","nombre":"Motorola"},{"id":"1782922044363","nombre":"Pantalla de 6.67\""},{"id":"1782922056442","nombre":"256 GB"},{"id":"1782922269406","nombre":"Inalambrico"},{"id":"1782922370264","nombre":"Cancelación Activa de Ruido"},{"id":"1782927169434","nombre":"Pantalla de 6.8\""},{"id":"1782928344305","nombre":"Bluetooth"}]
    setCategoriasExtras(categorias);
}
function crearProductos(){
    let arreglo = [{"nombre":"iPhone 16 Plus","precio":305608,"descripcion":"Potencia, innovación y diseño en un solo dispositivo. El iPhone 16 ofrece un rendimiento excepcional, cámaras avanzadas para capturar cada momento con gran calidad y una batería optimizada para acompañarte durante todo el día. Disfruta de la experiencia premium de Apple con la última tecnología y un diseño elegante.","categoriaObligatoria":"telefono","categoriasExtra":["iPhone","Apple","128 GB","Pantalla de 6.7\"","Cámara de 48 MP"],"stock":15,"id":"1782921559441","imagen":"../img/celular-9.png"}]
    arreglo.push({"nombre":"Moto G86","precio":679999,"descripcion":"El Motorola Moto G86 es un dispositivo de gama media premium que destaca por su pantalla pOLED de 6.67\" (1.5K, 120 Hz), procesador MediaTek Dimensity 7300, 8 GB de RAM y 256 GB de almacenamiento. Ofrece gran autonomía con su batería de 5200 mAh y carga de 33 W.","categoriaObligatoria":"telefono","categoriasExtra":["Motorola","Pantalla de 6.67\"","256 GB"],"stock":30,"id":"1782922077676","imagen":"../img/celular-2.png"})
    arreglo.push({"nombre":"Funda para iPhone","precio":15000,"descripcion":"Funda protectora de silicona para iPhone. Color a elección (Según stock).","categoriaObligatoria":"funda","categoriasExtra":["iPhone","Apple"],"stock":60,"id":"1782922201392","imagen":"../img/funda-4.png"})
    arreglo.push({"nombre":"Auriculares Inalambricos Tim","precio":28000,"descripcion":"El Auricular Inalámbrico Time ofrece conexión rápida, sonido de alta definición y un diseño ergonómico y elegante. Disfruta de su batería extendida y compatibilidad universal.","categoriaObligatoria":"auriculares","categoriasExtra":["Inalambrico"],"stock":15,"id":"1782922283932","imagen":"../img/auriculares-5.png"})
    arreglo.push({"nombre":"Auriculares Suono","precio":43000,"descripcion":"Viví una experiencia auditiva superior con los auriculares de vincha Suono, diseñados para quienes buscan calidad de sonido, comodidad prolongada y máxima inmersión gracias a su sistema de Cancelación Activa de Ruido (ANC). Perfectos para viajes, trabajo, estudio o simplemente para disfrutar de tu música favorita sin interrupciones.","categoriaObligatoria":"auriculares","categoriasExtra":["Cancelación Activa de Ruido"],"stock":10,"id":"1782922377242","imagen":"../img/auriculares-7.png"})
    arreglo.push({"nombre":"Cargador Apple","precio":20000,"descripcion":"Cargador oficial Apple compatible con iPhones","categoriaObligatoria":"cargador","categoriasExtra":["Apple"],"stock":50,"id":"1782927100476","imagen":"../img/cargador-2.png"});
    arreglo.push({"nombre":"Redmi 14C","precio":429999,"descripcion":"es un smartphone de entrada (gama económica) lanzado por Xiaomi. Destaca por su gran pantalla de 6,88 pulgadas a 120 Hz, su batería masiva de 5160 mAh y su procesador Helio G81 Ultra, ofreciendo un excelente equilibrio para tareas diarias y redes sociales.","categoriaObligatoria":"telefono","categoriasExtra":["128 GB","Pantalla de 6.8\""],"stock":13,"id":"1782927193629","imagen":"../img/celular-3.png"});
    arreglo.push({"nombre":"Apple AirPods Max","precio":205000,"descripcion":"Disfrutá de un sonido envolvente y de alta fidelidad con los AirPods Max. Su diseño premium, cancelación activa de ruido y audio espacial te ofrecen una experiencia de escucha inmersiva, ideal para música, películas y llamadas con la máxima calidad.","categoriaObligatoria":"auriculares","categoriasExtra":["iPhone","Apple","Inalambrico"],"stock":5,"id":"1782927409872","imagen":"../img/auriculares-4.png"});
    arreglo.push({"nombre":"Auriculares Noganet Aris","precio":33000,"descripcion":"Aris te brinda un elegante diseño ergomómico y confortable. Sincronizalos con tu Smartphone u otros dispositivos. Incluye Sistema de Manos Libres con Micrófono incorporado para recepción de llamadas. Disfrutá tu música y tus llamadas sin cables.","categoriaObligatoria":"auriculares","categoriasExtra":["Inalambrico","Bluetooth"],"stock":42,"id":"1782928394212","imagen":"../img/auriculares-6.png"});
    arreglo.push({"nombre":"Funda negra","precio":12000,"descripcion":"Funda negra protectora de silicona.","categoriaObligatoria":"funda","categoriasExtra":[],"stock":10,"id":"1782928453110","imagen":"../img/funda-1.png"});

    return arreglo
}