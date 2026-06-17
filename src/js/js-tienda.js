window.addEventListener("load", function(){
    agregarListener()
})

function agregarListener(){
    const botonCarrito = document.getElementById("compraCarrito");
    console.log("hoal");

    botonCarrito.addEventListener("click", function(){
        cerrarCarrito();
        limpiarCarrito();
        mostrarAviso();
    })
}

function cerrarCarrito(){
    const offcanvasElement = document.getElementById("carritoCompras");
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvas.hide()
}
function limpiarCarrito(){
    const productosCarrito = document.getElementById("productosCarrito");
    productosCarrito.innerText = "";
}
function mostrarAviso(){
    const modal = new bootstrap.Modal(
        document.getElementById("modalCompraExitosa")
    );
    modal.show();
}